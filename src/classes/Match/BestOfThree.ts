import Match, { RoundStatsType } from './Match.js'
import { Player } from '../Player/index.js'
import { MatchUpsType } from '../../helpers/matchups.js'

export default class BestOfThree extends Match {
  static run_match(
    players: Player[],
    match_ups: MatchUpsType,
    round: number,
    stage: string
  ) {
    const round_stats: RoundStatsType = {
      stage_round: `${stage} round ${round + 1}`,
      matches: [],
    }

    match_ups.forEach((match_up, i) => {
      let match = i
      let p1 = players[match_up.A]
      let p2 = players[match_up.B]
      let round_results = []

      let outcomes = {
        p1: 0,
        p2: 0,
        tie: 0,
      }
      let round = 1
      while (round < 3) {
        let result = this.run_round(p1, p2)
        if (result.p1) outcomes.p1++
        else if (result.p2) outcomes.p2++
        else if (result.tie) outcomes.tie++

        round_results.push(result)
        round++
      }

      if (outcomes.p1 !== 2 && outcomes.p2 !== 2) {
        let result = this.run_round(p1, p2)
        round_results.push(result)

        if (result.p1 && (outcomes.p1 > 0 || outcomes.tie === 2)) {
          p1.win_match(stage, p2.id, p2.class_id)
          p2.lose_match(stage)
        } else if (result.p2 && (outcomes.p2 > 0 || outcomes.tie === 2)) {
          p2.win_match(stage, p1.id, p1.class_id)
          p1.lose_match(stage)
        } else {
          p1.tie_match(stage)
          p2.tie_match(stage)
        }
      } else if (outcomes.p1 === 2) {
        p1.sweep_match(stage, p2.id, p2.class_id)
        p2.lose_match(stage)
      } else {
        p2.sweep_match(stage, p1.id, p1.class_id)
        p1.lose_match(stage)
      }

      round_stats.matches.push({ match, p1, p2, round_results })
    })

    return round_stats
  }
}
