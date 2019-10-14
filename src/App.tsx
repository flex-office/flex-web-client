import React from "react";
import NavigationApp from "./navigation/NavigationApp";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./views/Login/LoginScreen";
import * as winston from 'winston';
import { format } from "url";


console.log("\nON LAUNCH >>>>> process.env.NODE_ENV             is "+process.env.NODE_ENV+"\n");
console.log("\n          >>>>> process.env.REACT_APP_LOG_LEVEL  is "+process.env.REACT_APP_LOG_LEVEL+"\n");
console.log("\n          >>>>> process.env.REACT_APP_ADDRESS    is "+process.env.REACT_APP_ADDRESS+"\n");
console.log("\n          >>>>> process.env.REACT_APP_SOCKETS     is "+process.env.REACT_APP_SOCKETS+"\n");
console.log("\n >>>>>>>>>  VERSION 0.2.8  <<<<<<<<<<<<<\n");

if (process.env.NODE_ENV === 'development'){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
}

export var LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || "info";

if (process.env.NODE_ENV !== "production") {
  LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL;
}

var logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
});
export {logger};
logger.info("LOG_LEVEL IS : "+LOG_LEVEL);

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
    logger.debug("RENDERING LOGIN PAGE");

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


