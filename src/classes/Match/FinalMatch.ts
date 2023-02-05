import Match, { RoundResultType, RoundStatsType } from './Match.js'
import { Player } from '../Player/index.js'

export default class FinalMatch extends Match {
  static run_final(players: Player[], stage: string) {
    const round_stats: RoundStatsType = {
      stage_round: `${stage} stage`,
      matches: [],
    }

    let p1 = players[0]
    let p2 = players[1]
    let round_results: RoundResultType[] = []
    let outcomes = {
      p1: 0,
      p2: 0,
    }

    while (outcomes.p1 < 4 && outcomes.p2 < 4) {
      let result = this.run_round(p1, p2)

      if (result.p1) {
        outcomes.p1++
        outcomes.p1 === 3
          ? p1.sweep_match(stage, p2.id, p2.class_id)
          : p1.win_match(stage, p2.id, p2.class_id)
        p2.lose_match(stage)
      } else if (result.p2) {
        outcomes.p2++
        outcomes.p2 === 3
          ? p2.sweep_match(stage, p1.id, p1.class_id)
          : p2.win_match(stage, p1.id, p1.class_id)
        p1.lose_match(stage)
      }

      round_results.push(result)
    }

    round_stats.matches.push({ p1, p2, round_results })

    return round_stats
  }
}
