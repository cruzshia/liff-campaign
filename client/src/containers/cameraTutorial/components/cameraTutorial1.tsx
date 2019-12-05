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
import { routePath } from '@src/appConfig'

export default function({ handleProceed }: { handleProceed: () => void }) {
  const intl = useIntl().formatMessage
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraTitleBanner />
      <Background>
        <h2>{`${intl(messages.title)} (1/2)`}</h2>
        <InfoCard hasCircle={false}>
          <p>aaaaaaa</p>
          <DashBorder />
          <img
            src='/assets/cameraTutorial1.svg'
            alt=''
            className={style.image}
          />
          <List>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              corporis, harum saepe aut vero doloribus praesentium veniam
              aliquid dolorem quam natus distinctio vel inventore omnis, ut
              aliquam non est. Eius?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              corporis, harum saepe aut vero doloribus praesentium veniam
              aliquid dolorem quam natus distinctio vel inventore omnis, ut
              aliquam non est. Eius?
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              corporis, harum saepe aut vero doloribus praesentium veniam
              aliquid dolorem quam natus distinctio vel inventore omnis, ut
              aliquam non est. Eius?
            </li>
          </List>
        </InfoCard>
        <InfoCard hasCircle={false}>
          <p>aaaaaaa</p>
          <DashBorder />
          <img
            src='/assets/cameraTutorial2.svg'
            alt=''
            className={style.image}
          />
          <List>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            </li>
          </List>
        </InfoCard>
        <div className={`d-flex ${style.reminder_wrap}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            tempora corporis dignissimos laboriosam alias recusandae a sit
            laborum ea? Recusandae, ratione commodi illum porro natus beatae
            obcaecati vero debitis consequatur.
          </p>
          <img
            src='/assets/flipCamera.svg'
            className={`d-block align-self-start ${style.camera_icon}`}
            alt=''
          ></img>
        </div>
        <Button onClick={handleProceed} />
        <Button path={routePath.userTerms} />
      </Background>
    </div>
  )
}
