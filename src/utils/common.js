const DEFAULT_UID_LENGTH = 8
const DEFAULT_SECOND = 60

export const uuid = (length = DEFAULT_UID_LENGTH) => {
  return Number(
    Math.random()
      .toString()
      .substr(3, length) + Date.now()
  ).toString(36)
}

export const count = (time, second = DEFAULT_SECOND) => {
  const interval = window.setInterval(() => {
    if (time-- <= second) {
      time = second
      window.clearInterval(interval)
    }
  }, 1000)
}
