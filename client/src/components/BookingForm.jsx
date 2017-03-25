import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Favorites from "../components/Favorites.jsx";
import { Link } from 'react-router';


function generateYearOptions(){
  var today = new Date();
  var currentYear = today.getFullYear();

  var years = [];

  for(var i=0; i<5; i++){
    years.push(currentYear+i);
  }

  var options = years.map(function(year){
    return (
      <option value={year} key={year}>
        {year}
      </option>
    );
  });

  return options;
}

function generateMonthOptions(){
  var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var options = months.map(function(month){
    return <option value={month} key={month}>{monthNames[month]}</option>;
  });
  return options;
}

function generateDayOptions(){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  var options = days.map(function(day){
    return <option value={day} key={day}>{day}</option>;
  });
  return options;
}

function getThisDay(){
  var today = new Date();
  return today.getDay();
}
function getThisMonth(){
  var today = new Date();
  return today.getMonth();
}


const BookingForm = ({
  message,
  client,
  onSubmit,
  onChange,
  chooseStyle,
  selectedStyle
}) => (
    <form action="/" onSubmit={onSubmit} id="appointment-form">
      <h2 className="card-heading">Book an Appointment</h2>

        {message && <p className="success-message">{message}<br /><Link style={{fontSize:"20px",fontWeight:"bold"}} to="/pay">Pay for your appointment now.</Link><br /><Link style={{fontSize:"20px",fontWeight:"bold"}} to="/profile">View your appointments in your Profile.</Link></p>}
      
        <div className="form-row">
           <div>Appointment For:</div>
            {client.first_name} {client.last_name}
        </div>
        <div className="form-row">
           <div>Select Barber:</div>
             <select
               name = "barber"
               type="text"
               className="required"
               onChange={onChange}
                >
                <option value="Noah">Noah</option>
                <option value="Bryant">Bryant</option>
                <option value="Arus">Arus</option>
                <option value="Harold">Harold</option>
                <option value="Mo">Mo</option>
            </select>
        </div>
        <div className="form-row">
           <div>Appointment Date:</div>
             <select
               name = "month"
               className="required"
               defaultValue={getThisMonth()}
               onChange={onChange}
                >
            {generateMonthOptions()}
            </select>
            <select
               name = "day"
               className="required"
               defaultValue={getThisDay()}
               onChange={onChange}
                >
              {generateDayOptions()}
            </select>
             <select
               name = "year"
               className="required"
               onChange={onChange}
                >
              {generateYearOptions()}
            </select>
        </div>
        <div className="form-row">
           <div>Appointment Time:</div>
             <select
               name = "hour"
               className="required"
               onChange={onChange}
                >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select
               name = "ampm"
               className="required"
               onChange={onChange}
                >
              <option value="PM">PM</option>
              <option value="AM">AM</option>
            </select>
        </div>      

      <Favorites 
        faveStyles={client.likedStyles} 
        thumbSize="smallThumb"
        titleText="Choose a Style"
        clickHandler={chooseStyle}
        selected={selectedStyle}
         />

      <br style={{clear: "both"}} />
      <div className="button-line">
        <RaisedButton type="submit" label="Book Your Appointment" primary />
      </div>
    </form>
);

BookingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  chooseStyle: PropTypes.func.isRequired,
  selectedStyle: PropTypes.number.isRequired,
  message: PropTypes.string
};

export default BookingForm;