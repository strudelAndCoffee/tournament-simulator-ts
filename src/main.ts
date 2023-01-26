import { Player } from './classes/Player/index.js'
import { generateStartingPlayers } from './helpers/setup.js'
import { qualifierStage } from './stages/index.js'

const GAME_RECORDS: { [index: string]: string[] } = {}

function startGame() {
  const STARTING_PLAYERS = generateStartingPlayers()
  recordPlayers(STARTING_PLAYERS, 'starting_players')

  const { QUALIFIED_PLAYERS, DISQUALIFIED } = qualifierStage(STARTING_PLAYERS)
  recordPlayers(QUALIFIED_PLAYERS, 'qualified_players')
  recordPlayers(DISQUALIFIED, 'disqualified_players')

  // const PLAYOFF_PLAYERS = groupStage(QUALIFIED_PLAYERS)
  // const QUARTER_FINALISTS = playoffStage(PLAYOFF_PLAYERS)
  // const SEMI_FINALISTS = quarterFinalStage(QUARTER_FINALISTS)
  // const { FINALISTS, THIRD_PLACE_CONTENDERS } = semiFinalStage(SEMI_FINALISTS)
  // const { THIRD_PLACE, FOURTH_PLACE } = thirdPlaceFinal(FINALISTS)
  // const { CHAMPION, SECOND_PLACE } = grandFinal(FINALISTS)
}

function recordPlayers(players: Player[], name: string) {
  const record: string[] = []
  players.forEach((p) => {
    let player = JSON.stringify(p)
    record.push(player)
  })
  GAME_RECORDS[name] = record
}

startGame()
