export type GearType = {
  primary: number[]
  secondary: number[] | null
}

class PlayerClass {
  public id!: number
  public name!: string
  public attack!: GearType
  public block!: GearType
  public armor!: number[]
  public upgrades!: {
    min_roll: number[][]
    gear: number[][]
  }
}

class Knight extends PlayerClass {
  constructor() {
    super()
    this.id = 0
    this.name = 'knight'
    this.attack = {
      primary: [1, 8],
      secondary: null,
    }
    this.block = {
      primary: [1, 8],
      secondary: null,
    }
    this.armor = [1, 6]
    this.upgrades = {
      min_roll: [this.attack.primary, this.block.primary, this.armor],
      gear: [this.attack.primary, this.block.primary, this.armor],
    }
  }
}

class Vanguard extends PlayerClass {
  constructor() {
    super()
    this.id = 1
    this.name = 'vanguard'
    this.attack = {
      primary: [1, 6],
      secondary: null,
    }
    this.block = {
      primary: [1, 10],
      secondary: null,
    }
    this.armor = [1, 6]
    this.upgrades = {
      min_roll: [this.attack.primary, this.block.primary, this.armor],
      gear: [this.attack.primary],
    }
  }
}

class Samurai extends PlayerClass {
  constructor() {
    super()
    this.id = 2
    this.name = 'samurai'
    this.attack = {
      primary: [1, 10],
      secondary: null,
    }
    this.block = {
      primary: [1, 6],
      secondary: null,
    }
    this.armor = [1, 4]
    this.upgrades = {
      min_roll: [this.armor, this.attack.primary, this.block.primary],
      gear: [this.armor],
    }
  }
}

class Gladiator extends PlayerClass {
  constructor() {
    super()
    this.id = 3
    this.name = 'gladiator'
    this.attack = {
      primary: [1, 12],
      secondary: null,
    }
    this.block = {
      primary: [1, 4],
      secondary: null,
    }
    this.armor = [1, 4]
    this.upgrades = {
      min_roll: [this.block.primary, this.armor],
      gear: [this.block.primary, this.armor],
    }
  }
}

class Berserker extends PlayerClass {
  constructor() {
    super()
    this.id = 4
    this.name = 'berserker'
    this.attack = {
      primary: [1, 6],
      secondary: [1, 6],
    }
    this.block = {
      primary: [1, 4],
      secondary: null,
    }
    this.armor = [0, 0]
    this.upgrades = {
      min_roll: [this.attack.primary, this.attack.secondary!, this.block.primary],
      gear: [this.attack.primary, this.attack.secondary!],
    }
  }
}

class Ninja extends PlayerClass {
  constructor() {
    super()
    this.id = 5
    this.name = 'ninja'
    this.attack = {
      primary: [1, 4],
      secondary: [1, 4],
    }
    this.block = {
      primary: [1, 4],
      secondary: [1, 4],
    }
    this.armor = [0, 0]
    this.upgrades = {
      min_roll: [this.attack.primary, this.attack.secondary!, this.block.primary, this.block.secondary!],
      gear: [this.attack.primary, this.attack.secondary!],
    }
  }
}

export { PlayerClass, Knight, Vanguard, Samurai, Gladiator, Berserker, Ninja }
