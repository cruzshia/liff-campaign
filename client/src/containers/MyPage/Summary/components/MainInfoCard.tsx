import React from 'react'
import style from '../profileSummary.module.sass'
import DoughnutChart from './DoughnutChart'
import { useIntl } from 'react-intl'
import messages from '../messages'

interface Data {
  color: 'pink' | 'orange' | 'yellow'
  rank: number
  result: number | null
}

export default function SummaryInfoCard({ color, rank, result }: React.PropsWithChildren<Data>) {
  const formatMessage = useIntl().formatMessage
  return (
    <div className={`${style.main_card_background} ${style[color]} flex-center-center flex-column`}>
      <img src='assets/myPage/myPageOrganTitle.svg' alt='' className='image mb-1rem'></img>
      <div className='w-100 x-pr'>
        <DoughnutChart />
        <p className={style.main_result}>
          A<span className={style.large}>{result || 'null'}</span>cm<span className={style.power_of_two}>2</span>
        </p>
      </div>
      <p className='mb-1rem'>{formatMessage(messages.indication)}</p>
      <p className='mt-1rem'>{formatMessage(messages.compareTo)}</p>
      <p>
        <img src='assets/myPage/crown.svg' alt='' className={style.crown}></img>
        <span className={style.rank}>
          <span>{rank}</span>位（下位30%）
        </span>
      </p>
    </div>
  )
}
