import { Player } from '../classes/Player/index.js'
import BestOfThree from '../classes/Match/BestOfThree.js'
import { StageStatsType } from '../main.js'
import {
  generateGroups,
  GROUP_STAGE_PAIRS,
  sortPlayersByWins,
  rankPlayers,
  levelUpPlayers,
} from '../helpers/index.js'
import { GroupType } from '../helpers/setup.js'
import groupWildcard from './groupWildcard.js'

const STAGE = 'group_stage'

export default function groupStage(PLAYERS: Player[]) {
  const stage_stats_group: StageStatsType = {}
  const GROUPS = generateGroups(PLAYERS)

  for (let i = 0; i < 2; i++) {
    let stage_round = i + 1
    let stage_round_stats = []

    for (let j = 0; j < GROUP_STAGE_PAIRS.length; j++) {
      const group_A_round_stats = BestOfThree.run_match(
        GROUPS.A,
        GROUP_STAGE_PAIRS[j],
        j,
        STAGE
      )
      const group_B_round_stats = BestOfThree.run_match(
        GROUPS.B,
        GROUP_STAGE_PAIRS[j],
        j,
        STAGE
      )
      const group_C_round_stats = BestOfThree.run_match(
        GROUPS.C,
        GROUP_STAGE_PAIRS[j],
        j,
        STAGE
      )
      const group_D_round_stats = BestOfThree.run_match(
        GROUPS.D,
        GROUP_STAGE_PAIRS[j],
        j,
        STAGE
      )
      const group_E_round_stats = BestOfThree.run_match(
        GROUPS.E,
        GROUP_STAGE_PAIRS[j],
        j,
        STAGE
      )
      const group_F_round_stats = BestOfThree.run_match(
        GROUPS.F,
        GROUP_STAGE_PAIRS[j],
        j,
        STAGE
      )

      stage_round_stats.push(
        group_A_round_stats,
        group_B_round_stats,
        group_C_round_stats,
        group_D_round_stats,
        group_E_round_stats,
        group_F_round_stats
      )
    }

    stage_stats_group[stage_round] = stage_round_stats
  }

  const { PLAYOFF_PLAYERS, WILDCARD, NON_ADVANCING } =
    getAdvancingPlayers(GROUPS)

  const { in_group, out_group, round_stats } = groupWildcard(WILDCARD)
  stage_stats_group['wildcard'] = round_stats

  while (in_group.length) {
    let qualified = in_group.pop()
    PLAYOFF_PLAYERS.push(qualified!)
  }
  while (out_group.length) {
    let disqualified = out_group.pop()
    NON_ADVANCING.push(disqualified!)
  }

  rankPlayers(PLAYOFF_PLAYERS, STAGE)
  levelUpPlayers(PLAYOFF_PLAYERS, false)
  return {
    PLAYOFF_PLAYERS,
    NON_ADVANCING,
    stage_stats_group,
  }
}

function getAdvancingPlayers(groups: GroupType) {
  const PLAYOFF_PLAYERS: Player[] = []
  const NON_ADVANCING: Player[] = []
  const WILDCARD: Player[] = []

  sortPlayersByWins(groups.A, STAGE)
  sortPlayersByWins(groups.B, STAGE)
  sortPlayersByWins(groups.C, STAGE)
  sortPlayersByWins(groups.D, STAGE)
  sortPlayersByWins(groups.E, STAGE)
  sortPlayersByWins(groups.F, STAGE)

  for (let g in groups) {
    for (let i = 0; i < 6; i++) {
      let player = groups[g].pop()

      if (i < 2) NON_ADVANCING.push(player!)
      if (i >= 2 && i < 4) WILDCARD.push(player!)
      if (i >= 4) PLAYOFF_PLAYERS.push(player!)
    }
  }

  sortPlayersByWins(WILDCARD, STAGE)
  sortPlayersByWins(PLAYOFF_PLAYERS, STAGE)
  for (let i = 0; i < 4; i++) {
    let player = WILDCARD.pop()
    NON_ADVANCING.push(player!)
  }

  return { PLAYOFF_PLAYERS, WILDCARD, NON_ADVANCING }
}
