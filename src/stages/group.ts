import { Player } from '../classes/Player/index.js'
import BestOfThree from '../classes/Match/BestOfThree.js'

type GroupType = { [index: string]: Player[] }

export default function groupStage(PLAYERS: Player[]) {
  const GROUPS = generateGroups(PLAYERS)

  for (let i = 1; i <= 2; i++) {}
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
