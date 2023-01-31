import { RoundStatsType } from '../classes/Match/Match'
import { Player } from '../classes/Player'

const STAGE = 'group_stage_wildcard'

export default function groupWildcard(players: Player[]) {
  const round_stats: RoundStatsType = {
    stage_round: STAGE,
    matches: [],
  }
  let in_group: Player[] = []
  let out_group: Player[] = []

  return { in_group, out_group, round_stats }
}
