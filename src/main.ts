import { RoundStatsType } from './classes/Match/Match.js'
import { Player } from './classes/Player/index.js'
import { generateStartingPlayers } from './helpers/setup.js'
import { STAGES } from './stages/index.js'

export type StageStatsType = {
  [index: number | string]: RoundStatsType | RoundStatsType[]
}
type GameRecordType = { [index: string]: string[] }

const GAME_RECORDS: GameRecordType = {}

function startGame() {
  const STARTING_PLAYERS = generateStartingPlayers()
  recordPlayers(STARTING_PLAYERS, 'starting_players')

  let current_players = STARTING_PLAYERS
  STAGES.forEach(({ name, stage }) => {
    const { QUALIFIED, DISQUALIFIED, stage_stats } = stage(current_players)

    recordPlayers(QUALIFIED, `${name}_stage_qualified_players`)
    recordPlayers(DISQUALIFIED, `${name}_stage_disqualified_players`)
    recordStats(stage_stats, `${name}_stage_stats`)

    current_players = QUALIFIED
  })

  console.log(GAME_RECORDS)
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
