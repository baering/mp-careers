import careers from './careers.json'
import { guessCareer } from './career-guesser'
import { writeFile } from './utils'

async function guessCareers() {
  for (const mp of careers) {
    const guessedCareer = guessCareer(mp.career)
    mp.careerGuess = guessedCareer
    if (mp.mpStartYear < startYear) {
      startYear = mp.mpStartYear
    }
  }
  await writeFile('careers-with-guess.json', careers)
  console.log(careerMap)
}

guessCareers()
