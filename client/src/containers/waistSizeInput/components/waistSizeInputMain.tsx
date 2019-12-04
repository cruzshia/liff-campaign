import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import Select from '@components/select'
import messages from '../messages'
import { useIntl } from 'react-intl'

export default function({ handleProceed }: { handleProceed: () => void }) {
  const intl = useIntl()
  return (
    <Background>
      <InfoCard
        title={intl.formatMessage(messages.title)}
        message={intl.formatMessage(messages.message)}
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
    </Background>
  )
}
