import React from 'react'
import { PROFILE_TAB, TAB_OTPNIOS } from '../utils'
import SwitchTab from '@components/SwitchTab'
import Background from '@components/background'
import MainInfoCard from './components/MainInfoCard'
import InfoCard from '@components/infoCard'
import BarChart from '@components/Chart'
import style from './profileSummary.module.sass'
import Button from '@components/button'
import LinkInfoCard from './components/LinkInfoCard'
import { useIntl } from 'react-intl'
import messages from './messages'

const SummaryMain = ({ offalFat }: { offalFat: number | null }) => {
  const formatMessage = useIntl().formatMessage
  const color = 'pink'
  return (
    <div className='h-100vh d-flex flex-column'>
      <SwitchTab tabOptions={TAB_OTPNIOS} selectedID={PROFILE_TAB.SUMMARY} />
      <Background backgroundColor='lightGreen'>
        <MainInfoCard color={color} rank={815} result={offalFat} />
        <LinkInfoCard />
      </Background>
      <Background backgroundColor='beige'>
        <div className={`${style.bar_chart_card} flex-center-center flex-column`}>
          <img src='assets/myPage/graphTitle.svg' alt='' className={style.calculate}></img>
          <div className={`w-100 ${style.bar_chart_wrap}`}>
            <BarChart data={[100, 100, 100, 100, 100, 100]} />
          </div>
          <img src='assets/comments/comment_1_increase.png' alt='' className='image'></img>
        </div>
      </Background>
      <img alt='' src='assets/myPage/myPageLinePointTitle.svg' className='w-100'></img>
      <Background></Background>
      <img src='assets/myPage/myPageLightGreen.svg' className='w-100' alt='' />
      <Background>
        <Button path='line://'>{formatMessage(messages.lineButton)}</Button>
        <img src='assets/grid/line_point_week_0.png' alt='' className='image mt-1rem' />
        <img src='assets/myPage/myPageDollReminder.svg' alt='' className='image mt-1rem mb-1rem' />
      </Background>
      <img src='assets/myPage/myPageDarkGreenBanner.svg' alt='' className='w-100' />
      <Background>
        <InfoCard>
          <img src='assets/actions/action_0.png' alt='' className='w-100' />
        </InfoCard>
        <Button path='line://'>{formatMessage(messages.lineButton)}</Button>
      </Background>
    </div>
  )
}
export default SummaryMain
