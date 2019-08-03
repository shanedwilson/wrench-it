import React from 'react';
import authRequests from '../../../helpers/data/authRequests';
import logo from '../../../images/wrench_it.png';

import './Auth.scss';

class Auth extends React.Component{
    authenticateUser = (e) => {
        e.preventDefault();
        authRequests.authenticate()
          .then(() => {
            this.props.history.push('/register');
          })
          .catch(error => console.error('there was a problem with auth', error));
      }
    
      render() {
        return (
              <div className="Auth animated fadeIn">
                <div className="title-container mx-auto">
                  <h1 className="title text-center">
                    <img src={logo} className="logo-icon" alt="logo" />
                  </h1>
                </div>
                <div className="icon-container text-center mt-5">
                  <i className="auth-icon-1 fas fa-car-side fa-7x border rounded border-dark p-2 fadeInLoad1"></i>
                  <i className="auth-icon-2 fas fa-motorcycle fa-7x border rounded border-dark p-2 fadeInLoad2"></i>
                  <i className="auth-icon-3 fas fa-truck-pickup fa-7x border rounded border-dark p-2 fadeInLoad3"></i>
                </div>
                <div className="btn-container text-center auth-btn-container">
                  <button className="auth-btn bttn-pill bttn-lg" onClick={this.authenticateUser}>
                    <i className="fab fa-google"></i> Sign In w/Google
                  </button>
                </div>
              </div>
        );
      }
}

export default Auth;
