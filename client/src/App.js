import './App.css';

import Login from './pages/Login'
import Pricing from './pages/Pricing'
import Signup from './pages/Signup'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <div className="App">
          <Router>
              <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/' component={Pricing} />
                  <Route exact path='/signup' component={Signup} />
              </Switch>
          </Router>

        </div>
    );
}

export default App;
