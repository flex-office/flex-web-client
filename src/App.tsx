import React from "react";
import NavigationApp from "./navigation/NavigationApp";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./views/Login/LoginScreen";
import * as winston from 'winston';
import { format } from "url";
import uuid from 'node-uuid';


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

var correlation_id = uuid.v1();
export {correlation_id};

logger.info("ON LAUNCH >>>>> NODE_ENV             is "+process.env.NODE_ENV);
logger.info("          >>>>> REACT_APP_LOG_LEVEL  is "+process.env.REACT_APP_LOG_LEVEL);
logger.info("          >>>>> REACT_APP_ADDRESS    is "+process.env.REACT_APP_ADDRESS);
logger.info("          >>>>> REACT_APP_SOCKETS    is "+process.env.REACT_APP_SOCKETS);
logger.info("          >>>>> LOG_LEVEL            is "+LOG_LEVEL);
logger.info(" >>>>>>>>>  VERSION 0.4.8  <<<<<<<<<<<<<\n");

export default class App extends React.Component {
    

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


