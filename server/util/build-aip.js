const js2xmlparser = require('js2xmlparser')

// original function copied from http://thereefuge.com/threads/reverse-engineering-a-hydra-26-hd.15524/
// calculates the checksum based on the 'colors' xml element
const getChecksum = (json) => {
  // convert json to xml and get only the colors element
  const colorsXml = js2xmlparser.parse('ramp', json.ramp)
    .match(/(<colors>.+?<\/colors>)/gms)[0]
    .replace(/(\r\n|\n|\r|\s+)/gm, '')

  let checksum = 0

  if (colorsXml.length === 0) return

  for (var i = 0; i < colorsXml.length; i += 1) {
    const charCode = colorsXml.charCodeAt(i)
    checksum = ((checksum << 5) - checksum) + charCode
    checksum = checksum & 4294967295
  }
  if (checksum < 0) checksum = ~checksum
  return checksum
}

const BuildAIP = (settings) => {
  settings.ramp.header.checksum = getChecksum(settings)
  const xml = js2xmlparser.parse('ramp', settings.ramp)
  return xml
}

module.exports = BuildAIP
