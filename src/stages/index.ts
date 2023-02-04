import { Player } from '../classes/Player/index.js'
import { StageStatsType } from '../main.js'
import qualifierStage from './qualifier.js'
import groupStage from './group.js'
import playoffStage from './playoff.js'
// import quarterFinalStage from './quarterFinal.js'
// import semiFinalStage from './semiFinal.js'
// import finalStage from './final.js'

type Stage = (players: Player[]) => {
  QUALIFIED: Player[]
  DISQUALIFIED: Player[]
  stage_stats: StageStatsType
}

export const STAGES: { name: string; stage: Stage }[] = [
  { name: 'qualifier', stage: qualifierStage },
  { name: 'group', stage: groupStage },
  { name: 'playoff', stage: playoffStage },
  // { name: 'quarter_final', stage: quarterFinalStage }
  // { name: 'semi_final', stage: semiFinalStage }
  // { name: 'final', stage: finalStage }
]
