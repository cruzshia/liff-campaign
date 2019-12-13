import './assets/style.css'
import Logger from '@src/utils/logger'
import { convertImage2Blob } from './imageConverter'
import UAParser from 'ua-parser-js'
/**
 * changes of orginal sample code:
 * 1. use session storage key by STORAGE_KEY rather than original string style
 * 2. wrap Camera object by 'getCamera function and add callback props
 * 3. change Camera.data.clientHeight from `document.body.clientHeight` to 'camera-container height or window.screen.height'
 * 4. callback function after complete taking photos in setImage2Storage function
 */

/* eslint-disable */

const MEDIA_CONSTRAINT_REAR = {
  video: { height: 1080, width: 1920, facingMode: { exact: 'environment' } },
  audio: false
}
const MEDIA_CONSTRAINT_FRONT = { video: { height: 1080, width: 1920, facingMode: 'user' }, audio: false }
const STORAGE_KEY = {
  FRONT: 'bgFrontImageURI',
  SIDE: 'bgSideImageURI'
}

const getCamera = ({ height, completeCbk, errorCbk }) => {
  const Camera = {
    data: {
      storage: undefined,
      sensorDirection: 1,
      vIndicator: undefined,
      hIndicator: undefined,
      cIndicator: undefined,
      clientWidth: 0,
      clientHeight: 0,
      previousGravity: { x: 0.0, y: 0.0, z: 0.0 },
      yawAngle: 0,
      pitchAngle: 0,
      cameraView: undefined,
      cameraSensor: undefined,
      cameraTrigger: undefined,
      cameraSwitch: undefined,
      selfieCount: undefined,
      frontGuide: undefined,
      sideGuide: undefined,
      guideScale: 1.0,
      isCapturingFront: true,
      height,
      weight: 0,
      age: 0,
      gender: '',
      canCapture: false,
      isSelfie: false
    },
    after_render: async function() {
      const isFirstLoad = true

      this.methods.initializeData()
      this.data.isCapturingFront = this.methods.updateCaptureTarget(isFirstLoad)
      this.methods.startListeningGyro()
      this.methods.startCamera()
      return Camera.intervalId
    },
    methods: {
      initializeData: function() {
        // Storage for taken images
        Camera.data.storage = window.sessionStorage

        // OS
        Camera.data.sensorDirection = new UAParser().getOS().name === 'iOS' ? 1 : -1

        // Use camera area size for indicators' movement
        // Use device size for indicators' movement
        const container = document.getElementById('camera-container')
        Camera.data.clientWidth = document.body.clientWidth
        Camera.data.clientHeight = container ? container.clientHeight : window.screen.height
        container && Logger.log('detect camera-container height:', `${Camera.data.clientHeight}px`)

        // Human-shape guideline
        Camera.data.frontGuide = document.getElementById('guideline-front')
        Camera.data.sideGuide = document.getElementById('guideline-side')

        // Indicators which shows device's tilt
        Camera.data.vIndicator = document.getElementById('v-indicator')
        Camera.data.hIndicator = document.getElementById('h-indicator')
        Camera.data.cIndicator = document.getElementById('c-indicator')

        // Camera parts
        Camera.data.cameraView = document.getElementById('camera--view') // video
        Camera.data.cameraSensor = document.getElementById('camera--sensor') // canvas
        Camera.data.cameraTrigger = document.getElementById('camera--trigger') // capture button
        Camera.data.cameraSwitch = document.getElementById('camera--switch') // switch button
        Camera.data.selfieCount = document.getElementById('selfie-count') // count number for selfie

        // Capture implementation
        Camera.data.cameraTrigger.onclick = () => {
          if (Camera.data.isSelfie) {
            Camera.methods.startSelfie()
          } else {
            Camera.methods.capture()
          }
        }

        Camera.data.cameraSwitch.onclick = () => {
          Camera.methods.switch()
        }

        // Centering indicators
        Camera.data.vIndicator.style.left = `${Camera.data.clientWidth / 2}px`
        Camera.data.hIndicator.style.top = `${Camera.data.clientHeight / 2}px`
        Camera.data.cIndicator.style.top = `${Camera.data.clientHeight / 2}px`
        Camera.data.cIndicator.style.left = `${Camera.data.clientWidth / 2}px`

        Camera.data.guideScale = Math.min(Camera.data.height / 220.0, 1.0)
      },
      updateCaptureTarget: function(isFirstLoad = false) {
        const { storage } = Camera.data
        let isCapturingFront = false

        const frontImage = storage.getItem(STORAGE_KEY.FRONT)
        const sideImage = storage.getItem(STORAGE_KEY.SIDE)

        const isBothStored = frontImage && sideImage
        const isFrontStored = frontImage && !sideImage
        const isSideStored = !frontImage && sideImage
        const isBothEmpty = !frontImage && !sideImage

        if (isBothStored && isFirstLoad) {
          // Opening this page with both images stored is not supposed, so delete both.
          storage.removeItem(STORAGE_KEY.FRONT)
          storage.removeItem(STORAGE_KEY.SIDE)

          isCapturingFront = true
        }

        if (isFrontStored) {
          isCapturingFront = false
        }

        if (isSideStored) {
          isCapturingFront = true
        }

        if (isBothEmpty) {
          isCapturingFront = true
        }

        return isCapturingFront
      },
      startListeningGyro: function() {
        window.addEventListener('devicemotion', Camera.methods.calcAngle, true)

        Camera.intervalId = setInterval(Camera.methods.handleIndicator, 5)

        window.onbeforeunload = () => {
          Camera.intervalId && clearInterval(Camera.intervalId)
          return
        }
      },
      startCamera: function() {
        navigator.mediaDevices
          .enumerateDevices()
          .then(function(devices) {
            devices.forEach(function(device) {
              Logger.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId)
            })
          })
          .catch(function(err) {
            Logger.log(err.name + ': ' + err.message)
          })

        Camera.data.isSelfie = false
        navigator.mediaDevices
          .getUserMedia(MEDIA_CONSTRAINT_REAR)
          .then(stream => {
            Camera.data.cameraView.srcObject = stream
            Camera.methods.scaleGuide()
          })
          .catch(error => {
            errorCbk(error)
            // console.error('Failed on getUserMedia.', error)
          })
      },
      calcAngle: function(event) {
        const { x: gx, y: gy, z: gz } = event.accelerationIncludingGravity
        const { x: ax, y: ay, z: az } = event.acceleration
        const genuineGravity = { x: gx - ax, y: gy - ay, z: gz - az }

        const alpha = 0.8

        genuineGravity.x = alpha * Camera.data.previousGravity.x + (1 - alpha) * genuineGravity.x
        genuineGravity.y = alpha * Camera.data.previousGravity.y + (1 - alpha) * genuineGravity.y
        genuineGravity.z = alpha * Camera.data.previousGravity.z + (1 - alpha) * genuineGravity.z

        Camera.data.pitchAngle = (genuineGravity.z / 9.8) * 90 * Camera.data.sensorDirection
        let yawAngleByPi = Math.atan2(genuineGravity.y, genuineGravity.x) * Camera.data.sensorDirection

        Camera.data.previousGravity = genuineGravity

        if (yawAngleByPi < 0 && yawAngleByPi > Math.PI * -1) {
          yawAngleByPi += Math.PI / 2
        } else if (yawAngleByPi >= Math.PI / 2 && yawAngleByPi < Math.PI) {
          yawAngleByPi -= (3 * Math.PI) / 2
        } else {
          yawAngleByPi += Math.PI / 2
        }

        Camera.data.yawAngle = (yawAngleByPi * 180) / Math.PI // -180 < yawAngle < 180
      },
      handleIndicator: function() {
        let yaw = Camera.data.yawAngle / 180 // -1 < yaw < 1
        let pitch = Camera.data.pitchAngle / 90 // -1 <= pitch <= 1

        yaw = Math.max(Math.min(1, yaw), -1)
        pitch = Math.max(Math.min(1, pitch), -1)

        let vLeft = Camera.data.clientWidth * (Math.sin((yaw * Math.PI) / 2) + 0.5)
        let hTop = (Camera.data.clientHeight * (pitch + 1)) / 2
        let hTopC = Camera.data.clientHeight * ((Math.sin((pitch / 2) * Math.PI) + 1) / 2)

        // Camera.data.vIndicator.style.left = `${vLeft}px`
        Camera.data.hIndicator.style.transform = `rotate(${Camera.data.yawAngle}deg)`
        // Camera.data.hIndicator.style.top = `${hTop}px`
        // Camera.data.cIndicator.style.left = `${vLeft}px`
        Camera.data.cIndicator.style.top = `${hTopC}px`

        const isYawCenter = Math.abs(Camera.data.yawAngle) < (Camera.data.isSelfie ? 10 : 3)
        const isPitchCenter = Math.abs(Camera.data.pitchAngle) < (Camera.data.isSelfie ? 10 : 3)
        Camera.data.canCapture = isYawCenter && isPitchCenter
        Camera.data.vIndicator.style.backgroundColor = isYawCenter ? 'white' : 'red'
        Camera.data.hIndicator.style.backgroundColor = isPitchCenter ? 'white' : 'red'
        Camera.data.cIndicator.style.backgroundColor = Camera.data.canCapture ? 'white' : 'red'
      },
      capture: function() {
        Camera.data.cameraSensor.width = Camera.data.cameraView.videoWidth
        Camera.data.cameraSensor.height = Camera.data.cameraView.videoHeight
        const ctx = Camera.data.cameraSensor.getContext('2d')

        ctx.save()
        ctx.drawImage(Camera.data.cameraView, 0, 0)

        Camera.methods.setImage2Storage(ctx)
        Camera.methods.toggleGuideline()
      },
      countdown: function(count) {
        return new Promise((onSuccess, onFailed) => {
          for (let i = 0; i <= count; i++) {
            setTimeout(() => {
              Camera.data.selfieCount.innerText = count - i
              if (window.speechSynthesis) {
                const uttr = new SpeechSynthesisUtterance(String(count - i))
                speechSynthesis.speak(uttr)
              }
              if (i === count) {
                onSuccess()
              }
            }, i * 1000)
          }
        })
      },
      wait: function(count) {
        return new Promise((onSuccess, onFailed) => {
          setTimeout(() => {
            onSuccess()
          }, count * 1000)
        })
      },
      startSelfie: function() {
        if (Camera.data.canCapture) {
          Camera.methods
            .countdown(10)
            .then(Camera.methods.capture)
            .then(Camera.methods.wait.bind(this, 1))
            .then(Camera.methods.countdown.bind(this, 5))
            .then(Camera.methods.capture)
            .then(() => {
              Camera.data.selfieCount.innerText = ''
            })
        }
      },
      scaleGuide: function() {
        Logger.log(`scale(${Camera.data.guideScale})`)
        Camera.data.frontGuide.style.transform = `scale(${Camera.data.guideScale})`
        Camera.data.sideGuide.style.transform = Camera.data.isSelfie
          ? `scale(-${Camera.data.guideScale}, ${Camera.data.guideScale})`
          : `scale(${Camera.data.guideScale})`
      },
      switch: function() {
        const constraint = Camera.data.isSelfie ? MEDIA_CONSTRAINT_REAR : MEDIA_CONSTRAINT_FRONT
        Camera.methods
          .stopTracks()
          .then(navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices, constraint))
          .then(stream => {
            Camera.data.isSelfie = !Camera.data.isSelfie
            Camera.data.cameraView.srcObject = stream
            Camera.methods.scaleGuide()
          })
          .catch(error => {
            Logger.error('Failed on getUserMedia.', error)
          })
      },
      setImage2Storage: function(canvasCtx) {
        const { storage } = Camera.data
        const dataUrl = Camera.data.cameraSensor.toDataURL('image/jpeg', 1.0)

        this.clearCanvas(canvasCtx)

        if (Camera.data.isCapturingFront) {
          storage.setItem(STORAGE_KEY.FRONT, dataUrl)
        } else {
          storage.setItem(STORAGE_KEY.SIDE, dataUrl)
        }

        const storageFront = storage.getItem(STORAGE_KEY.FRONT)
        const storageSide = storage.getItem(STORAGE_KEY.SIDE)

        if (storageFront && storageSide) {
          storage.removeItem(STORAGE_KEY.FRONT)
          storage.removeItem(STORAGE_KEY.SIDE)
          completeCbk &&
            completeCbk({
              front: convertImage2Blob(storageFront),
              side: convertImage2Blob(storageSide)
            })
        }
      },
      stopTracks: function() {
        return new Promise((onSuccess, onFailed) => {
          if (Camera.data.cameraView.srcObject) {
            Camera.data.cameraView.srcObject.getVideoTracks().forEach(track => {
              track.stop()
            })
            Camera.data.cameraView.srcObject.getAudioTracks().forEach(track => {
              track.stop()
            })
          }
          onSuccess()
        })
      },
      clearCanvas: function(canvasCtx) {
        canvasCtx.clearRect(0, 0, Camera.data.cameraSensor.width, Camera.data.cameraSensor.height)
      },
      toggleGuideline: function() {
        Camera.data.isCapturingFront = Camera.methods.updateCaptureTarget()

        if (Camera.data.isCapturingFront) {
          Camera.data.frontGuide.style.display = 'block'
          Camera.data.sideGuide.style.display = 'none'
          Camera.data.cameraSwitch.style.display = 'block'
        } else {
          Camera.data.frontGuide.style.display = 'none'
          Camera.data.sideGuide.style.display = 'block'
          Camera.data.cameraSwitch.style.display = 'none'
        }
      }
    }
  }
  return Camera
}
export default getCamera
