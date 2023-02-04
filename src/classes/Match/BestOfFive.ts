import Match, { RoundResultType, RoundStatsType } from './Match.js'
import { Player } from '../Player/index.js'

export default class BestOfFive extends Match {
  static run_match(players: Player[], match: number, stage: string) {
    const round_stats: RoundStatsType = {
      stage_round: `${stage} match ${match + 1}`,
      matches: [],
    }

    let p1 = players[0]
    let p2 = players[1]
    let round_results: RoundResultType[] = []
    let outcomes = {
      p1: 0,
      p2: 0,
      tie: 0,
    }

    for (let i = 0; i < 3; i++) {
      let result = this.run_round(p1, p2)
      if (result.p1) outcomes.p1++
      else if (result.p2) outcomes.p2++
      else if (result.tie) outcomes.tie++

      round_results.push(result)
    }

    if (outcomes.p1 !== 3 && outcomes.p2 !== 3) {
      let result = this.run_round(p1, p2)
      round_results.push(result)

      if (result.p1 && (outcomes.p1 === 2 || outcomes.tie === 3)) {
        p1.win_match(stage, p2.id, p2.class_id)
        p2.lose_match(stage)
      } else if (result.p2 && (outcomes.p2 === 2 || outcomes.tie === 3)) {
        p2.win_match(stage, p1.id, p1.class_id)
        p1.lose_match(stage)
      } else {
        let tie_breaker_result = this.run_tie_breaker(p1, p2, stage)
        round_results.push(tie_breaker_result)
      }
    } else if (outcomes.p1 === 3) {
      p1.sweep_match(stage, p2.id, p2.class_id)
      p2.lose_match(stage)
    } else {
      p2.sweep_match(stage, p1.id, p1.class_id)
      p1.lose_match(stage)
    }

    round_stats.matches.push({ match, p1, p2, round_results })

    return round_stats
  }

  static run_tie_breaker(p1: Player, p2: Player, stage: string) {
    const tie_breaker_result = this.run_round(p1, p2)

    if (tie_breaker_result.tie) {
      let { new_pool, out } = this.roll_off([p1, p2], 1)
      new_pool[0].win_match(stage, p2.id, p2.class_id)
      out[0].lose_match(stage)
    } else if (tie_breaker_result.p1) {
      p1.win_match(stage, p2.id, p2.class_id)
      p2.lose_match(stage)
    } else {
      p2.win_match(stage, p1.id, p1.class_id)
      p1.lose_match(stage)
    }

    return tie_breaker_result
  }
}
