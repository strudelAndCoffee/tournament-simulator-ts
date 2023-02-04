import { randomNumber, rollDice } from '../../helpers/index.js'
import {
  Knight,
  Vanguard,
  Gladiator,
  Samurai,
  Berserker,
  Ninja,
} from './index.js'
import { GearType } from './PlayerClass.js'

type Game = {
  [index: string]: number
}
type Stage = {
  [index: string]: Game
}
type Rank = {
  [index: string]: number
}
export type PlayerRollType = {
  main_roll: number
  adv?: number
  attack: number
  block: number
  armor: number
}

export default class Player {
  public id!: number
  public player_name!: string
  public player_class!:
    | Knight
    | Vanguard
    | Gladiator
    | Samurai
    | Berserker
    | Ninja
  public class_id!: number
  attack: GearType
  block: GearType
  armor: number[]
  upgrades: {
    min_roll: number[][]
    gear: number[][]
  }
  xp: number
  level_ups: {
    count: number
    min_rolls: number
    gear_upgrades: number
    waits: number
    xp_spent: number
  }
  public stage_id: number
  games: Stage
  rank: Rank
  playoff_side: string
  advantages: {
    opponents: Record<number, number>
    types: Record<number, number>
  }

  constructor(
    id: number,
    player_name: string,
    player_class: Knight | Vanguard | Gladiator | Samurai | Berserker | Ninja
  ) {
    this.id = id
    this.player_name = player_name
    this.player_class = player_class
    this.class_id = player_class.id

    this.attack = player_class.attack
    this.block = player_class.block
    this.armor = player_class.armor
    this.upgrades = player_class.upgrades

    this.xp = 0
    this.level_ups = {
      count: 0,
      min_rolls: 0,
      gear_upgrades: 0,
      waits: 0,
      xp_spent: 0,
    }

    this.stage_id = 0
    this.games = {
      total: {
        played: 0,
        won: 0,
        tied: 0,
        lost: 0,
        swept: 0,
        wildcard_won: 0,
        wildacrd_lost: 0,
      },
      qualifier: {
        played: 0,
        won: 0,
        tied: 0,
        lost: 0,
        swept: 0,
      },
      qualifier_wildcard: {
        played: 0,
        won: 0,
        lost: 0,
      },
      group_stage: {
        played: 0,
        won: 0,
        tied: 0,
        lost: 0,
        swept: 0,
      },
      group_stage_wildcard: {
        played: 0,
        won: 0,
        lost: 0,
      },
      playoff_stage: {
        played: 0,
        won: 0,
        lost: 0,
        swept: 0,
      },
      quarter_final: {
        played: 0,
        won: 0,
        lost: 0,
        swept: 0,
      },
      semi_final: {
        played: 0,
        won: 0,
        lost: 0,
        swept: 0,
      },
      third_place: {
        played: 0,
        won: 0,
        lost: 0,
        swept: 0,
      },
      final: {
        played: 0,
        won: 0,
        lost: 0,
        swept: 0,
      },
    }
    this.rank = {
      global: 0,
      qualifier: 0,
      group_stage: 0,
      playoff_stage: 0,
      quarter_final: 0,
      semi_final: 0,
      third_place: 0,
      final: 0,
    }
    this.playoff_side = ''

    this.advantages = {
      opponents: {},
      types: {},
    }
  }

  roll_solo() {
    const main_roll = rollDice(1, 20)

    let attack = rollDice(this.attack.primary[0], this.attack.primary[1])
    if (this.attack.secondary)
      attack += rollDice(this.attack.secondary[0], this.attack.secondary[1])

    let block = rollDice(this.block.primary[0], this.block.primary[1])
    if (this.block.secondary)
      block += rollDice(this.block.secondary[0], this.block.secondary[1])

    const armor = rollDice(this.armor[0], this.armor[1])

    return { main_roll, attack, block, armor } as PlayerRollType
  }

  roll_vs_player(opp: Player) {
    const main_roll = rollDice(1, 20)
    const adv = this.add_advantage(opp.id, opp.class_id)

    let attack = rollDice(this.attack.primary[0], this.attack.primary[1])
    if (this.attack.secondary)
      attack += rollDice(this.attack.secondary[0], this.attack.secondary[1])

    let block = rollDice(this.block.primary[0], this.block.primary[1])
    if (this.block.secondary)
      block += rollDice(this.block.secondary[0], this.block.secondary[1])

    const armor = rollDice(this.armor[0], this.armor[1])

    return { main_roll, adv, attack, block, armor } as PlayerRollType
  }

  add_advantage(opp_id: number, class_id: number) {
    const oppAdv = this.advantages.opponents[opp_id]
      ? this.advantages.opponents[opp_id]
      : 0
    const typeAdv = this.advantages.types[class_id]
      ? this.advantages.types[class_id]
      : 0
    let adv = 0

    if (oppAdv) {
      if (oppAdv > 0) adv++
      if (oppAdv > 2) adv++
      if (oppAdv > 4) adv++
      if (oppAdv > 6) adv++
      if (oppAdv > 8) adv++
    }
    if (typeAdv) {
      if (typeAdv > 1) adv++
      if (typeAdv > 3) adv++
      if (typeAdv > 5) adv++
      if (typeAdv > 7) adv++
      if (typeAdv > 9) adv++
    }

    return adv
  }

