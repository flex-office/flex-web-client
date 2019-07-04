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

import { Route, NavLink } from 'react-router-dom'

import { createStore } from "redux";
import { Provider } from "react-redux";

import devToolsEnhancer from "remote-redux-devtools";

import Icon from "react-fontawesome"

// import SplashScreen from "../views/Splash/SplashScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";
import SettingsScreen from "../views/Settings/SettingsScreen";
import PlacesScreen from "../views/Places/PlacesScreen";
import UsersScreen from "../views/Users/UsersScreen";
// import OfflineNotice from "../utils/OfflineNotice";

import reducer from "../components/Navigation/reducer";
import HeaderBar from "../components/Navigation/HeaderBar";

import styles from "./NavigationAppStyles"

const store = createStore(reducer, devToolsEnhancer());

interface NavElemProps {
  to: string
  icon: string
}

export class NavElem extends React.Component<NavElemProps> {
  render() {
    return (
      <NavLink to={this.props.to}
        exact
        style={styles.navLink}
        activeStyle={{
          color: "#58C0D0"
        }}
      >
        <Icon
          name={this.props.icon}
          style={{ fontSize: 23 }}
        />
        {this.props.children}
      </NavLink>
    )
  }
}

export class NavBar extends React.Component {
  render() {
    return (
      <div style={styles.navBar}>
        <Nav style={styles.nav} navbar justify="true">
          <NavItem>
            <NavElem to="/" icon="qrcode">Ma Place</NavElem>
          </NavItem>
          <NavItem>
            <NavElem to="/places" icon="search">Places</NavElem>
          </NavItem>
          <NavItem>
            <NavElem to="/users" icon="users">Utilisateurs</NavElem>
          </NavItem>
        </Nav>
      </div>
    )
  }
}

export class NavigationApp extends React.Component {
  render() {
    return (
      <div style={styles.navApp}>
        <HeaderBar/>
        <div style={styles.pageContainer}>
          <Route exact path="/" component={ProfileScreen}/>
          <Route path="/places" component={PlacesScreen}/>
          <Route path="/users" component={UsersScreen}/>
          <Route path="/settings" component={SettingsScreen}/>
        </div>
        <NavBar/>
      </div>
    )
  }
}

const NetInfoWrapper = () => (
  <Provider store={store}>
    <div style={{ flex: 1, height: "100%" }}>
      <NavigationApp />
    </div>
  </Provider>
);

export default NetInfoWrapper;