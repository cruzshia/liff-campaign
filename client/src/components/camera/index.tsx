import React, { useEffect, CSSProperties } from 'react'
import getCamera from '@src/libs/camera'
import frontGuideImage from '@src/libs/camera/assets/front.png'
import sideGuideImage from '@src/libs/camera/assets/side.png'
import style from './camera.module.sass'

export interface CameraProp {
  front: Blob
  side: Blob
}
interface Props {
  headerH?: number
  footerH?: number
  completeCbk: (data: CameraProp) => void
  errorCbk?: (error: Error) => void
}

export default function({ headerH = 0, footerH = 0, completeCbk, errorCbk }: Props) {
  useEffect(() => {
    const camera = getCamera({
      completeCbk,
      errorCbk,
      height: 180
    })
    const intervalID = camera.after_render()
    return clearInterval(intervalID)
  }, [completeCbk, errorCbk])

  const cssVars = {
    '--offset-height': `${headerH + footerH}px`,
    '--offset-top': `${headerH}px`
  } as CSSProperties

  return (
    <>
      <div id='camera-container' style={cssVars}>
        {/* <!-- Camera view --> */}
        <video id='camera--view' autoPlay playsInline />
        <img src={frontGuideImage} alt='font-img' id='guideline-front' />
        <img src={sideGuideImage} alt='side-img' id='guideline-side' />
        {/* <!-- Camera sensor --> */}
        <canvas id='camera--sensor' />
        {/* <!-- Indicators --> */}
        <div id='v-refference' />
        <div id='h-refference' />
        <div id='v-indicator' className='indicator' />
        <div id='h-indicator' className='indicator' />
        <div id='c-indicator' />
        <div id='selfie-count'></div>
      </div>
      {/* <!-- Camera trigger --> */}
      <button id='camera--switch'></button>
      <button id='camera--trigger' className={style.camera_trigger} />
    </>
  )
}
