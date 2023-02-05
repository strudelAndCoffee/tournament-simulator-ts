import { Player } from '../classes/Player/index.js'
import { StageStatsType } from '../main.js'
import qualifierStage from './qualifier.js'
import groupStage from './group.js'
import playoffStage from './playoff.js'

type Stage = (
  players: Player[],
  stage_name: string
) => {
  QUALIFIED: Player[]
  DISQUALIFIED: Player[]
  stage_stats: StageStatsType
}

export const STAGES: { stage_name: string; stage: Stage }[] = [
  { stage_name: 'qualifier', stage: qualifierStage },
  { stage_name: 'group_stage', stage: groupStage },
  { stage_name: 'playoff_stage', stage: playoffStage },
  { stage_name: 'quarter_final', stage: playoffStage },
  { stage_name: 'semi_final', stage: playoffStage },
]
