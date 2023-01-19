import Match, { RoundResultType } from './Match.js'
import { Player } from '../Player/index.js'
import { MatchUpsType } from '../../helpers/setup.js'

export type RoundStatsType = {
  stage_round: string
  matches: {
    match: number
    p1: Player
    p2: Player
    round_results: RoundResultType[]
  }[]
}

export default class BestOfThree extends Match {
  static run_match(PLAYERS: Player[], match_ups: MatchUpsType, round: number) {
    const ROUND_STATS: RoundStatsType = {
      stage_round: 'Qualifier round ' + round + 1,
      matches: [],
    }

    match_ups.forEach((match_up, i) => {
      let match = i
      let p1 = PLAYERS[match_up.A]
      let p2 = PLAYERS[match_up.B]
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
          p1.win_match('qualifier', p2.id, p2.class_id)
          p2.lose_match('qualifier')
        } else if (result.p2 && (outcomes.p2 > 0 || outcomes.tie === 2)) {
          p2.win_match('qualifier', p1.id, p1.class_id)
          p1.lose_match('qualifier')
        } else {
          p1.tie_match('qualifier')
          p2.tie_match('qualifier')
        }
      } else if (outcomes.p1 === 2) {
        p1.sweep_match('qualifier', p2.id, p2.class_id)
        p2.lose_match('qualifier')
      } else {
        p2.sweep_match('qualifier', p1.id, p1.class_id)
        p1.lose_match('qualifier')
      }

      ROUND_STATS.matches.push({ match, p1, p2, round_results })
    })

    return ROUND_STATS
  }
}
