import React, { useMemo } from 'react'
import Background from '@components/background'
import PageTitle from '@components/pageTitle'
import messages from './messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import Button from '@components/button'
import List from '@components/list'
import style from './infoSummary.module.sass'
import { UserModelType } from '@reducer/user/userModel'
import { routePath } from '@src/appConfig'

export default function InfoSummary({ profile }: { profile?: UserModelType }) {
  const { formatMessage } = useIntl()
  const info = useMemo(
    () =>
      profile
        ? {
            gender: profile.gender === 'female' ? '女性' : '男性',
            birthday: profile.birthday.replace(/([1,2]\d\d\d)(\d\d)(\d\d)/, '$1年$2月$3日'),
            height: profile.height ? profile.height + 'cm' : '',
            weight: profile.weight ? profile.weight + 'kg' : '',
            waistCircumference: profile.waistCircumference ? profile.waistCircumference + 'cm' : ''
          }
        : { gender: '', birthday: '', height: '', weight: '', waistCircumference: '' },
    [profile]
  )
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.title)}</PageTitle>
      <Background>
        <InfoCard message={formatMessage(messages.message)} hasCircle={false}>
          <div className={`w-100 flex-center-center flex-column ${style.negative_margin_top}`}>
            <DashBorder />
            <div className='d-flex w-100'>
              <List isLarge={true}>
                <li>{formatMessage(messages.gender)}</li>
                <li>{formatMessage(messages.birthday)}</li>
                <li>{formatMessage(messages.height)}</li>
                <li>{formatMessage(messages.weight)}</li>
                <li>{formatMessage(messages.waistSize)}</li>
              </List>
              <List noStyle={true} isBold={true} isLarge={true}>
                <li>{info.gender}</li>
                <li>{info.birthday}</li>
                <li>{info.height}</li>
                <li>{info.weight}</li>
                <li>{info.waistCircumference}</li>
              </List>
            </div>
          </div>
        </InfoCard>
        <p className={`mb-1rem ${style.reminder}`}>{formatMessage(messages.reminder)}</p>
        <Button color='orange' path={routePath.myPage.profileSummary}>
          {formatMessage(messages.buttonText)}
        </Button>
        <p className={style.reminder2}>{formatMessage(messages.reminder2)}</p>
      </Background>
    </div>
  )
}
