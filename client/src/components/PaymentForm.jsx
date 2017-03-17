import React from 'react';
import Payment from 'payment';
import { Row, Col, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';

  
const PaymentForm = ({

})
export class CreditCard extends React.Component {
  constructor(props) {

  renderCardForm() {
    return (<form className="CardForm" onSubmit={ this.handleSubmit }>
      <Row>
        <Col xs={ 12 }>
          <FormGroup>
            <ControlLabel>Card Number</ControlLabel>
            <input
              onKeyUp={ this.setCardType }
              className="form-control"
              type="text"
              ref="number"
              placeholder="Card Number"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={ 6 } sm={ 5 }>
          <FormGroup>
            <ControlLabel>Expiration</ControlLabel>
            <input
              className="form-control text-center"
              type="text"
              ref="expiration"
              placeholder="MM/YYYY"
            />
          </FormGroup>
        </Col>
        <Col xs={ 6 } sm={ 4 } smOffset={ 3 }>
          <FormGroup>
            <ControlLabel>CVC</ControlLabel>
            <input
              className="form-control text-center"
              type="text"
              ref="cvc"
              placeholder="CVC"
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" bsStyle="success" block>Generate Token</Button>
    </form>);
  }
  
  render() {
    return (<div className="CreditCard">
      { this.renderCardList() }
      { this.renderCardForm() }
    </div>);
  }
}
}

CreditCard.propTypes = {};