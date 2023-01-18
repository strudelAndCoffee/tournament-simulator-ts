function rollDice(min: number, max: number) {
  return Math.max(Math.ceil(Math.random() * max), min)
}

export { rollDice }
