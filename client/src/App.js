import './App.css';

import Login from './pages/Login'
import Pricing from './pages/Pricing'
import Signup from './pages/SignUp'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AuthState from './context/authContext/AuthState';


function App() {
    return (
        <AuthState>
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/' component={Pricing} />
                        <Route exact path='/signup' component={Signup} />
                    </Switch>
                </Router>
            </div>
        </AuthState>
    );
}

export default App;
