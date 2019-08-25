import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import Chart from './Chart'

import 'react-datepicker/dist/react-datepicker.css'

export default class ChartRow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showForm: false,
      formDate: new Date(),
      formValue: '',
      formValid: false
    }

    this.showForm = this.showForm.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.handleFormSave = this.handleFormSave.bind(this)
  }

  showForm () {
    this.setState({
      showForm: true
    })
  }

  handleDateChange (date) {
    this.setState({
      formDate: date
    })
  }

  handleValueChange (e) {
    this.setState({ formValue: e.target.value })
    this.validateForm()
  }

  handleFormSave () {
    this.setState({ showForm: false })
  }

  validateForm () {
    const { formDate, formValue } = this.state
    const formValid = formDate instanceof Date || formValue > 0

    this.setState({ formValid })
  }

  render () {
    const { formValid, showForm, formDate, formValue } = this.state
    const { chartName } = this.props
    return (
      <div className='row chart'>
        <div className='col-11 text-left pt-2'>
          <h6>{chartName}</h6>
          <Chart />
        </div>
        <div
          className='col-1 add-column d-flex align-items-center'
          onClick={() => this.showForm()}
        >

          <FontAwesomeIcon
            icon={faPlusSquare}
            size='lg'
          />
        </div>
        {
          showForm && (
            <div className='entry-form d-flex flex-column justify-content-between'>
              <h6>pH Reading</h6>
              <DatePicker
                selected={formDate}
                onChange={this.handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy/MM/dd h:mm aa"
                timeCaption="time"
              />
              <input
                type='text'
                className='record-value'
                placeholder='Enter pH'
                value={formValue}
                onChange={this.handleValueChange}
              />
              <button
                className='btn btn-secondary btn-sm'
                disabled={!formValid}
                onClick={this.handleFormSave}
              >
                Save
              </button>
            </div>
          )
        }
      </div>
    )
  }
}
