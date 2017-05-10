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

export function writeJson(fileName, data) {
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

export function writeText(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
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

const careerNameToDisplayNameMap = {
  politician: 'Stjórnmálamaður',
  executive: 'Stjórnandi',
  civil_service: 'Opinber stjórnsýsla',
  white_collar: 'Skrifstofustarf með sérmenntun',
  barrister: 'Lögmaður',
  teacher: 'Kennari',
  journalist: 'Fjölmiðlamaður',
  athlete: 'Íþróttamaður',
  manual_worker: 'Verkamaður',
  unknown: 'Ekki vitað'
}

export function careerNameToDisplayName(careerName) {
  return careerNameToDisplayNameMap[careerName]
}

export function generateVisualizationHtml(csv, career, max, title) {
  return `<!DOCTYPE html>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
<svg width="960" height="500"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
<style>* { font-family: 'Arial' }</style>
<script>
var bardata = \`${csv}\`
var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%m-%Y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var area = d3.area()
    .x(function(d) { return x(d.year); })
    .y1(function(d) { return y(d.number); });

var data = d3.csvParse(bardata, function(d) {
  d.year = parseTime(d.year);
  return d;
})

x.domain(d3.extent(data, function(d) { return d.year; }));
y.domain([0, ${max}]);
area.y0(y(0));

g.append("path")
    .datum(data)
    .attr("fill", "steelblue")
    .attr("d", area);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

g.append("g")
    .call(d3.axisLeft(y))
  .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Number of mps");

g.append("text")
    .attr("x", (width / 2))
    .attr("y", 8)
    .attr("text-anchor", "middle")
    .style("font-size", "32px")
    .text("${title}");

</script>`
}
