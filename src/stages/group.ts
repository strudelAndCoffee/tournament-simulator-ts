import { Player } from '../classes/Player/index.js'
import { BestOfThree } from '../classes/Match/index.js'
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

let STAGE: string

export default function groupStage(players: Player[], stage_name: string) {
  STAGE = stage_name
  const stage_stats: StageStatsType = {}
  const GROUPS = generateGroups(players)

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

    stage_stats[stage_round] = stage_round_stats
  }

  const { QUALIFIED, WILDCARD, DISQUALIFIED } = getAdvancingPlayers(GROUPS)

  const { in_group, out_group, round_stats } = groupWildcard(WILDCARD)
  stage_stats['wildcard'] = round_stats

  while (in_group.length) {
    let qualified = in_group.pop()
    QUALIFIED.push(qualified!)
  }
  while (out_group.length) {
    let disqualified = out_group.pop()
    DISQUALIFIED.push(disqualified!)
  }

  rankPlayers(QUALIFIED, STAGE)
  levelUpPlayers(QUALIFIED, false)
  return {
    QUALIFIED,
    DISQUALIFIED,
    stage_stats,
  }
}

function getAdvancingPlayers(groups: GroupType) {
  const QUALIFIED: Player[] = []
  const DISQUALIFIED: Player[] = []
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

      if (i < 2) DISQUALIFIED.push(player!)
      if (i >= 2 && i < 4) WILDCARD.push(player!)
      if (i >= 4) QUALIFIED.push(player!)
    }
  }

  sortPlayersByWins(WILDCARD, STAGE)
  sortPlayersByWins(QUALIFIED, STAGE)
  for (let i = 0; i < 4; i++) {
    let player = WILDCARD.pop()
    DISQUALIFIED.push(player!)
  }

  return { QUALIFIED, WILDCARD, DISQUALIFIED }
}
