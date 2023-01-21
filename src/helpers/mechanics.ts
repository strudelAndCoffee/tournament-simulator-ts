import Player from '../classes/Player/Player.js'

function rollDice(min: number, max: number) {
  return Math.max(Math.ceil(Math.random() * max), min)
}

function generateStageIDs(players: Player[]) {
  for (let i = 0; i < players.length; i++) {
    players[i].stage_id = i
  }
}

function sortPlayersByWins(players: Player[], stage: string) {
  const sorted_players: Player[] = []

  let win_cats: { [index: number]: Player[] } = {}
  while (players.length) {
    let player = players.pop()
    let game_bracket = player!.games[stage].won

    if (!win_cats[game_bracket]) {
      win_cats[game_bracket] = []
    }
    win_cats[game_bracket].push(player!)
  }

  let win_cat_arrs = Object.entries(win_cats)
  win_cat_arrs.forEach((win_cat) => {
    // [ 'number', [ players ] ]
    win_cat[1].sort((a, b) => a.games[stage].tied - b.games[stage].tied)
  })
  win_cat_arrs.forEach((win_cat) => {
    let arr = win_cat[1]
    let noSwap
    for (let i = arr.length - 1; i > 0; i--) {
      noSwap = true
      for (let j = 0; j < i; j++) {
        let p1 = arr[j]
        let p2 = arr[j + 1]
        let p1_tied = p1.games[stage].tied
        let p2_tied = p2.games[stage].tied
        let p1_swept = p1.games[stage].swept
        let p2_swept = p2.games[stage].swept

        if (
          p1_tied === p2_tied &&
          (p1_swept > p2_swept || (p1_swept === p2_swept && p1.xp > p2.xp))
        ) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          noSwap = false
        }
      }
      if (noSwap) break
    }
  })
  win_cat_arrs.forEach((cat) => {
    cat[1].forEach((p) => sorted_players.push(p))
  })
  sorted_players.forEach((p, i) => (players[i] = p))
  players.reverse()
}

export { rollDice, generateStageIDs, sortPlayersByWins }
