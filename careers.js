import { fetchXml, writeFile } from './utils'

const urls = {
  mps: 'http://www.althingi.is/altext/xml/thingmenn/',
  lifeStory: 'http://www.althingi.is/altext/xml/thingmenn/thingmadur/lifshlaup/',
}

async function fetchCareerForMp(mp) {
  const lifeStoryUrl = `${urls.lifeStory}?nr=${mp.$.id}`
  const mpLifeStory = await fetchXml(lifeStoryUrl)
  const mpCareer = mpLifeStory.þingmaður.lífshlaup[0].starfsferill[0]

  return {
    mpId: parseInt(mp.$.id, 10),
    name: mp.nafn[0],
    dateOfBirth: mp.fæðingardagur[0],
    career: mpCareer,
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
    }
  }

  await writeFile('careers.json', careers)
}

fetchMpCareers(urls.mps)
