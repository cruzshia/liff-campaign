import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './style/App.sass'
import Register from '@src/containers/Register'
import WeightSetting from '@src/containers/weightSetting'
import Measurement from '@src/containers/measurement'
import LoginHandler from './containers/LoginHandler'
import { IntlProvider } from 'react-intl'
import ja from './translations/ja.json'
import { routePath } from './appConfig'
import WaistSizeInput from '@src/containers/waistSizeInput'
import InfoSummary from '@src/containers/infoSummary'
import TermOfUse from '@src//containers/TermOfUse'
import CameraTutorial from '@src/containers/cameraTutorial'
import MyPage from '@src/containers/MyPage'
import BodyPhotoCapture from '@src/containers/bodyPhotoCapture'
import AccountRoute from '@components/RouteHandler/AccountRoute'
import NoneAccountRoute from '@components/RouteHandler/NoneAccountRoute'
import RedirectHandler from '@components/RouteHandler/RedirectHandler'

const store = configureStore()
const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <IntlProvider locale='ja' messages={ja}>
          <Router>
            <LoginHandler />
            <RedirectHandler />
            <Switch>
              <Route exact path='/camera' component={BodyPhotoCapture} />
              <NoneAccountRoute exact path={routePath.register} component={Register} />
              <AccountRoute exact path={routePath.weightSetting} component={WeightSetting} />
              <AccountRoute exact path={routePath.measurement} component={Measurement} />
              <AccountRoute exact path={routePath.waistSizeInput} component={WaistSizeInput} />
              <AccountRoute exact path={routePath.infoSummary} component={InfoSummary} />
              <AccountRoute exact path={routePath.termOfUse} component={TermOfUse} />
              <AccountRoute exact path={routePath.cameraTutorial} component={CameraTutorial} />
              <AccountRoute exact path={routePath.myPage.userInfo} component={MyPage} />
              <AccountRoute exact path={routePath.myPage.analysisSummary} component={MyPage} />
            </Switch>
          </Router>
        </IntlProvider>
      </Provider>
    </div>
  )
}

export default App
