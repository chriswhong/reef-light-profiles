import React, { Component } from 'react'

import ChartRow from './ChartRow'

const chartSettings = [
  {
    type: 'ph',
    displayName: 'pH',
    yRange: [7, 9]
  },
  {
    type: 'nitrate',
    displayName: 'Nitrate',
    yRange: [0, 40]
  },
  {
    type: 'alkalinity',
    displayName: 'Alkalinity',
    yRange: [6, 14]
  }
]

export default class ChartList extends Component {
  render () {
    const { records, getUserInfo } = this.props

    const chartRows = chartSettings.map(({ type, displayName, yRange }) => (
      <ChartRow
        key={type}
        title={displayName}
        yRange={yRange}
        data={records[type]}
        getUserInfo={getUserInfo}
      />
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
