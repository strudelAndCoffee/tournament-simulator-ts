import { RoundStatsType } from './classes/Match/Match.js'
import { Player } from './classes/Player/index.js'
import { generateStartingPlayers } from './helpers/setup.js'
import { qualifierStage, groupStage } from './stages/index.js'

export type StageStatsType = { [index: number | string]: RoundStatsType }

const GAME_RECORDS: { [index: string]: string[] } = {}

function startGame() {
  const STARTING_PLAYERS = generateStartingPlayers()
  recordPlayers(STARTING_PLAYERS, 'players_starting')

  const { QUALIFIED_PLAYERS, DISQUALIFIED, stage_stats } =
    qualifierStage(STARTING_PLAYERS)
  recordPlayers(QUALIFIED_PLAYERS, 'players_qualified')
  recordPlayers(DISQUALIFIED, 'players_disqualified')
  recordStats(stage_stats, 'stage_stats_qualifier')

  // console.log(GAME_RECORDS)

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

function recordStats(stats: StageStatsType, name: string) {
  const record: string[] = []
  const statsArray = Object.entries(stats)
  statsArray.forEach((round) => {
    let round_stat = JSON.stringify(round[1])
    record.push(round_stat)
  })
  GAME_RECORDS[name] = record
}

startGame()
