import { Player } from '../classes/Player/index.js'

function rollDice(min: number, max: number) {
  return Math.max(Math.ceil(Math.random() * max), min)
}

function generateStageIDs(players: Player[]) {
  for (let i = 0; i < players.length; i++) {
    players[i].stage_id = i
  }
}

export { rollDice, generateStageIDs }
