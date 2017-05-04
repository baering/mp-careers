import fetch from 'node-fetch'
import { parseString } from 'xml2js'
import fs from 'fs'

async function fetchUrl(url) {
  const response = await fetch(url)
  const body = await response.text()
  return body
}

function parseXmlPromiseWrapper(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export async function fetchXml(url) {
  const xml = await fetchUrl(url)
  const obj = await parseXmlPromiseWrapper(xml)
  return obj
}

export function writeFile(fileName, data) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(data, null, 2)
    fs.writeFile(fileName, json, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const validCharacters = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖaábdðeéfghiíjklmnoóprstuúvxyýþæö'
const validCharacterLookup = {}
validCharacters.split('').forEach(char => validCharacterLookup[char] = true)

export function cleanString(source, opts) {
  let ignoreSpace = false
  if (opts) {
    if (opts.ignoreSpace !== undefined && opts.ignoreSpace === true) {
      ignoreSpace = true
    }
  }

  return source.split('').filter(char => {
    if (char.length === 0) {
      return false
    }

    if (char === ' ') {
      if (ignoreSpace) {
        return false
      } else {
        return true
      }
    }

    return validCharacterLookup[char]
  }).join('')
}

export function numberIsBetween(number, min, max) {
  if (min === null) {
    return number <= max
  } else if (max === null) {
    return number >= min
  }
  return number >= min && number <= max
}
