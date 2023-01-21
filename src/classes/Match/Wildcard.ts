import Match, { RoundResultType } from './Match.js'
import { Player } from '../Player/index.js'

export default class Wildcard extends Match {
  static run_match(p1: Player, p2: Player, stage: string) {
    const round_results: RoundResultType[] = []
    let qualified, disqualified

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
        qualified = p1
        disqualified = p2
      } else if (result.p2 && (outcomes.p2 > 0 || outcomes.tie === 2)) {
        qualified = p2
        disqualified = p1
      } else {
        const { new_pool, out } = this.roll_off([p1, p2], 1)
        qualified = new_pool[0]
        disqualified = out[0]
      }

      qualified.win_wildcard(stage)
      disqualified.lose_wildcard(stage)
    } else {
      if (outcomes.p1 === 2) {
        qualified = p1
        disqualified = p2
      } else {
        qualified = p2
        disqualified = p1
      }

      qualified.win_wildcard(stage)
      disqualified.lose_wildcard(stage)
    }

    return { qualified, disqualified, round_results }
  }
}
