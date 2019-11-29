import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Home from './containers/home'
// import Login from './containers/Login'

const store = configureStore()

const App: React.FC = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          {/* <Login /> */}
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
