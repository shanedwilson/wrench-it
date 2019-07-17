import React from 'react';

class Register extends React.Component{

    componentDidMount(){
        const {isRegistered} = this.props;

        if(isRegistered){
            this.props.history.push('/home');
        }
    }
    render(){
        return(
            <h1>This is the registration page</h1>
        )
    }
}

export default Register;
