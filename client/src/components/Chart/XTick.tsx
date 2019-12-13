import React, { memo } from 'react'

export default memo(function XTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-6}
        dy={10}
        width={10}
        style={{ fontSize: 14, fontWeight: 'bold' }}
        textAnchor='end'
        fill='#eb5a24'
        transform='rotate(-50)'
      >
        {payload.value % 2 ? '' : 'week '} {payload.value}
      </text>
    </g>
  )
})
