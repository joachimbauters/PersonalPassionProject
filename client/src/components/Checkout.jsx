import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import asteroid_img from "../assets/asteroid.svg";
import styles from "./HuurForm.module.css";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants";
import CREATE_ABBONEMENT from "../graphql/createAbbonement";
import GET_ABBONEMENTEN from "../graphql/getAbbonementen";
import { withApollo } from "react-apollo";
import GET_ABBONEMENTEN_USER from "../graphql/getAbbonementenUser";
import dotenv from "dotenv";

dotenv.config();

//fakevisa: 4242424242424242

class Checkout extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

  onToken = token => {
    const price = this.props.price;
    const checked = this.props.checked;
    const naam = this.props.naam.current.value;
    const asteroidId = this.props.asteroidId;
    const context = this.props.context;
    const stripeToken = token.id;
    const customer = token.card.id;
    const startTime = new Date().toISOString();
    const endTime = new Date(startTime);
    endTime.setMonth(endTime.getMonth() + 1);

    const Options = {
      headers: {
        Authorization: context.userId ? `Bearer ${context.token}` : ""
      }
    };

    if (naam.trim().length === 0 || checked === false) {
      return;
    }

    this.props.client.mutate({
      mutation: CREATE_ABBONEMENT,
      variables: {
        abbonementInput: {
          asteroidId: asteroidId,
          price: price,
          naam: naam,
          startTime: startTime,
          endTime: endTime,
          active: true,
          stripeToken: stripeToken.toString(),
          customer: customer.toString()
        }
      },
      context: Options,
      update: (cache, { data: { createAbbonement } }) => {
        const { abbonementen } = cache.readQuery({
          query: GET_ABBONEMENTEN
        });
        cache.writeQuery({
          query: GET_ABBONEMENTEN,
          data: {
            abbonementen: abbonementen.concat([createAbbonement])
          }
        });
      },
      refetchQueries: () => [{ query: GET_ABBONEMENTEN_USER, context: Options }]
    });

    this.props.naam.current.value = "";
    this.props.history.push(ROUTES.huurbevestiging);
  };

  render() {
    const { price } = this.props;
    return (
      <StripeCheckout
        amount={price * 100}
        currency="EUR"
        description="Beste asteroïden in de galaxy"
        image={asteroid_img}
        locale="auto"
        name="Immo Asteroïd"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={this.onToken}
      >
        <input
          type="submit"
          value="Betaal nu"
          className={styles.bevestighuur}
        />
      </StripeCheckout>
    );
  }
}

export default withApollo(withRouter(Checkout));
