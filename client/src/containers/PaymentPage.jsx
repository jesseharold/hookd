import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import PaymentForm from '../components/PaymentForm.jsx';
import helpers from "../../dist/js/helper"


export class CreditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
      exp_month: null,
      exp_year: null,
      cvc: null,
      token: null,
    };
  }

  render() {
    return (<div className="CreditCard"></div>);
  }
}

CreditCard.propTypes = {};