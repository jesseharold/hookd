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
      errors: "",
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
      if (result.data.success){
        // success! change the state to error free
        self.setState({
          errors: ""
        });
        // put username in localstorage for use by other pages
        localStorage.setItem('first_name', result.data.firstName);
        localStorage.setItem('last_name', result.data.lastName);
        // save the token
        Auth.authenticateUser(result.data.user);
        // make a redirect
        self.context.router.replace('/');
      } else {
        // there was an error, show it to the user
        self.setState({
          errors:  result.data.message
        });  
      }    
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

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;