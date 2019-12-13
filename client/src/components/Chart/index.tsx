import React, { useMemo, memo } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip } from 'recharts'
import Label from './Label'
import Tick from './Tick'
import XTick from './XTick'

const CHART_CONFIG = {
  yAxisLabel: 'Week',
  margin: { top: 5, right: 20, left: 0, bottom: 30 },
  gridLineColor: 'rgba(128,128,128,0.5)',
  chartBgColor: ['rgba(255,192,203, 0.6)', 'rgba(255,229,208, 0.5)', 'rgba(255,245,187, 0.5)'],
  barColor: 'rgba(1, 148, 1, 0.7)'
}

const genGrid = ({ start, color }: { start: number; color: string }) => {
  const gridLine = []
  for (let i = 0; i < 10; i++)
    gridLine.push(
      <ReferenceLine
        key={`label-${start + i}`}
        y={start + 5 * i}
        strokeDasharray='1 1'
        stroke={i ? CHART_CONFIG.gridLineColor : color}
      />
    )
  return gridLine
}
const grids = [
  genGrid({ start: 100, color: 'red' }),
  genGrid({ start: 50, color: 'orange' }),
  genGrid({ start: 0, color: 'yellow' })
]

export interface Props {
  data: number[]
}

/**
 * usage example: <Chart data={[50, 100, 30]} />
 * please set `height` of parent DOM element, or it will not show
 */
export default memo(function Chart({ data }: Props) {
  const xTicks: any[] = []
  const formattedData = useMemo(() => {
    const res: any = []
    for (let i = 1; i < 13; i++) {
      xTicks.push(`Week ${i}`)
      res.push({
        name: i,
        value: data[i - 1] || 0
      })
    }
    return res
  }, [data])
  const yTicks = []
  const lastValue = data[data.length - 1]
  for (let i = 0; i < 150; i += 50) yTicks.push(i)

  return (
    <ResponsiveContainer>
      <BarChart data={formattedData} margin={CHART_CONFIG.margin}>
        <CartesianGrid strokeOpacity={0} horizontalFill={CHART_CONFIG.chartBgColor} />
        <XAxis tickCount={6} dataKey='name' tick={<XTick />} />
        <YAxis ticks={yTicks} tick={<Tick />} domain={[0, 'dataMax + 20']} />
        {grids.map(grid => grid)}
        <Tooltip />
        <Bar dataKey='value' fill={CHART_CONFIG.barColor} label={<Label lastValue={lastValue} />} />
      </BarChart>
    </ResponsiveContainer>
  )
})
