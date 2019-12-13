import React from 'react'

export default function Tick({ x, y, payload, width }: any) {
  const fill = payload.value >= 100 ? 'red' : 'green'
  x = x - width / 3
  return (
    <text x={x} y={y - 4} textAnchor='middle' style={{ fontSize: 14 }}>
      <tspan x={x} fill={fill}>
        {payload.value}
      </tspan>
      <tspan x={x} y={y + 10} fill={fill}>
        cm2
      </tspan>
    </text>
  )
}
