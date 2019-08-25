import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

export default class Charts extends Component {
  render () {
    const chartNames = [
      'Salinity',
      'pH',
      'Nitrate',
      'Alkalinity'
    ]

    const chartRows = chartNames.map((chartName) => (
      <div key={chartName} className='row chart'>
        <div className='col-11 text-left pt-2'>
          <h6>{chartName}</h6>
        </div>
        <div className='col-1 add-column d-flex align-items-center'>
          <FontAwesomeIcon
            icon={faPlusSquare}
            size='lg'
          />
        </div>
      </div>
    ))

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-9 container'>
            {chartRows}
          </div>
          <div className='col-3 container'>
            Sidebar
          </div>
        </div>
      </div>
    )
  }
}
