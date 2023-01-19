import { Player } from '../classes/Player/index.js'
import BestOfThree, { RoundStatsType } from '../classes/Match/BestOfThree.js'
import {
  generateStageIDs,
  generateQualifierMatchups,
} from '../helpers/index.js'

export default function qualifierStage(PLAYERS: Player[]) {
  const STAGE_STATS: { [index: number]: RoundStatsType } = {}

  generateStageIDs(PLAYERS)
  const match_ups = generateQualifierMatchups()
  for (let i = 0; i < match_ups.length; i++) {
    let round = i + 1
    let ROUND_STATS = BestOfThree.run_match(PLAYERS, match_ups[i], i)

    STAGE_STATS[round] = ROUND_STATS
  }

  PLAYERS.sort((a, b) => a.xp - b.xp)
  PLAYERS.forEach((p) => {
    console.log(p.stage_id, p.id, p.xp)
    console.log(p.games.qualifier)
  })
}
