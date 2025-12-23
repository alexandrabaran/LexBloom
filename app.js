let currentWord = null
let lastIndex = -1

let words = []

//carga datos
async function loadCSV() {
  const response = await fetch("data/words.csv")
  const text = await response.text()

  const lines = text.split("\n").slice(1)

  words = lines
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const [word, translation, category, ipa] = line.split(",")
      return { word, translation, category,ipa }
    })

  render()
}

function render() {
  if (words.length === 0) return

  //muestre palabra random
  let randomIndex
  do {
    randomIndex = Math.floor(Math.random() * words.length)
  } while (randomIndex === lastIndex)

  //guarde palabra actual
  lastIndex = randomIndex
  const current = words[randomIndex]
  currentWord = current.word 

  document.getElementById("word").textContent = current.word
  document.getElementById("translation").textContent = current.translation
  document.getElementById("category").textContent =
    current.category ? `(${current.category})` : ""
  document.getElementById("ipa").textContent = current.ipa || ""
}

//pronunciacion
function speak() {
  if (!currentWord) return

  const utterance = new SpeechSynthesisUtterance(currentWord)
  utterance.lang = "en-US" //se puede poner "en-GB" para britanico
  utterance.rate = 1 //velocidad de pronunciacion
  utterance.pitch = 1

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

//conectar botones
document.getElementById("speakBtn").addEventListener("click", speak)
document.getElementById("nextBtn").addEventListener("click", render)

loadCSV()



