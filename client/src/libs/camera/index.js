import './assets/style.css'
import Logger from '@src/utils/logger'
import { convertImage2Blob } from './imageConverter'

/**
 * changes of orginal sample code:
 * 1. use session storage key by STORAGE_KEY rather than original string style
 * 2. wrap Camera object by 'getCamera function and add callback props
 * 3. change Camera.data.clientHeight from `document.body.clientHeight` to 'camera-container height or window.screen.height'
 * 4. callback function after complete taking photos in setImage2Storage function
 */

const MEDIA_CONSTRAINT = {
  video: { height: 1080, width: 1920, facingMode: { exact: 'environment' } },
  audio: false
}

const STORAGE_KEY = {
  FRONT: 'bgFrontImageURI',
  SIDE: 'bgSideImageURI'
}
/*
const MEDIA_CONSTRAINT_SELF = {
  video: { height: 1080, width: 1920, facingMode: { exact: 'user' } },
  audio: false
}
*/

const getCamera = ({ completeCbk, errorCbk }) => {
  const Camera = {
    data: {
      storage: undefined,
      vIndicator: undefined,
      hIndicator: undefined,
      cIndicator: undefined,
      clientWidth: 0,
      clientHeight: 0,
      yawAngle: 0,
      pitchAngle: 0,
      cameraView: undefined,
      cameraSensor: undefined,
      cameraTrigger: undefined,
      frontGuide: undefined,
      sideGuide: undefined,
      isCapturingFront: true,
      intervalId: undefined
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

        // Capture implementation
        Camera.data.cameraTrigger.onclick = () => {
          Camera.methods.capture()
        }

        // Centering indicators
        Camera.data.vIndicator.style.left = `${Camera.data.clientWidth / 2}px`
        Camera.data.hIndicator.style.top = `${Camera.data.clientHeight / 2}px`
        Camera.data.cIndicator.style.top = `${Camera.data.clientHeight / 2}px`
        Camera.data.cIndicator.style.left = `${Camera.data.clientWidth / 2}px`
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
          .getUserMedia(MEDIA_CONSTRAINT)
          .then(stream => {
            Camera.data.cameraView.srcObject = stream
          })
          .catch(error => {
            errorCbk(error)
            // console.error('Failed on getUserMedia.', error)
          })
      },
      calcAngle: function(event) {
        const { x: gx, y: gy, z: gz } = event.accelerationIncludingGravity
        const { x: ax, y: ay, z: az } = event.acceleration
        const genuineGravityX = gx - ax
        const genuineGravityY = gy - ay
        const genuineGravityZ = gz - az

        Camera.data.pitchAngle = (genuineGravityZ / 9.8) * 90
        let yawAngleByPi = Math.atan2(genuineGravityY, genuineGravityX)

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
        let yaw = Camera.data.yawAngle / 90 // -2 < yaw < 2
        const pitch = Camera.data.pitchAngle / 90 // -1 <= pitch <= 1

        if (yaw < -1) {
          yaw = -1
        }

        if (yaw > 1) {
          yaw = 1
        }

        let vLeft = (Camera.data.clientWidth * (yaw + 1)) / 2
        let hTop = (Camera.data.clientHeight * (pitch + 1)) / 2

        Camera.data.vIndicator.style.left = `${vLeft}px`
        Camera.data.hIndicator.style.top = `${hTop}px`
        Camera.data.cIndicator.style.left = `${vLeft}px`
        Camera.data.cIndicator.style.top = `${hTop}px`
      },
      capture: function() {
        Camera.data.cameraSensor.width = Camera.data.cameraView.videoWidth
        Camera.data.cameraSensor.height = Camera.data.cameraView.videoHeight
        const ctx = Camera.data.cameraSensor.getContext('2d')

        ctx.save()
        ctx.drawImage(Camera.data.cameraView, 0, 0)

        this.setImage2Storage(ctx)
        this.toggleGuideline()
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
      clearCanvas: function(canvasCtx) {
        canvasCtx.clearRect(0, 0, Camera.data.cameraSensor.width, Camera.data.cameraSensor.height)
      },
      toggleGuideline: function() {
        Camera.data.isCapturingFront = Camera.methods.updateCaptureTarget()

        if (Camera.data.isCapturingFront) {
          Camera.data.frontGuide.style.display = 'block'
          Camera.data.sideGuide.style.display = 'none'
        } else {
          Camera.data.frontGuide.style.display = 'none'
          Camera.data.sideGuide.style.display = 'block'
        }
      }
    }
  }
  return Camera
}
export default getCamera
