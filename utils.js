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
