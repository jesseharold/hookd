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
            console.log("success!");
          })
          .catch(function(error){
            console.log(error);
          })


        // const xhr = new XMLHttpRequest();
        // xhr.open('post', '/auth/signup');
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // xhr.responseType = 'json';
        // xhr.addEventListener('load', () => {
        //     if (xhr.status === 200) {
        //         // success! change the component-container state
        //         this.setState({
        //             console.log(formData);
        //             errors: {}
        //         });
        //         // set a message
        //         localStorage.setItem('successMessage', xhr.response.message);
        //
        //         // make a redirect
        //         this.context.router.replace('/login');
        //
        //     } else {
        //         // failure
        //         const errors = xhr.response.errors ? xhr.response.errors : {};
        //         errors.summary = xhr.response.message;
        //         this.setState({
        //             errors
        //         });
        //     }
        // });
        // xhr.send(formData);
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
  router: PropTypes.object.isRequired
};

export default SignUpPage;
