import confetti from 'canvas-confetti'

const runFireworks = () => {
  var duration = 5 * 1000
  var animationEnd = Date.now() + duration
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    var particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    )
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    )
  }, 250)
}

const getStorageItem = (item) => {
  if (typeof window !== 'undefined') {
    let storageItem = localStorage.getItem(item)
    if (storageItem) {
      storageItem = JSON.parse(localStorage.getItem(item))
    } else {
      storageItem = []
    }
    return storageItem
  }
}

const setStorageItem = (name, item) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, JSON.stringify(item))
  }
}

export { runFireworks, getStorageItem, setStorageItem }
