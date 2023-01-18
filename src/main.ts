import {
  Knight,
  Vanguard,
  Gladiator,
  Samurai,
  Berserker,
  Ninja,
} from './classes/Player/PlayerClass.js'
import Player from './classes/Player/Player.js'
import { shuffleArray, names } from './helpers/index.js'

const TOTAL_PLAYERS = 48
const STARTING_PLAYERS: Player[] = []

function generatePlayers() {
  shuffleArray(names)
  for (let i = 0; i < TOTAL_PLAYERS; i++) {
    if (i % 6 === 0) {
      let player_class = new Knight()
      let player = new Player(i, names[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 1) {
      let player_class = new Samurai()
      let player = new Player(i, names[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 2) {
      let player_class = new Gladiator()
      let player = new Player(i, names[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 3) {
      let player_class = new Berserker()
      let player = new Player(i, names[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 4) {
      let player_class = new Ninja()
      let player = new Player(i, names[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 5) {
      let player_class = new Vanguard()
      let player = new Player(i, names[i], player_class)
      STARTING_PLAYERS.push(player)
    }
  }
  shuffleArray(STARTING_PLAYERS)
}

generatePlayers()
console.log(STARTING_PLAYERS[0])
