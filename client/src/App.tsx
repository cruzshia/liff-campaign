import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Home from './containers/home'
const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
