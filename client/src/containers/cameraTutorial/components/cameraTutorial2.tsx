import React, { useCallback } from 'react'
import Background from '@src/components/background'
import messages from '../messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import style from '../cameraTutorial.module.sass'
import Button from '@components/button'
import CameraTitleBanner from '@components/cameraTItleBanner'
import List from '@components/list'

export default function({ handleReturn }: { handleReturn: () => void }) {
  const intl = useIntl().formatMessage
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraTitleBanner />
      <Background>
        <h2>{`${intl(messages.title)} (2/2)`}</h2>
        <InfoCard hasCircle={false}>
          <p>aaaaaaa</p>
          <DashBorder />
          <div className={style.circle}>1</div>
          <p>aaaaaaaaaaa</p>
          <p className={style.light_green_font}>aaaaaaaaaaaaaa</p>
          <img
            src='/assets/cameraTutorial3.svg'
            alt=''
            className={style.image2}
          />
          <div className={style.circle}>2</div>
          <p>aaaaaaaaaaa</p>
          <p className={style.light_green_font}>aaaaaaaaaaaaaa</p>
          <img
            src='/assets/cameraTutorial4.svg'
            alt=''
            className={style.image2}
          />
        </InfoCard>
        <InfoCard hasCircle={false}>
          <p>aaaaaaa</p>
          <DashBorder />
          <div className='w-100'>
            <List>
              <li> Lorem ipsum dolor sit amet</li>
              <li> Lorem ipsum dolor sit amet</li>
              <li> Lorem ipsum dolor sit amet</li>
            </List>
          </div>
          <p>aaaaaaa</p>
          <DashBorder />
          <div className='w-100'>
            <List>
              <li> Lorem ipsum dolor sit amet</li>
              <li> Lorem ipsum dolor sit amet</li>
              <li> Lorem ipsum dolor sit amet</li>
            </List>
          </div>
          <p>aaaaaaa</p>
          <DashBorder />
          <div className='w-100'>
            <List>
              <li> Lorem ipsum dolor sit amet</li>
              <li> Lorem ipsum dolor sit amet</li>
              <li> Lorem ipsum dolor sit amet</li>
            </List>
          </div>
        </InfoCard>
        <div className='flex-center-center'>
          <input type='checkbox' />
          <span className={style.light_green_font}>aaaaaaaa</span>
        </div>
        <Button />
        <Button onClick={handleReturn} />
      </Background>
    </div>
  )
}
