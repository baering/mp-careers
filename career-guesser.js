import { cleanString } from './utils'

function isAthlete(wordsInCareer) {
  return wordsInCareer.indexOf('atvinnumaður') !== -1
}

function isManualWorker(wordsInCareer) {
  if (wordsInCareer.indexOf('verka') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('bóndi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('gjaldkeri') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('virki') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('skógarvörður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('sölufulltrúi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('húsmóðir') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('leikkona') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('bókari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('smiður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('maður') !== -1) {
    // sjómaður, starfsmaður, verðgæslumaður, verslunarmaður
    return true
  } else if (wordsInCareer.indexOf('lögreglu') !== -1) {
    // lögreglufulltrúi, lögregluþjónn
    return true
  } else if (wordsInCareer.indexOf('matsveinn') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('vörður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('liði') !== -1) {
    // sjúkraliði
    return true
  } else if (wordsInCareer.indexOf('meistari') !== -1) {
    // sjúkraliði
    return true
  } else if (wordsInCareer.indexOf('sali') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('eftirlaunaþegi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('stuðningsfulltrúi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('tæknir') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('prentari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('teiknari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('leikari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('þjálfari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('iðnrekandi') !== -1) {
    return true
  }

  return false
}

function isJournalist(wordsInCareer) {
  if (wordsInCareer.indexOf('blaðamaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('fréttamaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('þáttastjórnandi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('útgefandi') !== -1) {
    return true
  }
}

function isTeacher(wordsInCareer) {
  if (wordsInCareer.indexOf('kennari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('kenndi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('dósent') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('lektor') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('prófessor') !== -1) {
    return true
  }
  return false
}

function isBarrister(wordsInCareer) {
  if (wordsInCareer.indexOf('lögmaður') !== -1) {
    return true
  }
  return false
}

function isWhiteCollar(wordsInCareer) {
  if (wordsInCareer.indexOf('fræðingur') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('læknir') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('nemi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('prestur') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('ráðgjafi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('sjúkraþjálfari') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('rithöfundur') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('eftirlitsmaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('þjálfi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('endurskoðandi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('sérfræðingur') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('forstöðu') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('hjúkrun') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('heimspekingur') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('arkitekt') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('fulltrúi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('prófastur') !== -1) {
    return true
  }

  return false
}

function isCivilService(wordsInCareer) {
  if (wordsInCareer.indexOf('skrifstofu') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('formaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('borgarfulltrúi') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('bæjarfulltrúi') !== -1) {
    return true
  }
  return false
}

function isPolititian(wordsInCareer) {
  if (wordsInCareer.indexOf('fógeti') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('sýslumaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('bæjarstjóri') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('borgarstjóri') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('aðstoðarmaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('forseti') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('oddviti') !== -1) {
    return true
  }
  return false
}

function isExecutive(wordsInCareer) {
  if (wordsInCareer.indexOf('stjór') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('stýra') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('kaupmaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('útgerðarmaður') !== -1) {
    return true
  } else if (wordsInCareer.indexOf('dómari') !== -1) {
    return true
  }
  return false
}

export function guessCareer(careerString) {
  const career = cleanString(careerString.toLowerCase())

  if (isPolititian(career)) {
    return 'polititian'
  } else if (isExecutive(career)) {
    return 'executive'
  } else if (isCivilService(career)) {
    return 'civil_service'
  } else if (isWhiteCollar(career)) {
    return 'white_collar'
  } else if (isBarrister(career)) {
    return 'barrister'
  } else if (isTeacher(career)) {
    return 'teacher'
  } else if (isJournalist(career)) {
    return 'journalist'
  } else if (isAthlete(career)) {
    return 'athlete'
  } else if (isManualWorker(career)) {
    return 'manual_worker'
  } else {
    if (career.length !== 0) {
      console.log('Unable to find career for:')
      console.log(career)
    }
    return 'unknown'
  }
}
