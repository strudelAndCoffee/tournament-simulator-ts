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

  console.log(WEST)
  console.log(EAST)

  const QUALIFIED: Player[] = []
  const DISQUALIFIED: Player[] = []

  return { QUALIFIED, DISQUALIFIED, stage_stats }
}
