import { Player } from '../classes/Player'
import { StageStatsType } from '../main'
import { BestOfFive } from '../classes/Match/index.js'

const STAGE = 'playoff_stage'

export default function playoffStage(players: Player[]) {
  const stage_stats: StageStatsType = {}
  const WEST: Player[][] = []
  const EAST: Player[][] = []

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

  WEST.forEach((match, i) => {
    let stage_round = 'west' + i + 1
    let round_stats = BestOfFive.run_match(match, i, STAGE)
    stage_stats[stage_round] = round_stats
  })
  EAST.forEach((match, i) => {
    let stage_round = 'east' + i + 1
    let round_stats = BestOfFive.run_match(match, i, STAGE)
    stage_stats[stage_round] = round_stats
  })

  const { QUALIFIED, DISQUALIFIED } = getAdvancingPlayers(WEST, EAST)
  console.log(QUALIFIED)
  console.log(DISQUALIFIED)

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
