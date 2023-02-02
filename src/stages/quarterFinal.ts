import { Player } from '../classes/Player/index.js'
import { StageStatsType } from '../main.js'

export default function quarterFinalStage(players: Player[]) {
  const QUALIFIED: Player[] = []
  const DISQUALIFIED: Player[] = []
  const stage_stats: StageStatsType = {}

  return { QUALIFIED, DISQUALIFIED, stage_stats }
}
