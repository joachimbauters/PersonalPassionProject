import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class SubscribeUser extends Component {
  render() {
    return (
      // ...
      <StripeCheckout
        token={token => {
          console.log(token);
        }}
        stripeKey={"pk_test_WSbJs2wfwIiy7nrhdnfpeLj500Y5w8iB7n"}
      />
    );
  }
}

export default SubscribeUser;
