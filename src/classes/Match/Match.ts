import Player, { PlayerRollType } from '../Player/Player.js'

export type RoundResultType = {
  p1: boolean
  p2: boolean
  tie: boolean
  p1_crit: boolean
  p2_crit: boolean
  p1_score: number
  p2_score: number
  p1_roll_data: PlayerRollType
  p2_roll_data: PlayerRollType
}

export default class Match {
  static run_round(player_1: Player, player_2: Player) {
    const p1_roll = player_1.roll_vs_player(player_2)
    const p2_roll = player_2.roll_vs_player(player_1)
    const result = this.duel(p1_roll, p2_roll)
    this.update_players(player_1, player_2, result)

    return result
  }

  static duel(p1_roll: PlayerRollType, p2_roll: PlayerRollType) {
    let p1 = false
    let p2 = false
    let tie = false
    let p1_crit = false
    let p2_crit = false
    let p1_score = p1_roll.main_roll
    let p2_score = p2_roll.main_roll
    const p1_roll_data = p1_roll
    const p2_roll_data = p2_roll

    // check for player crit wins/fails
    if (p1_roll.main_roll === 20 && p2_roll.main_roll + p2_roll.block < 20) {
      p1_crit = true
      p1 = true
    } else if (p1_roll.main_roll === 20 && p2_roll.main_roll < 20) {
      p1_crit = true
      p1_score += p1_roll.adv! + p1_roll.attack
      p2_score += p2_roll.armor

      p2_score >= p1_score ? (tie = true) : (p1 = true)
    } else if (
      p2_roll.main_roll === 20 &&
      p1_roll.main_roll + p1_roll.block < 20
    ) {
      p2_crit = true
      p2 = true
    } else if (p2_roll.main_roll === 20 && p1_roll.main_roll < 20) {
      p2_crit = true
      p2_score += p2_roll.adv! + p2_roll.attack
      p1_score += p1_roll.armor

      p1_score >= p2_score ? (tie = true) : (p2 = true)
    } else if (p1_roll.main_roll === 1 && p2_roll.main_roll > 1) p2 = true
    else if (p2_roll.main_roll === 1 && p1_roll.main_roll > 1) p1 = true
    else {
      p1_score += p1_roll.adv!
      p2_score += p2_roll.adv!

      if (p1_roll.attack > p2_roll.block)
        p1_score += p1_roll.attack - p2_roll.armor
      if (p2_roll.attack > p1_roll.block)
        p2_score += p2_roll.attack - p1_roll.armor

      if (p1_score > p2_score) p1 = true
      else if (p1_score < p2_score) p2 = true
      else tie = true
    }

    return {
      p1,
      p2,
      tie,
      p1_crit,
      p2_crit,
      p1_score,
      p2_score,
      p1_roll_data,
      p2_roll_data,
    } as RoundResultType
  }

  static update_players(
    player_1: Player,
    player_2: Player,
    result: RoundResultType
  ) {
    if (result.p1) {
      player_1.xp += 3
      if (result.p1_crit) {
        player_1.xp++
        if (player_1.advantages.opponents[player_2.id]) {
          player_1.advantages.opponents[player_2.id]++
        } else player_1.advantages.opponents[player_2.id] = 1
      }
    }
    if (result.p2) {
      player_2.xp += 3
      if (result.p2_crit) {
        player_2.xp++
        if (player_2.advantages.opponents[player_1.id]) {
          player_2.advantages.opponents[player_1.id]++
        } else player_2.advantages.opponents[player_1.id] = 1
      }
    }
    if (result.tie) {
      player_1.xp++
      player_2.xp++
    }
  }

  static roll_off(players: Player[], target: number) {
    let sub_results: { player: Player; roll: number }[] = []
    let new_pool: Player[] = []
    let out: Player[] = []

    while (players.length) {
      let player = players.pop()
      let p_roll = player!.roll_solo()
      let roll = p_roll.main_roll + p_roll.attack + p_roll.block
      sub_results.push({ player: player!, roll: roll })
    }
    sub_results.sort((a, b) => a.roll - b.roll)

    while (new_pool.length < target) {
      let tuple = sub_results.pop()
      if (tuple) new_pool.push(tuple.player)
      else return { new_pool, out }
    }
    while (sub_results.length) {
      let tuple = sub_results.pop()
      if (tuple) out.push(tuple.player)
      else return { new_pool, out }
    }

    return { new_pool, out }
  }
}
