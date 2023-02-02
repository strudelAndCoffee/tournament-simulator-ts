import { Player } from '../classes/Player'
import { StageStatsType } from '../main'
import { BestOfFive } from '../classes/Match/index.js'

export default function playoffStage(players: Player[]) {
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
    i % 2 === 0 ? WEST.push([p1!, p2!]) : EAST.push([p1!, p2!])
  }

  const QUALIFIED: Player[] = []
  const DISQUALIFIED: Player[] = []
  const stage_stats: StageStatsType = {}

  return { QUALIFIED, DISQUALIFIED, stage_stats }
}
