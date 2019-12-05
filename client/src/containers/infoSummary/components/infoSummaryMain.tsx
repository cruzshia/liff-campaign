import React from 'react'
import Background from '@src/components/background'
import PageTitle from '@src/components/pageTitle'
import messages from '../messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import Button from '@components/button'
import List from '@components/list'

export default function() {
  const intl = useIntl().formatMessage
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{intl(messages.title)}</PageTitle>
      <Background>
        <InfoCard message={intl(messages.message)} hasCircle={false}>
          <DashBorder />
          <div className='d-flex w-100'>
            <List isLarge={true}>
              <li>{intl(messages.gender)}</li>
              <li>{intl(messages.birthday)}</li>
              <li>{intl(messages.height)}</li>
              <li>{intl(messages.weight)}</li>
              <li>{intl(messages.waistSize)}</li>
            </List>
            <List noStyle={true} isBold={true} isLarge={true}>
              <li>男性</li>
              <li>1977年11月23日</li>
              <li>168cm</li>
              <li>70kg</li>
              <li>85cm</li>
            </List>
          </div>
        </InfoCard>
        <p>aaaaaaaaaaaa</p>
        <Button isOrange={true}>{intl(messages.buttonText)}</Button>
      </Background>
    </div>
  )
}
