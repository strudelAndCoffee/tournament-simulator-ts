import { RoundStatsType } from './classes/Match/Match.js'
import { Player } from './classes/Player/index.js'
import { generateStartingPlayers } from './helpers/setup.js'
import { STAGES } from './stages/index.js'
import finalStage from './stages/final.js'

export type StageStatsType = {
  [index: number | string]: RoundStatsType | RoundStatsType[]
}
type GameRecordType = { [index: string]: string[] }

const GAME_RECORDS: GameRecordType = {}
const map: Record<string, number> = {}

function startGame() {
  const STARTING_PLAYERS = generateStartingPlayers()
  recordPlayers(STARTING_PLAYERS, 'starting_players')

  let current_players = STARTING_PLAYERS
  STAGES.forEach(({ stage_name, stage }) => {
    const { QUALIFIED, DISQUALIFIED, stage_stats } = stage(
      current_players,
      stage_name
    )

    recordPlayers(QUALIFIED, `${stage_name}_stage_qualified_players`)
    recordPlayers(DISQUALIFIED, `${stage_name}_stage_disqualified_players`)
    recordStats(stage_stats, `${stage_name}_stage_stats`)

    current_players = QUALIFIED
  })

  const { WINNER, LOSER, stage_stats } = finalStage(current_players)

  recordPlayers(WINNER, `final_loser`)
  recordPlayers(LOSER, `final_winner`)
  recordStats(stage_stats, `final_stage_stats`)

  if (!map[WINNER[0].player_class.name]) map[WINNER[0].player_class.name] = 1
  else map[WINNER[0].player_class.name]++
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

// for (let i = 5000; i > 0; i--) {
//   startGame()
// }

// console.log(map)

startGame()
