import { Player } from '../classes/Player'
import { StageStatsType } from '../main'
import { FinalMatch } from '../classes/Match'

const STAGE = 'final'

export default function finalStage(players: Player[]) {
  const stage_stats: StageStatsType = {}

  const round_stats = FinalMatch.run_final(players, STAGE)
  stage_stats[STAGE] = round_stats

  const { WINNER, LOSER } = getWinningPlayer(players)

  return { WINNER, LOSER, stage_stats }
}

function getWinningPlayer(players: Player[]) {
  const WINNER: Player[] = []
  const LOSER: Player[] = []

  const p1 = players[0]
  const p2 = players[1]
  if (p1.games.final.won > p2.games.final.won) {
    WINNER.push(p1)
    LOSER.push(p2)
  } else {
    WINNER.push(p2)
    LOSER.push(p1)
  }

  return { WINNER, LOSER }
}
