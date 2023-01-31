import { RoundStatsType } from '../classes/Match/Match'
import Wildcard from '../classes/Match/Wildcard'
import { Player } from '../classes/Player'

const STAGE = 'group_stage_wildcard'

export default function groupWildcard(players: Player[]) {
  const round_stats: RoundStatsType = {
    stage_round: STAGE,
    matches: [],
  }
  let in_group: Player[] = []
  let out_group: Player[] = []

  let upper_bracket: Player[] = []
  let lower_bracket: Player[] = []
  while (players.length) {
    let player = players.pop()
    if (upper_bracket.length < 4) upper_bracket.push(player!)
    else lower_bracket.push(player!)
  }

  let match_ups: Player[][] = []
  while (upper_bracket.length) {
    let p1 = upper_bracket.shift()
    let p2 = upper_bracket.pop()
    match_ups.push([p1!, p2!])
  }
  while (lower_bracket.length) {
    let p1 = lower_bracket.shift()
    let p2 = lower_bracket.pop()
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
