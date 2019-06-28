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
  Navbar,
  Nav,
  NavItem
} from 'reactstrap'

import { Route, Link } from 'react-router-dom'

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

const store = createStore(reducer, devToolsEnhancer());

interface NavLinkProps {
  to: string
  icon: string
}

export class NavLink extends React.Component<NavLinkProps> {
  render() {
    return (
      <Link to={this.props.to}>
        {this.props.children}
      </Link>
    )
  }
}

export class NavBar extends React.Component {
  render() {
    return (
      <Navbar style={{flex: 1, alignSelf: "flex-end", position: "fixed", bottom: 0, width: "100%"}} color="light" light expand="md">
        <Nav style={{flex: 1, justifyContent: "space-around"}} navbar justify="true">
          <NavItem>
            <NavLink to="/" icon="qrcode">Ma Place</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/places" icon="search">Places</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/users" icon="users">Utilisateurs</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
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