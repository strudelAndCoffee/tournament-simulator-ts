import { generateStartingPlayers } from './helpers/setup.js'
import { qualifierStage } from './stages/index.js'

function startGame() {
  const STARTING_PLAYERS = generateStartingPlayers()
  const QUALIFIED_PLAYERS = qualifierStage(STARTING_PLAYERS)
  // const PLAYOFF_PLAYERS = groupStage(QUALIFIED_PLAYERS)
  // const QUARTER_FINALISTS = playoffStage(PLAYOFF_PLAYERS)
  // const SEMI_FINALISTS = quarterFinalStage(QUARTER_FINALISTS)
  // const { FINALISTS, THIRD_PLACE_CONTENDERS } = semiFinalStage(SEMI_FINALISTS)
  // const { THIRD_PLACE, FOURTH_PLACE } = thirdPlaceFinal(FINALISTS)
  // const { CHAMPION, SECOND_PLACE } = grandFinal(FINALISTS)
}

startGame()
