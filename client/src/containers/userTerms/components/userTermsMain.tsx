import React from 'react'
import Background from '@src/components/background'
import PageTitle from '@src/components/pageTitle'
import messages from '../messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import style from '../userTerms.module.sass'
import Button from '@components/button'
import { routePath } from '@src/appConfig'

export default function UserTermsMain() {
  const intl = useIntl().formatMessage
  return (
    <div className='h-100vh d-flex flex-column'>
      <Background isGreen={true}>
        <p>{intl(messages.title)}</p>
        <InfoCard hasCircle={false} scroll={true}>
          <p>aaaa</p>
          <DashBorder />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
            assumenda recusandae, error sit vitae iure ut porro aliquam
            dignissimos accusamus atque sint, dicta labore. Animi consequatur
            reiciendis suscipit reprehenderit veniam?Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Mollitia accusamus sed, reprehenderit
            nihil veniam fuga, dolorum dolorem cupiditate corrupti temporibus
            expedita nisi pariatur cum perferendis molestiae necessitatibus
            labore commodi assumenda!LoremLorem Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Reprehenderit voluptatibus, quasi
            numquam cupiditate eligendi molestiae tempore doloremque nulla illo
            aspernatur modi atque assumenda minus mollitia saepe quos alias
            obcaecati magni.
          </p>
        </InfoCard>
        <Button isLightGreen={true} path={routePath.cameraTutorial}>{intl(messages.agree)}</Button>
        <Button>{intl(messages.disagree)}</Button>
      </Background>
    </div>
  )
}
