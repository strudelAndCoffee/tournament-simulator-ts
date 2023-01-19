import { Player } from '../classes/Player/index.js'
import BestOfThree, { RoundStatsType } from '../classes/Match/BestOfThree.js'
import {
  generateStageIDs,
  generateQualifierMatchups,
  sortPlayersByWins,
} from '../helpers/index.js'

export default function qualifierStage(PLAYERS: Player[]) {
  const STAGE = 'qualifier'
  const STAGE_STATS: { [index: number]: RoundStatsType } = {}

  generateStageIDs(PLAYERS)
  const match_ups = generateQualifierMatchups()
  for (let i = 0; i < match_ups.length; i++) {
    let round = i + 1
    let ROUND_STATS = BestOfThree.run_match(PLAYERS, match_ups[i], i, STAGE)

    STAGE_STATS[round] = ROUND_STATS
  }

  sortPlayersByWins(PLAYERS, STAGE)

  PLAYERS.forEach((p) => {
    console.log(p.xp)
    console.log(p.games.qualifier)
  })
}
