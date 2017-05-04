import { cleanString } from './utils'

describe('cleanString', () => {
  it('should clean string', () => {
    const source = 'Þetta &;hérna er .#$"strengur sem er óhreinn"'
    const expected = 'Þetta hérna er strengur sem er óhreinn'

    const result = cleanString(source)
    expect(result).toEqual(expected)
  })

  it('should clean a real string', () => {
    const source = 'Rekstrarstjóri félagsheimilisins Fellsborgar 1980-1984. Stöðvarstjóri Olís á Skagaströnd 1984-1988. Framkvæmdastjóri Marska frá 1988.'
    const expected = 'Rekstrarstjóri félagsheimilisins Fellsborgar  Stöðvarstjóri Olís á Skagaströnd  Framkvæmdastjóri Marska frá '

    const result = cleanString(source)
    expect(result).toEqual(expected)
  })
})
