import React, { Component } from 'react';
import '../styles/App.css';
import Out from './Out';
import Social from '../Components/social';
import Nomatch from '../Components/404';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from '../Components/MainApp/Dashboard';
import 'tachyons';

const backend_url = 'https://cryptosathi.herokuapp.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signclick: localStorage.getItem('state') || 'loggedout',
      user: {
        name: localStorage.getItem('username'),
        id: localStorage.getItem('id'),
      }
    }
  }

  loaduser = (user) => {
    this.setState({
      user: {
        name: (user.username.split(' ').length <= 1) ? user.username : user.username.split(' ').slice(0, -user.username.split(' ').length + 1).join(' '),
        id: user.id
      }
    }, () => {
      localStorage.setItem('username', (user.username.split(' ').length <= 1) ? user.username : user.username.split(' ').slice(0, -user.username.split(' ').length + 1).join(' '));
      localStorage.setItem('id', user.id);
    });
  }

  signout = (route) => {
    if (route === 'loggedout') {
      this.setState({
        signclick: 'loggedout'
      }, () => {
        localStorage.setItem('state', this.state.signclick);
      });
    }
    if (route === 'home') {
      this.setState({
        signclick: 'home'
      }, () => {
        localStorage.setItem('state', this.state.signclick);
      });
    }
  }

  logout = () => {
    this.signout('loggedout');
    localStorage.clear();
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              {this.state.signclick === 'loggedout' ? <Redirect to='/' /> : <Redirect to={'/dashboard/' + this.state.user.id} />}
              <Out loaduser={this.loaduser} logout={this.logout} signclick={this.signout} backend_url={backend_url} />
            </Route>
            <Route exact path='/dashboard/:id'>
              {this.state.signclick === 'home' ? <Redirect to = {'/dashboard/'+ this.state.user.id} /> : <Redirect to='/' />}
              <Dashboard logout={this.logout} user={this.state.user}/>
            </Route>
            <Route>
              <Nomatch />
            </Route>
          </Switch>
          <Social/>
        </div>
      </Router>
    );
  }
}

export default App;
