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

const store = configureStore()
const App: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Login />
          <Switch>
            <Route exact path='/info_setting' component={InfoSetting} />
            <Route exact path='/weight_setting' component={WeightSetting} />
            <Route exact path='/measurement' component={Measurement} />
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
