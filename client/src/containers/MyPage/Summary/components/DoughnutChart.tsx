import React from 'react'

const R = 40
const CY = 50
const CX = 50
const percentage = 40

export default function DoughnutChart() {
  return (
    <svg viewBox='0 0 100 55'>
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='30%' y2='0%'>
          <stop offset='0%' stopColor='#FFFF00' />
          <stop offset='100%' stopColor='#EB5A24' />
        </linearGradient>
      </defs>
      <g fillOpacity='0' strokeWidth='10'>
        <path d={`M ${CX - R}, ${CY} a ${R},${R} 0 1,1 ${R * 2},0`} stroke='#FFFFFF' strokeLinecap='round' />
        <path
          d={`M ${CX - R}, ${CY} a ${R},${R} 0 1,1 ${R * 2},0`}
          strokeDasharray='142'
          strokeDashoffset={142 - percentage * (142 / 100)}
          stroke='url(#gradient)'
          strokeWidth='6'
          strokeLinecap='round'
        />
        <line x1={CX} y1='4' x2={CX} y2='16' stroke='#000000' strokeWidth={0.3}></line>
      </g>
    </svg>
  )
}

