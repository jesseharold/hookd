import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {
  // Class constructor.
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
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

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            // success! change the component-container state
            this.setState({
              errors: {}
            });
            // save the token
            Auth.authenticateUser(xhr.response.token);
            // change the current URL to /
            this.context.router.replace('/');
        } else {
            // failure
            // change the component state
            const errors = xhr.response.errors ? xhr.response.errors : {};
            errors.summary = xhr.response.message;
            this.setState({
              errors
          });
        }
    });
    xhr.send(formData);
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
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;