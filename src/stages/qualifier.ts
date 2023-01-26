import { Player } from '../classes/Player/index.js'
import { StageStatsType } from '../main.js'
import BestOfThree from '../classes/Match/BestOfThree.js'
import {
  generateStageIDs,
  generateQualifierMatchups,
  sortPlayersByWins,
  rankPlayers,
  levelUpPlayers,
} from '../helpers/index.js'
import qualifierWildcard from './qualifierWildcard.js'

const STAGE = 'qualifier'

export default function qualifierStage(PLAYERS: Player[]) {
  const stage_stats: StageStatsType = {}

  generateStageIDs(PLAYERS)
  const match_ups = generateQualifierMatchups()
  for (let i = 0; i < match_ups.length; i++) {
    let round = i + 1
    let round_stats = BestOfThree.run_match(PLAYERS, match_ups[i], i, STAGE)

    stage_stats[round] = round_stats
  }

  sortPlayersByWins(PLAYERS, STAGE)
  const { QUALIFIED_PLAYERS, WILDCARD_PLAYERS, DISQUALIFIED } =
    getQualifiedPlayers(PLAYERS)

  const open_seats = 36 - QUALIFIED_PLAYERS.length
  const wildcard_pool_size = open_seats * 2

  // adjust wildcard players to fit pool size, or qualifier top ranked players if less than pool size
  if (WILDCARD_PLAYERS.length < wildcard_pool_size) {
    console.log('wildcard players < wildcard pools size')
    while (QUALIFIED_PLAYERS.length < 36) {
      let player = WILDCARD_PLAYERS.shift()
      QUALIFIED_PLAYERS.push(player!)
    }
    while (WILDCARD_PLAYERS.length) {
      let player = WILDCARD_PLAYERS.pop()
      DISQUALIFIED.push(player!)
    }
    console.log('wildcard length: ' + WILDCARD_PLAYERS.length)
    console.log('qualified length: ' + QUALIFIED_PLAYERS.length)
    console.log('disqualified length: ' + DISQUALIFIED.length)
  } else if (
    WILDCARD_PLAYERS.length > wildcard_pool_size &&
    wildcard_pool_size !== 0
  ) {
    console.log('wildcard players > wildcard pools size')
    while (WILDCARD_PLAYERS.length > wildcard_pool_size) {
      let player = WILDCARD_PLAYERS.pop()
      DISQUALIFIED.push(player!)
    }
    console.log('wildcard length: ' + WILDCARD_PLAYERS.length)
    console.log('qualified length: ' + QUALIFIED_PLAYERS.length)
    console.log('disqualified length: ' + DISQUALIFIED.length)
  }

  // run wildcard stage if wildcard players = pool size
  if (
    WILDCARD_PLAYERS.length === wildcard_pool_size &&
    QUALIFIED_PLAYERS.length < 36 &&
    wildcard_pool_size !== 0
  ) {
    console.log('wildcard players = wildcard pools size')
    const { in_group, out_group, round_stats } =
      qualifierWildcard(WILDCARD_PLAYERS)
    stage_stats['wildcard'] = round_stats

    console.log('in_group group from wildcard')
    in_group.forEach((p) => console.log(p))

    while (in_group.length) {
      let qualified = in_group.pop()
      QUALIFIED_PLAYERS.push(qualified!)
    }
    while (out_group.length) {
      let disqualified = out_group.pop()
      DISQUALIFIED.push(disqualified!)
    }
    console.log('wildcard length: ' + WILDCARD_PLAYERS.length)
    console.log('qualified length: ' + QUALIFIED_PLAYERS.length)
    console.log('disqualified length: ' + DISQUALIFIED.length)
  }

  console.log(QUALIFIED_PLAYERS)
  rankPlayers(QUALIFIED_PLAYERS, STAGE)
  levelUpPlayers(QUALIFIED_PLAYERS, false)
  return { QUALIFIED_PLAYERS, DISQUALIFIED, stage_stats }
}

function getQualifiedPlayers(players: Player[]) {
  const QUALIFIED_PLAYERS: Player[] = []
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

    for (let i = 0; i < player_bracket_count; i++) {
      let player = players.shift()
      bracket.push(player)
    }

    if (QUALIFIED_PLAYERS.length + bracket.length <= 36) {
      while (bracket.length) {
        let player = bracket.pop()
        QUALIFIED_PLAYERS.push(player!)
      }
      if (QUALIFIED_PLAYERS.length === 36) qualify_by_wins = false
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
    DISQUALIFIED.push(player!)
  }

  sortPlayersByWins(WILDCARD_PLAYERS, STAGE)

  let qualify_by_ties = true
  while (qualify_by_ties) {
    let games_tied = WILDCARD_PLAYERS[0].games.qualifier.tied
    let player_bracket_count = 0
    let bracket = []

    WILDCARD_PLAYERS.forEach((p) => {
      if (p.games.qualifier.tied === games_tied) player_bracket_count++
    })

    for (let i = 0; i < player_bracket_count; i++) {
      let player = WILDCARD_PLAYERS.shift()
      bracket.push(player)
    }

    if (QUALIFIED_PLAYERS.length + bracket.length <= 36) {
      while (bracket.length) {
        let player = bracket.pop()
        QUALIFIED_PLAYERS.push(player!)
      }
    }
    qualify_by_ties = false
  }

  return { QUALIFIED_PLAYERS, WILDCARD_PLAYERS, DISQUALIFIED }
}
