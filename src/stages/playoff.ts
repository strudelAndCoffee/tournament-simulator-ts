import { Player } from '../classes/Player'
import { StageStatsType } from '../main'
import { PlayoffMatch } from '../classes/Match'
import { levelUpPlayers, rankPlayers, sortPlayersByWins } from '../helpers'

let STAGE: string

export default function playoffStage(players: Player[], stage_name: string) {
  STAGE = stage_name
  const stage_stats: StageStatsType = {}
  const { WEST, EAST } = assignSides(players)

  WEST.forEach((match, i) => {
    let stage_round = 'west_' + i + 1
    let round_stats = PlayoffMatch.run_match(match, i, STAGE)
    stage_stats[stage_round] = round_stats
  })
  EAST.forEach((match, i) => {
    let stage_round = 'east_' + i + 1
    let round_stats = PlayoffMatch.run_match(match, i, STAGE)
    stage_stats[stage_round] = round_stats
  })

  const { QUALIFIED, DISQUALIFIED } = getAdvancingPlayers(WEST, EAST)

  sortPlayersByWins(QUALIFIED, 'total')
  sortPlayersByWins(DISQUALIFIED, 'total')
  rankPlayers(QUALIFIED, STAGE)
  levelUpPlayers(QUALIFIED, false)

  return { QUALIFIED, DISQUALIFIED, stage_stats }
}

function getAdvancingPlayers(west: Player[][], east: Player[][]) {
  const QUALIFIED: Player[] = []
  const DISQUALIFIED: Player[] = []

  west.forEach((match) => {
    let p1 = match[0]
    let p2 = match[1]

    if (p1.games.playoff_stage.won > p2.games.playoff_stage.won) {
      QUALIFIED.push(p1)
      DISQUALIFIED.push(p2)
    } else {
      QUALIFIED.push(p2)
      DISQUALIFIED.push(p1)
    }
  })
  east.forEach((match) => {
    let p1 = match[0]
    let p2 = match[1]

    if (p1.games.playoff_stage.won > p2.games.playoff_stage.won) {
      QUALIFIED.push(p1)
      DISQUALIFIED.push(p2)
    } else {
      QUALIFIED.push(p2)
      DISQUALIFIED.push(p1)
    }
  })

  return { QUALIFIED, DISQUALIFIED }
}

function assignSides(players: Player[]) {
  const WEST: Player[][] = []
  const EAST: Player[][] = []

  if (players[0].playoff_side == null) {
    let upper_bracket: Player[] = []
    let lower_bracket: Player[] = []
    for (let i = 0; i < 4; i++) {
      upper_bracket.push(players.shift()!)
      lower_bracket.unshift(players.pop()!)
    }

    let p1, p2
    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        p1 = upper_bracket.pop()
        p2 = lower_bracket.pop()
      } else {
        p1 = players.pop()
        p2 = players.pop()
      }
      if (i % 2 === 0) {
        p1!.playoff_side = 'w'
        p2!.playoff_side = 'w'
        WEST.push([p1!, p2!])
      } else {
        p1!.playoff_side = 'e'
        p2!.playoff_side = 'e'
        EAST.push([p1!, p2!])
      }
    }
  } else {
    let west_bracket: Player[] = []
    let east_bracket: Player[] = []

    while (players.length) {
      let player = players.pop()
      player!.playoff_side === 'w'
        ? west_bracket.push(player!)
        : east_bracket.push(player!)
    }

    sortPlayersByWins(west_bracket, 'total')
    sortPlayersByWins(east_bracket, 'total')

    while (west_bracket.length) {
      let p1 = west_bracket.pop()
      let p2 = west_bracket.pop()
      WEST.push([p1!, p2!])
    }
    while (east_bracket.length) {
      let p1 = east_bracket.pop()
      let p2 = east_bracket.pop()
      WEST.push([p1!, p2!])
    }
  }

  return { WEST, EAST }
}
