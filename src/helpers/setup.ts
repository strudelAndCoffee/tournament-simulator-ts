import {
  Player,
  Knight,
  Vanguard,
  Gladiator,
  Samurai,
  Berserker,
  Ninja,
} from '../classes/Player/index.js'
import { shuffleArray, names } from './index.js'

const TOTAL_PLAYERS = 48
const NAMES = [
  'Ari',
  'Aaron',
  'Beatrice',
  'Bob',
  'Clara',
  'Charles',
  'Danielle',
  'Doug',
  'Erica',
  'Forest',
  'Fiona',
  'Georgia',
  'Giovanni',
  'Hector',
  'Helena',
  'Ivy',
  'Ian',
  'Jessica',
  'Juan',
  'Katrina',
  'Kirk',
  'Leilani',
  'Leo',
  'Maria',
  'Maximilian',
  'Nadia',
  'Nathaniel',
  'Olivia',
  'Oscar',
  'Penelope',
  'Pat',
  'Quincy',
  'Ruth',
  'Roland',
  'Sakura',
  'Steve',
  'Tabitha',
  'Tao',
  'Vivienne',
  'Vlad',
  'Wendy',
  'Wade',
  'Xena',
  'Xavier',
  'Yvette',
  'Yosef',
  'Zoey',
  'Zechariah',
]
const GROUP_STAGE_PAIRS = [
  [
    [0, 1],
    [2, 3],
    [4, 5],
  ],
  [
    [0, 3],
    [1, 4],
    [2, 5],
  ],
  [
    [0, 5],
    [1, 3],
    [2, 4],
  ],
  [
    [0, 2],
    [1, 5],
    [3, 4],
  ],
  [
    [0, 4],
    [1, 2],
    [3, 5],
  ],
]

function generatePlayers() {
  const STARTING_PLAYERS = []
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
  return STARTING_PLAYERS
}

export { TOTAL_PLAYERS, NAMES, GROUP_STAGE_PAIRS, generatePlayers }
