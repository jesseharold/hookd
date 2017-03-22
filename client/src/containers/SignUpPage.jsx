import React, { PropTypes } from "react";
import SignUpForm from "../components/SignUpForm.jsx";
import axios from 'axios'


class SignUpPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            user: {
                email: "",
                first_name: "",
                last_name: "",
                password: ""
            }
        };
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
        user
        });
    }

    processForm(event) {
        const self = this;

        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const first_name = this.state.user.first_name;
        const last_name = this.state.user.last_name;
        const email = this.state.user.email;
        const password = this.state.user.password;

        // create an AJAX request

        axios.post("/auth/signup",
        {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "password": password
        })
          .then(function (response){
            self.context.router.replace("/login");
          })
          .catch(function(error){
            console.log(error);
          })
    }
    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
                />
        );
    }
}


SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired,
};



export default SignUpPage;
