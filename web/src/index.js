import React, { useContext } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Context from "./Context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { App } from "./App";
import { navigate } from "@reach/router";

import firebaseApp from "firebase";

require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAcILCwpSZ9Ccp76ET1SANcvgVaLcdjMz0",
  authDomain: "rugbyagentsapp.firebaseapp.com",
  databaseURL: "https://rugbyagentsapp.firebaseio.com",
  projectId: "rugbyagentsapp",
  storageBucket: "rugbyagentsapp.appspot.com",
  messagingSenderId: "323378684781",
  appId: "1:323378684781:web:8db06f651612b9ecf43064",
  measurementId: "G-KYH2ZMESFR",
};

firebaseApp.initializeApp(firebaseConfig);

const client = new ApolloClient({
  uri:
    "http://localhost:5001/rugbyagentsapp/us-central1/rugbyAgentsApi/graphql",
  //uri:
  // "https://us-central1-rugbyagentsapp.cloudfunctions.net/rugbyAgentsApi/graphql",
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = window.localStorage.getItem("tokenRA");
    const authorization = token ? `Bearer ${token}` : "";
    operation.setContext({
      headers: {
        authorization,
      },
    });
  },
  onError: (error) => {
    const { networkError } = error;

    console.log(
      "¡+++++++ ERROR CONTEXT +++++++" + JSON.stringify(networkError)
    );
    if (networkError && networkError.result.code === "invalid_token") {
      window.localStorage.removeItem("token");
      navigate("/login");
    }

    const errorCode = error.graphQLErrors ? error.graphQLErrors[0].message : "";
    console.log("error code contexto : " + error.graphQLErrors);
    if (errorCode) {
      console.log("error code contexto : " + errorCode);
      var code = errorCode.substring(0, errorCode.indexOf("-"));
      console.log("code : " + code);
      var message = errorCode.substring(
        errorCode.lastIndexOf("-") + 1,
        errorCode.length
      );
      if (code && code === "404") {
        navigate(`/notFound/${message}`);
      }
    }
  },
});

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById("app")
);
