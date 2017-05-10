import { cleanString } from './utils'
import * as careerWords from './career-words'

function careerMatches(career, words) {
  return words.some(word => career.indexOf(word) !== -1)
}

export function guessCareer(careerString) {
  const career = cleanString(careerString.toLowerCase())

  // Careers are tested in order
  if (careerMatches(career, careerWords.politician)) {
    return 'politician'
  } else if (careerMatches(career, careerWords.executive)) {
    return 'executive'
  } else if (careerMatches(career, careerWords.civilService)) {
    return 'civil_service'
  } else if (careerMatches(career, careerWords.whiteCollar)) {
    return 'white_collar'
  } else if (careerMatches(career, careerWords.barrister)) {
    return 'barrister'
  } else if (careerMatches(career, careerWords.teacher)) {
    return 'teacher'
  } else if (careerMatches(career, careerWords.journalist)) {
    return 'journalist'
  } else if (careerMatches(career, careerWords.athlete)) {
    return 'athlete'
  } else if (careerMatches(career, careerWords.manualWorker)) {
    return 'manual_worker'
  } else {
    if (career.length !== 0) {
      console.log('Unable to find career for:')
      console.log(career)
    }
    return 'unknown'
  }
}
