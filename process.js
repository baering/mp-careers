import mpCareers from './careers.json'
import { guessCareer } from './career-guesser'
import {
  careerNameToDisplayName,
  generateVisualizationHtml,
  numberIsBetween,
  writeJson,
  writeText,
} from './utils'

async function generateVisualization(csv, careerName, maxValue) {
  const chartMaxY = parseInt(maxValue * 1.1, 10)
  const chartTitle = careerNameToDisplayName(careerName)
  const html = generateVisualizationHtml(csv, careerName, chartMaxY, chartTitle)
  await writeText(`visualized/${careerName}.html`, html)
}

async function generateYearlySummaries(mps) {
  const summaries = []
  const summariesByCareer = {}

  // Find the year to base the summary off of
  let startYear = 2017

  for (const mp of mps) {
    if (mp.mpStartYear < startYear) {
      startYear = mp.mpStartYear
    }
  }

  const yearNow = new Date().getFullYear()
  for (let currentYear = startYear; currentYear <= yearNow; currentYear++) {
    const activeMps = mps.filter(mp => numberIsBetween(currentYear, mp.mpStartYear, mp.mpEndYear))
    const summary = {
      year: currentYear,
      careers: {},
      numberOfActiveMps: activeMps.length,
    }
    activeMps.forEach(mp => {
      if (summary.careers[mp.careerGuess] === undefined) {
        summary.careers[mp.careerGuess] = 0
      }
      summary.careers[mp.careerGuess] += 1

      if (summariesByCareer[mp.careerGuess] === undefined) {
        summariesByCareer[mp.careerGuess] = {}
      }

      if (summariesByCareer[mp.careerGuess][currentYear] === undefined) {
        summariesByCareer[mp.careerGuess][currentYear] = 0
      }
      summariesByCareer[mp.careerGuess][currentYear] += 1
    })

    summaries.push(summary)
  }

  await writeJson('careers-by-year.json', summaries)
  let maxValue = 0
  const csvs = []
  const careersInSummary = Object.keys(summariesByCareer)
  for (const career of careersInSummary) {
    const careerSummary = summariesByCareer[career]

    let csvResult = 'year,number\n'
    for (let currentYear = startYear; currentYear <= yearNow; currentYear++) {
      const valueForYear = careerSummary[currentYear]
      let value = valueForYear !== undefined ? valueForYear : 0

      if (value > maxValue) {
        maxValue = value
      }

      csvResult += `01-${currentYear},${value}\n`
    }
    csvs.push({
      career,
      csv: csvResult,
    })
    await writeText(`csv/${career}.csv`, csvResult)
  }

  for (const csv of csvs) {
    await generateVisualization(csv.csv, csv.career, maxValue)
  }

  await writeText(`csv/chart-max.csv`, `max value for charts should be at least ${maxValue}`)
}

async function guessCareers(mps) {
  for (const mp of mps) {
    const careerGuess = guessCareer(mp.career)
    mp.careerGuess = careerGuess
  }

  await writeJson('careers-with-guess.json', mps)
}

// Appends careerGuess property to each mp
guessCareers(mpCareers)

// Creates a summary of careers for active mps per year and writes to file
generateYearlySummaries(mpCareers)
