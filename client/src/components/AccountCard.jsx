import React from "react";
import { Query } from "react-apollo";
import styles from "./AccountCard.module.css";
import AuthContext from "../context/auth-context";
import GET_USER from "../graphql/getUser";
import stockUser from "../assets/user1.png";

const AccountCard = () => (
  <AuthContext.Consumer>
    {context => {
      const Options = {
        headers: {
          Authorization: context.userId ? `Bearer ${context.token}` : ""
        }
      };
      return (
        <Query query={GET_USER} context={Options}>
          {({ loading, error, data: { user } }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( </p>;

            return (
              <div className={styles.label}>
                {user.image === null ? (
                  <img src={stockUser} alt="user" />
                ) : (
                  <img src={user.image} alt="user" />
                )}
                <div className={styles.flextext}>
                  <span>Welkom,</span>
                  <span>{user.naam}</span>
                </div>
              </div>
            );
          }}
        </Query>
      );
    }}
  </AuthContext.Consumer>
);

export default AccountCard;
