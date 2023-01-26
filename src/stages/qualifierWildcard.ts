import { Player } from '../classes/Player/index.js'
import { RoundStatsType } from '../classes/Match/Match.js'
import Wildcard from '../classes/Match/Wildcard.js'

const STAGE = 'qualifier_wildcard'

export default function qualifierWildcard(players: Player[]) {
  const round_stats: RoundStatsType = {
    stage_round: STAGE,
    matches: [],
  }
  let in_group: Player[] = []
  let out_group: Player[] = []

  let match_ups: Player[][] = []
  while (players.length) {
    let p1 = players.pop()
    let p2 = players.pop()
    match_ups.push([p1!, p2!])
  }

  match_ups.forEach((match_up, i) => {
    let match = i
    let p1 = match_up[0]
    let p2 = match_up[1]

    const { qualified, disqualified, round_results } = Wildcard.run_match(
      p1,
      p2,
      STAGE
    )

    round_stats.matches.push({ match, p1, p2, round_results })
    in_group.push(qualified!)
    out_group.push(disqualified!)
  })

  return { in_group, out_group, round_stats }
}
