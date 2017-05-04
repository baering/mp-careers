import mpCareers from './careers.json'
import { guessCareer } from './career-guesser'
import { writeFile, numberIsBetween } from './utils'

async function generateYearlySummaries(mps) {
  const summaries = []

  // Find the year to base the summary off of
  let startYear = 2017

  for (const mp of mps) {
    if (mp.mpStartYear < startYear) {
      startYear = mp.mpStartYear
    }
  }

  const currentYear = new Date().getFullYear()
  for (let i = startYear; i < currentYear; i++) {
    const activeMps = mps.filter(mp => numberIsBetween(i, mp.mpStartYear, mp.mpEndYear))
    const summary = {
      year: i,
      careers: {},
      numberOfActiveMps: activeMps.length,
    }
    activeMps.forEach(mp => {
      if (summary.careers[mp.careerGuess] === undefined) {
        summary.careers[mp.careerGuess] = 0
      }
      summary.careers[mp.careerGuess] += 1
    })

    summaries.push(summary)
  }

  await writeFile('careers-by-year.json', summaries)
}

async function guessCareers(mps) {
  for (const mp of mps) {
    const careerGuess = guessCareer(mp.career)
    mp.careerGuess = careerGuess
  }

  await writeFile('careers-with-guess.json', mps)
}

// Appends careerGuess property to each mp
guessCareers(mpCareers)

// Creates a summary of careers for active mps per year and writes to file
generateYearlySummaries(mpCareers)
