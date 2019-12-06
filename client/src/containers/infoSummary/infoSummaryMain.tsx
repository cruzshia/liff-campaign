import React from 'react'
import Background from '@src/components/background'
import PageTitle from '@src/components/pageTitle'
import messages from './messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import Button from '@components/button'
import List from '@components/list'
import style from './infoSummary.module.sass'
import GoToLine from '@src/components/goToLine'

export default function InfoSummary() {
  const {formatMessage} = useIntl()
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
                <li>男性</li>
                <li>1977年11月23日</li>
                <li>168cm</li>
                <li>70kg</li>
                <li>85cm</li>
              </List>
            </div>
          </div>
        </InfoCard>
        <p>aaaaaaaaaaaa</p>
        <Button color='orange'></Button>
        <GoToLine />
      </Background>
    </div>
  )
}
