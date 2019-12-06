import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import Select from '@components/select'
import messages from './messages'
import { useIntl } from 'react-intl'
import PageTitle from '@components/pageTitle'
import GoToLine from '@src/components/goToLine'

export default function({ handleProceed }: { handleProceed: () => void }) {
  const {formatMessage} = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.title)}</PageTitle>
      <Background>
        <InfoCard
          title={formatMessage(messages.title)}
          message={formatMessage(messages.message)}
          titleImg='/assets/waistSize.svg'
        >
          <Select unit='cm' name='inputWaistSize'>
            <option>60</option>
            <option>60</option>
            <option>60</option>
            <option>60</option>
            <option>60</option>
          </Select>
          <p>aaaaaaaaa</p>
        </InfoCard>
        <Button onClick={handleProceed} />
        <GoToLine />
      </Background>
    </div>
  )
}
