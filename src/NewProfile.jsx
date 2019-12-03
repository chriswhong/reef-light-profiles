import React from 'react'
import convert from 'xml-js'
import Chart from './Chart.jsx'
import Dropzone from './Dropzone'

const NewProfile = (props) => {
  const [profile, setProfile] = React.useState({})

  const handleParsedFile = (xml, filename) => {
    const json = convert.xml2js(xml, { compact: true })
    console.log(json, filename)
    setProfile({
      ...profile,
      settings: json,
      filename
    })
  }

  const { settings, filename } = profile
  console.log('HERE', profile)

  return (
    <div>
      {
        settings
          ? <Chart filename={filename} data={settings}/>
          : <Dropzone onFileParse={(xml, filename) => handleParsedFile(xml, filename)} />
      }
    </div>
  )
}

export default NewProfile
