import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import helpers from "../../dist/js/helper"


class LoginPage extends React.Component {
  // Class constructor.
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      successMessage: "",
      user: {
        email: "",
        password: ""
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    var self = this;
    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    helpers.doLogin(formData).then(function(result){
      console.log("doLogin result: ", result);
      if (result.message){
        // there was an error
        // change the component state
        const errors = result;
        errors.summary = result.message;
        self.setState({
          errors
        });  
      } else {
        // success! change the component-container state
        self.setState({
          errors: {}
        });
        // save the token
        Auth.authenticateUser(result);
      }      
      // make a redirect
      self.context.router.replace('/');
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;