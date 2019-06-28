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

import FontAwesome from "react-fontawesome"

// import SplashScreen from "../views/Splash/SplashScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";
import SettingsScreen from "../views/Settings/SettingsScreen";
import PlacesScreen from "../views/Places/PlacesScreen";
import UsersScreen from "../views/Users/UsersScreen";
// import OfflineNotice from "../utils/OfflineNotice";

import reducer from "../components/Navigation/reducer";
import HeaderBar from "../components/Navigation/HeaderBar";

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
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          color: "#3662A0"
        }}
        activeStyle={{
          color: "#58C0D0"
        }}
      >
        <FontAwesome
          name={this.props.icon}
          style={{
            fontSize: 23,
          }}
        />
        {this.props.children}
      </NavLink>
    )
  }
}

export class NavBar extends React.Component {
  render() {
    return (
      <div style={{flex: 1, alignSelf: "flex-end", position: "fixed", bottom: 0, width: "100%", display: "flex", borderTopWidth: 1, borderTopColor: "lightgrey", borderTopStyle: "solid"}}>
        <Nav style={{marginTop: 5, flex: 1, justifyContent: "space-around", flexDirection: "row"}} navbar justify="true">
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
      <div style={{flex: 1, flexDirection: "column"}}>
        <HeaderBar/>
        <Route exact path="/" component={ProfileScreen}/>
        <Route path="/places" component={PlacesScreen}/>
        <Route path="/users" component={UsersScreen}/>
        <Route path="/settings" component={SettingsScreen}/>
        <NavBar/>
      </div>
    )
  }
}

const NetInfoWrapper = () => (
  <Provider store={store}>
    <div style={{ flex: 1 }}>
      <NavigationApp />
    </div>
  </Provider>
);

export default NetInfoWrapper;