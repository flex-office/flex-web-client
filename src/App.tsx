import React from "react"
import NavigationApp from "./navigation/NavigationApp"
// import config from "../config/api.json"
// import server from "../config/server.json"
// import { pushNotifications } from "./utils/services/index"
import "./App.css"

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
    return <NavigationApp/>
  }
}