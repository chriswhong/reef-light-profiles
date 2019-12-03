import React, { Component } from 'react'
import * as d3 from 'd3'
// inital implementation guided by https://bl.ocks.org/kdubbels/c445744cd3ffa18a5bb17ac8ad70017e

export default class Chart extends Component {
  constructor (props) {
    super(props)

    this.renderChart = this.renderChart.bind(this)
  }

  componentDidMount () {
    this.container = d3.select(this.refs.chartContainer)
    const svg = this.container.append('svg')
      .append('g')

    svg.append('g')
      .attr('class', 'x axis')

    svg.append('path')
      .attr('class', 'line')

    this.renderChart()
    window.addEventListener('resize', this.renderChart)
  }

  componentDidUpdate () {
    this.renderChart()
  }

  renderChart () {
    const { data, yRange } = this.props
    const margin = { top: 10, right: 10, bottom: 30, left: 10 }

    const { width: containerWidth, height: containerHeight } = this.container.node().getBoundingClientRect()

    const width = containerWidth - margin.left - margin.right
    const height = containerHeight - margin.top - margin.bottom

    const dateMin = new Date()
    dateMin.setDate(dateMin.getDate() - 90)

    const xScale = d3.scaleTime()
      .domain([dateMin, new Date()])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain(yRange)
      .range([height, 0])

    const line = d3.line()
      .x((d) => {
        return xScale(new Date(d.date))
      })
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    const svg = this.container.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    const g = svg.select('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // x axis
    g.select('g')
      //
      .attr('transform', 'translate(0,' + (height) + ')')
      .call(
        d3.axisBottom(xScale)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat('%b %e'))
      )
      .selectAll('text')
      .attr('dy', '1.5em')

    g.selectAll('.line')
      .datum(data)
      .transition()
      .duration(250)
      .attr('d', line)

    // render circles below the x-axis for each time specified in the file
    const circle = g.selectAll('.dot')
      .data(data)

    const circleX = d => xScale(new Date(d.date))
    const circleY = d => yScale(d.value)
    const circleR = 3

    circle.enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', circleX)
      .attr('cy', circleY)
      .attr('r', circleR)

    circle
      .transition()
      .duration(250)
      .attr('cx', circleX)
      .attr('cy', circleY)
      .attr('r', circleR)
  }

  render () {
    return (
      <div className='chart-container' ref='chartContainer' />
    )
  }
}
