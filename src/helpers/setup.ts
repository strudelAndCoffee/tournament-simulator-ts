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

export type MatchUpsType = { A: number; B: number }[]

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

function generateQualifierMatchups() {
  const match_ups: MatchUpsType[] = []

  const pool_size = TOTAL_PLAYERS / 4
  let poolA = []
  let poolB = []
  let poolC = []
  let poolD = []
  for (let i = 0; i < TOTAL_PLAYERS; i++) {
    let id = i
    let mod = i % 4

    if (i === 0 || mod === 0) {
      poolA.push(id)
    } else if (i === 1 || mod === 1) {
      poolB.push(id)
    } else if (i === 2 || mod === 2) {
      poolC.push(id)
    } else {
      poolD.push(id)
    }
  }

  let count = 4
  while (count > 0) {
    const round_match_ups: MatchUpsType = []

    for (let i = 0; i < pool_size; i++) {
      let matchup1: { A: number; B: number }
      let matchup2: { A: number; B: number }

      if (count === 4) {
        matchup1 = { A: poolA[i], B: poolB[i] }
        matchup2 = { A: poolC[i], B: poolD[i] }
      }
      if (count === 3) {
        matchup1 = { A: poolA[i], B: poolC[i] }
        matchup2 = { A: poolB[i], B: poolD[i] }
      }
      if (count === 2) {
        matchup1 = { A: poolA[i], B: poolD[i] }
        matchup2 = { A: poolB[i], B: poolC[i] }
      }
      if (count === 1) {
        if (i === 0 || i % 2 === 0) {
          matchup1 = { A: poolA[i], B: poolA[i + 1] }
          matchup2 = { A: poolB[i], B: poolB[i + 1] }
        } else {
          matchup1 = { A: poolC[i], B: poolC[i - 1] }
          matchup2 = { A: poolD[i], B: poolD[i - 1] }
        }
      }

      round_match_ups.push(matchup1!)
      round_match_ups.push(matchup2!)
    }

    match_ups.push(round_match_ups)
    count--
  }

  return match_ups
}

export {
  TOTAL_PLAYERS,
  NAMES,
  GROUP_STAGE_PAIRS,
  generateStartingPlayers,
  generateQualifierMatchups,
}
