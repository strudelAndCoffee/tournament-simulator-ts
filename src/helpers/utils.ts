function randomNumber(min: number, ceil: number) {
  return Math.floor(Math.random() * ceil) + min
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function swap(arr: any[], i1: any, i2: any) {
  ;[arr[i1], arr[i2]] = [arr[i2], arr[i1]]
}

export { randomNumber, shuffleArray, swap }
