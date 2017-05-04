import { fetchXml, writeJson } from './utils'

const urls = {
  mps: 'http://www.althingi.is/altext/xml/thingmenn/',
  lifeStory: 'http://www.althingi.is/altext/xml/thingmenn/thingmadur/lifshlaup/',
  historyAsMp: 'http://www.althingi.is/altext/xml/thingmenn/thingmadur/thingseta/',
}

async function fetchCareerForMp(mp) {
  const lifeStoryUrl = `${urls.lifeStory}?nr=${mp.$.id}`
  const lifeStory = await fetchXml(lifeStoryUrl)
  const historyAsMpUrl = `${urls.historyAsMp}?nr=${mp.$.id}`
  const historyAsMp = await fetchXml(historyAsMpUrl)

  const mpCareer = lifeStory.þingmaður.lífshlaup[0].starfsferill[0]
  const mpStartDate = historyAsMp.þingmaður.þingsetur[0].þingseta[0].tímabil[0].inn[0]
  // console.log(JSON.stringify(historyAsMp.þingmaður.þingsetur))
  const numberOfParliaments = historyAsMp.þingmaður.þingsetur[0].þingseta.length
  const index = numberOfParliaments - 1
  const mpEndDate = historyAsMp.þingmaður.þingsetur[0].þingseta[index].tímabil[0].út[0]

  return {
    mpId: parseInt(mp.$.id, 10),
    name: mp.nafn[0],
    dateOfBirth: mp.fæðingardagur[0],
    career: mpCareer,
    mpStartYear: parseInt(mpStartDate.split('.')[2]),
    mpEndYear: parseInt(mpEndDate.split('.')[2]),
  }
}

async function fetchMpCareers(url) {
  const mps = await fetchXml(url)
  const careers = []
  for (const mp of mps.þingmannalisti.þingmaður) {
    console.log(`Fetching mp ${careers.length} of ${mps.þingmannalisti.þingmaður.length}`)
    try {
      const career = await fetchCareerForMp(mp)
      careers.push(career)
    } catch (error) {
      console.log(`Could not fetch career for ${mp.nafn} (${mp.$.id})`)
      console.log(error)
    }
  }

  await writeJson('careers.json', careers)
}

fetchMpCareers(urls.mps)
