import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import helpers from "../../dist/js/helper"

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    var self = this;
    // create an AJAX request
    helpers.getDashboard(Auth.getToken()).then(function(response){
        //console.log("res ", response.data.message);
        self.setState({secretData: response.data.message});
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }

}

export default DashboardPage;