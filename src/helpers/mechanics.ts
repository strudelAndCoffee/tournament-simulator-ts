function rollDice(min: number, max: number) {
  return Math.max(Math.ceil(Math.random() * max), min)
}

function generateQualifierMatchups(player_ids: number[]) {
  const matchups: { A: number; B: number }[][] = []

  const poolSize = player_ids.length / 4
  let poolA = []
  let poolB = []
  let poolC = []
  let poolD = []
  for (let i = 0; i < player_ids.length; i++) {
    let id = player_ids[i]
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
    const roundMatchups: { A: number; B: number }[] = []

    for (let i = 0; i < poolSize; i++) {
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

      roundMatchups.push(matchup1!)
      roundMatchups.push(matchup2!)
    }

    matchups.push(roundMatchups)
    count--
  }

  return matchups
}

export { rollDice, generateQualifierMatchups }
