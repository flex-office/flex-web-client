import React from "react";
import NavigationApp from "./navigation/NavigationApp";
// import config from "../config/api.js"
// import server from "../config/server.js"
// import { pushNotifications } from "./utils/services/index"
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./views/Login/LoginScreen";

// pushNotifications.configure()

export default class App extends React.Component {
  // componentWillMount() {
  //   const payload = {
  //     email: config.email,
  //     password: config.password
  //   };

  //   fetch(`${server.address}login`, {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       config.token = data.token;
  //       fetch(`${server.address}me`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "authorization": `Bearer ${config.token}`
  //         }
  //       })
  //         .then(res => res.json())
  //         .then(data => {
  //           config._id = data._id;
  //         });
  //     });
  // }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/">
            <NavigationApp />
          </Route>
        </Switch>
      </Router>
    );
  }
}