  sweep_match(stage: string, opp_id: number, class_id: number) {
    this.games.total.played++
    this.games.total.won++
    this.games.total.swept++
    this.games[stage].played++
    this.games[stage].won++
    this.games[stage].swept++

    if (stage === 'qualifier' || stage === 'group_stage') this.xp += 9
    if (
      stage === 'playoff_stage' ||
      stage === 'quarter_final' ||
      stage === 'semi_final'
    )
      this.xp += 18

    if (this.advantages.opponents[opp_id]) {
      this.advantages.opponents[opp_id] += 2
    } else this.advantages.opponents[opp_id] = 2

    if (this.advantages.types[class_id]) {
      this.advantages.types[class_id] += 2
    } else this.advantages.types[class_id] = 2
  }
  win_match(stage: string, opp_id: number, class_id: number) {
    this.games.total.played++
    this.games.total.won++
    this.games[stage].played++
    this.games[stage].won++

    if (stage === 'qualifier' || stage === 'group_stage') this.xp += 6
    if (
      stage === 'playoff_stage' ||
      stage === 'quarter_final' ||
      stage === 'semi_final'
    )
      this.xp += 12

    if (this.advantages.opponents[opp_id]) {
      this.advantages.opponents[opp_id] += 1
    } else this.advantages.opponents[opp_id] = 1

    if (this.advantages.types[class_id]) {
      this.advantages.types[class_id] += 1
    } else this.advantages.types[class_id] = 1
  }
  tie_match(stage: string) {
    this.games.total.played++
    this.games.total.tied++
    this.games[stage].played++
    this.games[stage].tied++
    this.xp++
  }
  lose_match(stage: string) {
    this.games.total.played++
    this.games.total.lost++
    this.games[stage].played++
    this.games[stage].lost++
  }
  win_wildcard(stage: string) {
    this.games.total.played++
    this.games.total.wildcard_won++
    this.games[stage].played++
    this.games[stage].won++
    this.xp++
  }
  lose_wildcard(stage: string) {
    this.games.total.played++
    this.games.total.wildcard_lost++
    this.games[stage].played++
    this.games[stage].lost++
  }

  level_up(no_wait: boolean) {
    if (this.xp < 15) return
    if (!no_wait && this.xp < 50) {
      let decide = rollDice(1, 4)
      if (decide === 1) {
        this.level_ups.waits++
        return
      }
    }

    const min_roll_options = this.upgrades.min_roll.length
    const gear_options = this.upgrades.gear.length

    if (this.xp >= 15 && this.xp < 30) {
      let i = randomNumber(0, min_roll_options)

      // if minimum roll === maximum roll, increment maximum
      if (this.upgrades.min_roll[i][0] === this.upgrades.min_roll[i][1]) {
        if (no_wait) {
          this.upgrades.min_roll[i][1]++
          this.xp -= 15
          this.level_ups.count++
          this.level_ups.min_rolls++
        } else {
          this.level_ups.waits++
        }
        return
      }

      this.upgrades.min_roll[i][0]++
      this.xp -= 15
      this.level_ups.xp_spent += 15
      this.level_ups.count++
      this.level_ups.min_rolls++
    } else if (this.xp >= 30 && this.xp < 50) {
      // special case for ninjas
      if (this.class_id === 5) {
        if (this.attack.primary[1] >= this.attack.secondary![1]) {
          this.attack.primary[1] += 2
          this.block.primary[1] += 2
        } else {
          this.attack.secondary![1] += 2
          this.block.secondary![1] += 2
        }
      } else {
        let i = randomNumber(0, gear_options)
        this.upgrades.gear[i][1] += 2
      }

      this.xp -= 30
      this.level_ups.xp_spent += 30
      this.level_ups.count++
      this.level_ups.gear_upgrades++
    } else if (this.xp >= 50) {
      // special case for ninjas
      if (this.class_id === 5) {
        if (this.attack.primary[1] >= this.attack.secondary![1]) {
          this.attack.primary[1] += 2
          this.attack.primary[0]++
          this.block.primary[1] += 2
          this.block.primary[0]++
        } else {
          this.attack.secondary![1] += 2
          this.attack.secondary![0]++
          this.block.secondary![1] += 2
          this.block.secondary![0]++
        }
      } else {
        let i = randomNumber(0, gear_options)
        this.upgrades.gear[i][1] += 2
        this.upgrades.min_roll[i][0]++
      }

      this.xp -= 50
      this.level_ups.xp_spent += 50
      this.level_ups.count++
      this.level_ups.min_rolls++
      this.level_ups.gear_upgrades++
    }
  }
}
