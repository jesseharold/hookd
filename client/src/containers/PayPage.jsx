import React, { PropTypes } from "react";
import PayForm from "../components/PayForm.jsx";
import axios from "axios";

class PayPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
          client: {
            first_name: "",
            last_name: "",
            email: "",
            card:{
              number: "",
              exp_month: "",
              exp_year: "",
              cvc: ""
            }
          }
        }
        mixins:
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    changeForm(event){
      const field = event.target.name;
      const client = this.state.client;
      client[field] = event.target.value;


      this.setState({
        client
      });
    }

    updateCard(event){
      const area = event.target.name;
      const card = this.state.client.card;
      card[area] = event.target.value;

      this.setState({
        card
      });
    }

    handleFormSubmit(event){
      event.preventDefault();
      console.log(this.state.client.card);
      var self = this;



      Stripe.card.createToken(this.state.client.card, function(status, res){
        if (res.error){
          console.log("!!!", res);
          console.log(res.error);
        }else{
          console.log(res);
          axios.post("/stripe/charge",
          res)
          .then(function(response){
            console.log("sent to server");
          }).catch(function (error){
            console.log(error);
          });

        }
      })

      }


    render() {
        return (
            <PayForm
                onChange = {this.changeForm}
                onChangeCard = {this.updateCard}
                onSubmit={this.handleFormSubmit}
                client={this.state.client}
                card={this.state.client.card}
                />
        );
    }
}


PayPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default PayPage;
