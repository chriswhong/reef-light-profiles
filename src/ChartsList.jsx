import React, { Component } from 'react'

import ChartRow from './ChartRow'

export default class ChartList extends Component {
  render () {
    const chartNames = [
      'Salinity',
      'pH',
      'Nitrate',
      'Alkalinity'
    ]

    const chartRows = chartNames.map((chartName) => (
      <ChartRow key={chartName} title={chartName} />
    ))

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-9 container'>
            {chartRows}
          </div>
          <div className='col-3 container' style={{ pointerEvents: 'none' }}>

          </div>
        </div>
      </div>
    )
  }
}
