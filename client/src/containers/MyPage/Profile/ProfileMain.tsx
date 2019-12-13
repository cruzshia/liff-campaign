import React from 'react'
import { useIntl } from 'react-intl'
import { PROFILE_TAB, TAB_OTPNIOS } from '../utils'
import SwitchTab from '@components/SwitchTab'
import { UserModelType } from '@reducer/user/userModel'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import LineButton from '@components/LineButton'
import InfoRow from './components/InfoRow'
import messages from './messages'
import style from './profile.module.sass'

interface Props {
  profile: UserModelType
}

const PrfoileMain = ({ profile }: Props) => {
  const { formatMessage } = useIntl()

  const toBirthDayFormat = (birth: string) => {
    const matched = birth.match(/(\d{4}?)(\d{2})(\d{2})/)
    if (!matched || matched.length < 4) return '--'
    return `${matched[1]}${formatMessage(messages.year)}${matched[2]}${formatMessage(messages.month)}${
      matched[3]
    }${formatMessage(messages.day)}`
  }
  return profile ? (
    <div className={`h-100vh d-flex flex-column ${style.profileCtr}`}>
      <SwitchTab tabOptions={TAB_OTPNIOS} selectedID={PROFILE_TAB.USERINFO} />
      <Background backgroundColor='lightGreen'>
        <div className='x-pr mb-1rem'>
          <InfoCard>
            <img className={style.titleImg} alt='my-page-title' src='assets/myPage/myPageTitle.svg' />
            <InfoRow labelName={formatMessage(messages.gender)} value={formatMessage(messages[profile.gender])} />
            <InfoRow labelName={formatMessage(messages.birthday)} value={toBirthDayFormat(profile.birthday)} />
            <InfoRow labelName={formatMessage(messages.height)} value={`${profile.height}cm`} />
            <p className={style.desc}>{formatMessage(messages.contest)}</p>
            <InfoRow
              last={true}
              labelName={formatMessage(messages.contestStatus)}
              value={formatMessage(profile.isEntryContest ? messages.entryContest : messages.noEntryContest)}
            />
            <img className={style.dollImg} alt='foot-img' src='assets/myPage/myPageDoll.svg' />
          </InfoCard>
        </div>
        <Button>基本情報變更</Button>
        <LineButton />
      </Background>
    </div>
  ) : null
}
export default PrfoileMain
