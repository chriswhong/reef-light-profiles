import React, { Component } from 'react'
import * as d3 from 'd3'
// inital implementation guided by https://bl.ocks.org/kdubbels/c445744cd3ffa18a5bb17ac8ad70017e

export default class Chart extends Component {
  componentDidMount () {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const container = d3.select(this.refs.chartContainer)
    const { width: containerWidth, height: containerHeight } = container.node().getBoundingClientRect()

    const width = containerWidth - margin.left - margin.right
    const height = containerHeight - margin.top - margin.bottom

    const dateMin = new Date()
    dateMin.setDate(dateMin.getDate() - 90)

    const xScale = d3.scaleTime()
      .domain([dateMin, new Date()])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([7.0, 9.0])
      .range([height, 0])

    const line = d3.line()
      .x((d) => {
        return xScale(new Date(d.time))
      })
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    const svg = container.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // x axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (height) + ')')
      .call(
        d3.axisBottom(xScale)
          .tickSize(0)
      )
      .selectAll('text')
      .attr('dy', '1.5em')

    const data = [
      {
        time: '2019-08-25',
        value: 8.0
      },
      {
        time: '2019-08-10',
        value: 7.6
      },
      {
        time: '2019-07-15',
        value: 7.8
      },
      {
        time: '2019-07-01',
        value: 7.4
      }
    ]

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)

    // render circles below the x-axis for each time specified in the file
    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(new Date(d.time)))
      .attr('cy', d => yScale(d.value))
      .attr('r', 3)
  }

  render () {
    return (
      <div className='chart-container' ref='chartContainer'>

      </div>
    )
  }
}
