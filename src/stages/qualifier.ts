import { Player } from '../classes/Player/index.js'
import { StageStatsType } from '../main.js'
import { BestOfThree } from '../classes/Match/index.js'
import {
  generateStageIDs,
  generateQualifierMatchups,
  sortPlayersByWins,
  rankPlayers,
  levelUpPlayers,
} from '../helpers/index.js'
import qualifierWildcard from './qualifierWildcard.js'

let STAGE: string

export default function qualifierStage(players: Player[], stage_name: string) {
  STAGE = stage_name
  const stage_stats: StageStatsType = {}

  generateStageIDs(players)
  const match_ups = generateQualifierMatchups()
  for (let i = 0; i < match_ups.length; i++) {
    let round = i + 1
    let round_stats = BestOfThree.run_match(players, match_ups[i], i, STAGE)

    stage_stats[round] = round_stats
  }

  sortPlayersByWins(players, STAGE)
  const { QUALIFIED, WILDCARD_PLAYERS, DISQUALIFIED } =
    getQualifiedPlayers(players)

  const open_seats = 36 - QUALIFIED.length
  const wildcard_pool_size = open_seats * 2

  // adjust wildcard players to fit pool size, or qualifier top ranked players if less than pool size
  if (WILDCARD_PLAYERS.length < wildcard_pool_size) {
    while (QUALIFIED.length < 36) {
      let player = WILDCARD_PLAYERS.shift()
      QUALIFIED.push(player!)
    }
    while (WILDCARD_PLAYERS.length) {
      let player = WILDCARD_PLAYERS.pop()
      DISQUALIFIED.push(player!)
    }
  } else if (
    WILDCARD_PLAYERS.length > wildcard_pool_size &&
    wildcard_pool_size !== 0
  ) {
    while (WILDCARD_PLAYERS.length > wildcard_pool_size) {
      let player = WILDCARD_PLAYERS.pop()
      DISQUALIFIED.push(player!)
    }
  }

  // run wildcard stage if wildcard players = pool size
  if (
    WILDCARD_PLAYERS.length === wildcard_pool_size &&
    QUALIFIED.length < 36 &&
    wildcard_pool_size !== 0
  ) {
    const { in_group, out_group, round_stats } =
      qualifierWildcard(WILDCARD_PLAYERS)
    stage_stats['wildcard'] = round_stats

    while (in_group.length) {
      let qualified = in_group.pop()
      QUALIFIED.push(qualified!)
    }
    while (out_group.length) {
      let disqualified = out_group.pop()
      DISQUALIFIED.push(disqualified!)
    }
  }

  rankPlayers(QUALIFIED, STAGE)
  levelUpPlayers(QUALIFIED, false)
  return { QUALIFIED, DISQUALIFIED, stage_stats }
}

function getQualifiedPlayers(players: Player[]) {
  const QUALIFIED: Player[] = []
  const WILDCARD_PLAYERS: Player[] = []
  const DISQUALIFIED: Player[] = []

  // QUALIFIED win brackets
  let qualify_by_wins = true
  while (qualify_by_wins) {
    let games_won = players[0].games.qualifier.won
    let player_bracket_count = 0
    let bracket = []

    players.forEach((p) => {
      if (p.games.qualifier.won === games_won) player_bracket_count++
    })

    while (player_bracket_count > 0) {
      let player = players.shift()
      bracket.push(player)
      player_bracket_count--
    }

    if (QUALIFIED.length + bracket.length <= 36) {
      while (bracket.length) {
        let player = bracket.pop()
        if (player) QUALIFIED.push(player)
      }
      if (QUALIFIED.length === 36) qualify_by_wins = false
    } else {
      // WILDCARD win bracket
      while (bracket.length) {
        let player = bracket.pop()
        WILDCARD_PLAYERS.push(player!)
      }
      qualify_by_wins = false
    }
  }

  while (players.length) {
    let player = players.pop()
    if (player) DISQUALIFIED.push(player)
  }

  if (WILDCARD_PLAYERS.length) {
    sortPlayersByWins(WILDCARD_PLAYERS, STAGE)

    let qualify_by_ties = true
    while (qualify_by_ties) {
      let games_tied = WILDCARD_PLAYERS[0].games.qualifier.tied
      let player_bracket_count = 0
      let bracket = []

      WILDCARD_PLAYERS.forEach((p) => {
        if (p.games.qualifier.tied === games_tied) player_bracket_count++
      })

      while (player_bracket_count > 0) {
        let player = WILDCARD_PLAYERS.shift()
        bracket.push(player)
        player_bracket_count--
      }

      if (QUALIFIED.length + bracket.length <= 36) {
        while (bracket.length) {
          let player = bracket.pop()
          QUALIFIED.push(player!)
        }
        if (QUALIFIED.length === 36) qualify_by_ties = false
      } else {
        while (bracket.length) {
          let player = bracket.pop()
          if (player) WILDCARD_PLAYERS.push(player)
        }
        qualify_by_ties = false
      }
    }
  }

  return { QUALIFIED, WILDCARD_PLAYERS, DISQUALIFIED }
}
