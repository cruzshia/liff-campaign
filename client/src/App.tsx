import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './App.module.sass'
import Home from './containers/home'
import InfoSetting from '@components/infoSetting'
import WeightSetting from '@components/weightSetting'
import Measurement from '@components/measurement'
import Login from './containers/Login'
import { IntlProvider } from 'react-intl'
import ja from './translations/ja.json'
import { routePath } from './appConfig'

const store = configureStore()
const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <IntlProvider locale='ja' messages={ja}>
          <Router>
            <Login />
            <Switch>
              <Route
                exact
                path={routePath.infoSetting}
                component={InfoSetting}
              />
              <Route
                exact
                path={routePath.weightSetting}
                component={WeightSetting}
              />
              <Route
                exact
                path={routePath.measurement}
                component={Measurement}
              />
              <Route exact path={routePath.root} component={Home} />
            </Switch>
          </Router>
        </IntlProvider>
      </Provider>
    </div>
  )
}

export default App
