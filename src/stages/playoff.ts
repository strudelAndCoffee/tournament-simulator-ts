import { Player } from '../classes/Player'
import { StageStatsType } from '../main'

export default function playoffStage(players: Player[]) {
  const QUALIFIED: Player[] = []
  const DISQUALIFIED: Player[] = []
  const stage_stats: StageStatsType = {}

  return { QUALIFIED, DISQUALIFIED, stage_stats }
}
