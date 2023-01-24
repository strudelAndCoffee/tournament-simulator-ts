import { Player } from './classes/Player/index.js'
import { generateStartingPlayers } from './helpers/setup.js'
import { qualifierStage } from './stages/index.js'

const GAME_RECORDS: { [index: string]: Player[] } = {}

function startGame() {
  const STARTING_PLAYERS = generateStartingPlayers()
  GAME_RECORDS.starting_players = STARTING_PLAYERS
  const { QUALIFIED_PLAYERS, DISQUALIFIED } = qualifierStage(STARTING_PLAYERS)
  GAME_RECORDS.qualified_players = QUALIFIED_PLAYERS
  GAME_RECORDS.disqualified_players = DISQUALIFIED
  // const PLAYOFF_PLAYERS = groupStage(QUALIFIED_PLAYERS)
  // const QUARTER_FINALISTS = playoffStage(PLAYOFF_PLAYERS)
  // const SEMI_FINALISTS = quarterFinalStage(QUARTER_FINALISTS)
  // const { FINALISTS, THIRD_PLACE_CONTENDERS } = semiFinalStage(SEMI_FINALISTS)
  // const { THIRD_PLACE, FOURTH_PLACE } = thirdPlaceFinal(FINALISTS)
  // const { CHAMPION, SECOND_PLACE } = grandFinal(FINALISTS)
}

startGame()
