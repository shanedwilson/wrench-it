import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import userRequests from '../../helpers/data/userRequests';

import './AddEditUser.scss';

const defaultUser = {
    email: '',
    firebaseId: '',
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  };

class AddEditUser extends React.Component{
    addEditUserMounted = false;

    state = {
        newUser: defaultUser,
        isEditing: false,
    }

    static propTypes = {
        currentUser: PropTypes.object,
        getUser: PropTypes.func,
    }

    cancelEdit = () => {
      this.props.editProfile();
    }

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempUser = { ...this.state.newUser };
      tempUser[name] = e.target.value;
      this.setState({ newUser: tempUser });
    }
  
    emailChange = e => this.formFieldStringState('email', e);
  
    nameChange = e => this.formFieldStringState('name', e);
  
    streetChange = e => this.formFieldStringState('street', e);
  
    cityChange = e => this.formFieldStringState('city', e);
  
    stateChange = e => this.formFieldStringState('state', e);
  
    postalCodeChange = e => this.formFieldStringState('postalCode', e);
  
    phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

    formSubmit = (e) => {
      e.preventDefault();
      const myUser = { ...this.state.newUser };
      const {isEditingUser, currentUser} = this.props;
      myUser.firebaseId = authRequests.getCurrentUid();
      if(!isEditingUser){
        userRequests.createUser(myUser)
        .then((currentUser) => {
          this.props.getUser();
          this.setState({ newUser: defaultUser, isEditing: true });
        });
      }
      const userId = currentUser.id;
      userRequests.updateUser(userId, myUser)
        .then((user) => {
          this.setState({ currentUser: defaultUser })
          this.props.editProfile();
          this.props.getUser();
        })
    };

    componentDidMount() {
      const { currentUser, isEditingUser } = this.props;
      this.addEditUserMounted = !!currentUser.id;

      if (this.addEditUserMounted && isEditingUser) {
          this.setState({ newUser: currentUser, isEditing: true })
      }
  }

    render(){
        const newUser = { ...this.state.newUser }

        const { isEditing } = this.state;

        const makeButton = () => {
          if(!isEditing) {
            return (
              <div>
                <button className="bttn-pill user-add-btn mx-auto mb-4 mt-3" title="Submit">
                  <i className="add-icon fas fa-user-plus" />
                </button>
              </div>
            )
          }
          return (
            <div className="row">
              <div className="mr-2 mx-auto">
                <button className="bttn-pill user-add-btn mb-4 mt-3" title="Submit">
                  <i className="add-btn fas fa-user-check" />
                </button>
              </div>
              <div className="mr-2 mx-auto">
                <button className="bttn-pill user-add-btn mb-4 mt-3" onClick={this.cancelEdit} title="Cancel">
                  <i className="far fa-window-close cancel-btn"></i>
                </button>
              </div>
            </div>
          )
        }

        const makeHeader = () => {
          if (!isEditing) {
            return (
              <header className="modal-header user-form-header">
                Please Register
              </header>
            )
          }
          return (
            <header className="modal-header user-form-header">
              Edit Profile
            </header>
          )
        }

        return(
          <div className="reg-container d-flex animated fadeIn text-center">
            <form className="row user-form form-container border border-dark rounded mx-auto mb-5 w-50 pt-4 pb-4" onSubmit={this.formSubmit}>
              <div className="w-100">
                {makeHeader()}
              </div>
              <div className="form col-11 mt-4 mx-auto">
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">Email</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="bob@xxx.com"
                      value={newUser.email}
                      onChange={this.emailChange}
                      required
                      />
                  </div>
                </div>
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">Name</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="First Last"
                      value={newUser.name}
                      onChange={this.nameChange}
                      required
                      />
                  </div>
                </div>
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">Street</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="street"
                      placeholder="123 Main St."
                      value={newUser.street}
                      onChange={this.streetChange}
                      required
                      />
                  </div>
                </div>
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">City</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Springfield"
                      value={newUser.city}
                      onChange={this.cityChange}
                      required
                      />
                  </div>
                </div>
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">State</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="TN"
                      value={newUser.state}
                      onChange={this.stateChange}
                      required
                      />
                  </div>
                </div>
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">Postal Code</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      placeholder="12345-6789"
                      pattern="^[0-9]{5}(?:-[0-9]{4})?$"
                      value={newUser.postalCode}
                      onChange={this.postalCodeChange}
                      required
                      />
                  </div>
                </div>
                <div className="col-auto form-lines p-0">
                  <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="input-group-text">Phone Number</div>
                      </div>
                      <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="615-333-4444"
                      value={newUser.phoneNumber}
                      onChange={this.phoneNumberChange}
                      pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                      required
                      />
                  </div>
                </div>
                <div className="text-center">
                  {makeButton()}
                </div>
              </div>
            </form>
          </div>
        )
    }
}

export default AddEditUser;
