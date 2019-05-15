import React from 'react';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from '../src/config/axios'

import UserRegister from './components/user/register'
import UserLogin from './components/user/login'
import Home from './components/home'
import UserAccount from './components/user/account'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      isAuthenticated: !!localStorage.getItem('token')
    }
  }
  handleIsAuthenticated =(bool)=>{
    this.setState(() => ({
      isAuthenticated : bool
    }))
  }
  render() {
    return (
      <BrowserRouter>
        
            <Link to='/'>Home</Link> |
          
              {
                this.state.isAuthenticated && (
                  <div>
                    <Link to='/users/logout'>Logout</Link>
                    <Link to='/users/account'>My account</Link>
                  </div>
                )
              }
              {
                !this.state.isAuthenticated && (
                  <div>
                    <Link to='/users/register'>Register</Link> |
                    <Link to='/users/login'>Login</Link>
                  </div>
                )
              }
                
        <Switch>
          <Route path='/' component={Home} exact={true}></Route>
          <Route path='/users/register' component={UserRegister} exact={true}></Route>
          <Route path='/users/login' render={(props) => <UserLogin  handleIsAuthenticated={this.handleIsAuthenticated} props = {props}/> }></Route> 
          <Route path='/users/logout' component={(props) => { 
            localStorage.clear()
            axios.defaults.headers['x-auth'] = null
                  return (
                    <div>
                      <p> You have successfully logged out</p>
                    </div>
                  )
                  }}></Route>
          <Route path='/users/account' component={UserAccount} exact={true}></Route>
        </Switch>
        
      </BrowserRouter>
    );
  }
}

export default App;
