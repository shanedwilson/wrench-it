import React from 'react';
import PropTypes from 'prop-types';
import AddEditUser from '../../AddEditUser/AddEditUser';

import './Register.scss';

class Register extends React.Component {
    static propTypes = {
      isRegistered: PropTypes.bool,
      currentUser: PropTypes.object,
    }

    componentDidMount() {
      const { isRegistered } = this.props;

      if (isRegistered) {
        this.props.history.push('/home');
      }
    }

    render() {
      const { getUser, currentUser } = this.props;

      return (
            <AddEditUser
            getUser = {getUser}
            currentUser={currentUser}
            />
      );
    }
}

export default Register;
