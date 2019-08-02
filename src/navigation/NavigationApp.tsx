/*
Copyright 2019-2020 BRED Banque Populaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from "react";
import {
  Nav,
  NavItem
} from 'reactstrap'

import { Route, withRouter } from 'react-router-dom'

import { createStore } from "redux";
import { Provider } from "react-redux";

import devToolsEnhancer from "remote-redux-devtools";

// import SplashScreen from "../views/Splash/SplashScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";
import SettingsScreen from "../views/Settings/SettingsScreen";
import PlacesScreen from "../views/Places/PlacesScreen";
import UsersScreen from "../views/Users/UsersScreen";
// import OfflineNotice from "../utils/OfflineNotice";

import reducer from "../components/Navigation/reducer";
import HeaderBar from "../components/Navigation/HeaderBar";
import NavElem from "../components/Navigation/NavElem";

import styles from "./NavigationAppStyles"

const store = createStore(reducer, devToolsEnhancer());

export class NavBar extends React.Component {
  render() {
    return (
      <div style={{height: 52}}>
        <div style={styles.navBar}>
          <Nav style={styles.nav} navbar justify="true">
            <NavItem>
              <NavElem to="/home" icon="qrcode">Ma place</NavElem>
            </NavItem>
            <NavItem>
              <NavElem to="/places" icon="search">Trouver une place</NavElem>
            </NavItem>
            <NavItem>
              <NavElem to="/users" icon="users">Utilisateurs</NavElem>
            </NavItem>
          </Nav>
        </div>
      </div>
    )
  }
}

interface NavigationAppProps {
  history: any
  location: any
}

export class NavigationApp extends React.Component<NavigationAppProps> {
  componentWillMount() {
    if (this.props.location.pathname === "/") this.props.history.push("/home")
  }

  render() {
    return (
      <div style={styles.navApp}>
        <HeaderBar/>
        <div style={styles.pageContainer}>
          <Route path="/home" component={ProfileScreen}/>
          <Route path="/places" component={PlacesScreen}/>
          <Route path="/users" component={UsersScreen}/>
          <Route path="/settings" component={SettingsScreen}/>
        </div>
        <NavBar/>
      </div>
    )
  }
}

const NetInfoWrapper = (props: {history: any, location: any}) => (
  <Provider store={store}>
    <div style={{ flex: 1, height: "100%" }}>
      <NavigationApp history={props.history} location={props.location}/>
    </div>
  </Provider>
);

export default withRouter(NetInfoWrapper);