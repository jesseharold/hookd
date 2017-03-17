import React, {PropTypes} from 'react';
import Auth from '../modules/Auth';
import CalendarForm from '../components/CalendarForm.jsx';
import helpers from "../../dist/js/helper";

class CalendarPage extends React.Component {
  //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
           
            }
        };
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  render() {
    return (
      <CalendarForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

CalendarPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CalendarPage;