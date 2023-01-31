import {
  Player,
  Knight,
  Vanguard,
  Gladiator,
  Samurai,
  Berserker,
  Ninja,
} from '../classes/Player/index.js'
import { shuffleArray } from './index.js'

export type GroupType = { [index: string]: Player[] }

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

function generateStartingPlayers() {
  const STARTING_PLAYERS = []
  shuffleArray(NAMES)

  for (let i = 0; i < TOTAL_PLAYERS; i++) {
    if (i % 6 === 0) {
      let player_class = new Knight()
      let player = new Player(i, NAMES[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 1) {
      let player_class = new Samurai()
      let player = new Player(i, NAMES[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 2) {
      let player_class = new Gladiator()
      let player = new Player(i, NAMES[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 3) {
      let player_class = new Berserker()
      let player = new Player(i, NAMES[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 4) {
      let player_class = new Ninja()
      let player = new Player(i, NAMES[i], player_class)
      STARTING_PLAYERS.push(player)
    }
    if (i % 6 === 5) {
      let player_class = new Vanguard()
      let player = new Player(i, NAMES[i], player_class)
      STARTING_PLAYERS.push(player)
    }
  }

  shuffleArray(STARTING_PLAYERS)
  return STARTING_PLAYERS
}

function generateGroups(players: Player[]) {
  const GROUPS: GroupType = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
  }

  for (let i = 0; i < players.length; i++) {
    if (i % 6 === 0) GROUPS.A.push(players[i])
    if (i % 6 === 1) GROUPS.B.push(players[i])
    if (i % 6 === 2) GROUPS.C.push(players[i])
    if (i % 6 === 3) GROUPS.D.push(players[i])
    if (i % 6 === 4) GROUPS.E.push(players[i])
    if (i % 6 === 5) GROUPS.F.push(players[i])
  }

  return GROUPS
}

export { TOTAL_PLAYERS, NAMES, generateStartingPlayers, generateGroups }
