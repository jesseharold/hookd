import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


function generateYearOptions(){
  var today = new Date();
  var currentYear = today.getFullYear();

  var years = [];

  for(var i=0; i<10; i++){
    years.push(currentYear+i);
  }

  var options = years.map(function(year){
    return (
      <option value={year} key={year}>
        {year}
      </option>
    )
  });

  return options;
}

function generateMonthOptions(){
  var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  var options = months.map(function(month){
    return (
      <option value={month} key={month}>
        {month}
      </option>
    )
  })
  return options;
}




const PayForm = ({
  onSubmit,
  onChange,
  onChangeCard,
  client
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit} id="payment-form">
      <h2 className="card-heading">Pay the Barber</h2>
        <div className="form-row">
           <label>First Name:
             <input
               name = "first_name"
               type="text"
               className="required"
               onChange={onChange}
               value={client.first_name}
                />
            </label>
        </div>
        <div className="form-row">
           <label>Last Name:
             <input
               name = "last_name"
               type = "text"
               className ="required"
               onChange = {onChange}
               value = {client.last_name}
                />
            </label>
        </div>
        <div className="form-row">
           <label>Email:
             <input
               name = "email"
               type ="text"
               className = "required"
               onChange = {onChange}
               value = {client.email}
                />
            </label>
        </div>
        <div className="form-row">
           <label>Card Number:
             <input
               name = "number"
               data-stripe ='number'
               type="text"
               className="required"
               onChange={onChangeCard}
               value={client.card.number}
                />
            </label>
        </div>
        <div className="form-row">
           <label>Expiration Month:
             <select
               name = "exp_month"
               data-stripe = "exp_month"
               type="text"
               className="required"
               onChange={onChangeCard}
               value={client.card.exp_month}
                >
              {generateMonthOptions()}
            </select>
            </label>
           <label>Expiration Year:
             <select  value={client.card.exp_year} onChange={onChangeCard}
               name = "exp_year" data-stripe= "exp_year" className="required">
             {generateYearOptions()}
             </select>
           </label>
        </div>
        <div className="form-row">
           <label>CVC:
             <input
               name = "cvc"
               data-stripe = "cvc"
               type="text"
               className="required"
               onChange={onChangeCard}
               value={client.card.cvc}
                />
            </label>
        </div>
      <div className="button-line">
        <RaisedButton type="submit" label="Pay" primary />
      </div>
    </form>
  </Card>
);

PayForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCard: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired
};

export default PayForm;
