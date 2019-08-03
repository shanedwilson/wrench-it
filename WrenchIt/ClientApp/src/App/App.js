import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Auth from '../components/pages/Auth/Auth';
import Register from '../components/pages/Register/Register'
import Home from '../components/pages/Home/Home'
import MyGarage from '../components/pages/MyGarage/MyGarage';
import Links from '../components/pages/Links/Links';
import Alerts from '../components/pages/Alerts/Alerts';
import Profile from '../components/pages/Profile/Profile';
import ServiceHistory from '../components/pages/ServiceHistory/ServiceHistory';
import authRequests from '../helpers/data/authRequests';
import userRequests from '../helpers/data/userRequests';
import connection from '../helpers/data/connection';

import './App.scss';


const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {...rest} />)
    : (<Redirect to={{ pathname: '/register', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

export default class App extends Component {
  state = {
    authed: false,
    pendingUser: true,
    isRegistered: false,
    currentUser: {},
  }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        if (currentUser.data.isActive === true) { this.setState({ currentUser: currentUser.data, isRegistered: true }); }
      });
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
        this.getUser()
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
          currentUser: {},
          isRegistered: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
    this.logoutClickEvent();
  }

  render() {
    const {
      authed,
      pendingUser,
      currentUser,
      isRegistered,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, currentUser: {}, isRegistered: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={ authed } currentUser={currentUser} logoutClickEvent={logoutClickEvent} />
                <Switch>
                  <PublicRoute path='/auth'
                    component={Auth}
                    authed={ authed }
                  />
                  <PrivateRoute path='/' exact component={Auth} authed={authed} />
                  <PrivateRoute path='/register' exact
                    component={props => <Register getUser={this.getUser} isRegistered={isRegistered} {...props} currentUser={currentUser}/>}
                      authed={authed}/>
                  <PrivateRoute path="/home" component={props => <Home {...props} currentUser={currentUser}/>} authed={authed}/>
                  <PrivateRoute exact path="/mygarage" component={props => <MyGarage {...props} currentUser={currentUser}/>} authed={authed}/>
                  <PrivateRoute path="/mygarage/:id" component={props => <MyGarage {...props} currentUser={currentUser}/>} authed={authed}/>
                  <PrivateRoute path="/links" component={props => <Links {...props} currentUser={currentUser}/>} authed={authed}/>
                  <PrivateRoute path="/alerts" component={props => <Alerts {...props} currentUser={currentUser}/>} authed={authed}/>
                  <PrivateRoute path="/profile" authed={authed} component={props => <Profile {...props} currentUser={currentUser}/>}/>
                  <PrivateRoute exact path="/service/history/:id" authed={authed} component={props => <ServiceHistory {...props} currentUser={currentUser}/>}/>
                </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
