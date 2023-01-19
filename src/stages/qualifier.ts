import { Player } from '../classes/Player/index.js'
import Match from '../classes/Match/Match.js'
import { generateQualifierMatchups } from '../helpers/index.js'

export default function qualifierStage(PLAYERS: Player[]) {
  const player_ids = PLAYERS.map((p) => {
    return p.id
  })
  const matchups = generateQualifierMatchups(player_ids)
}
