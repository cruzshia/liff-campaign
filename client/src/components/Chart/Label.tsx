import React from 'react'
import { LabelProps } from 'recharts'

interface Props extends LabelProps {
  lastValue: number
}

export default function Label({ x, y, value, lastValue }: Props) {
  return value === lastValue && value ? (
    <>
      <svg width={20} height={20} x={x ? x - 2 : 0} y={y ? y - 13 : 0} viewBox='0 0 20 20'>
        <polygon points='0 0, 10 10, 20 0' fill='#00532C' />
      </svg>
      <rect x={x ? x - 13 : 0} y={y ? y - 28 : 0} width={42} height={20} fill='#00532C' />
      <text x={x ? x - 6 : 0} y={y ? y - 13 : 0} dx={-2} fill='white' style={{ fontSize: '12px' }}>
        {value}cm
      </text>
    </>
  ) : null
}
