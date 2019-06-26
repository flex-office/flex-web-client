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
// import {
//   TouchableHighlight,
//   AsyncStorage
// } from "react-native";
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap'

import { Route, Link } from 'react-router-dom'
import ProfileScreen from "../views/Profile/ProfileScreen"
import PlacesScreen from "../views/Places/PlacesScreen"
import UsersScreen from "../views/Users/UsersScreen"
import SettingsScreen from "../views/Settings/SettingsScreen"

// import { createStore } from "redux";
// import { Provider } from "react-redux";

// import devToolsEnhancer from "remote-redux-devtools";

// import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
// import LinearGradient from "react-native-linear-gradient";
// import Icon from "react-native-vector-icons/FontAwesome";
// import SplashScreen from "../views/Splash/SplashScreen";
// import LoginScreen from "../views/Login/LoginScreen";
// import ProfileScreen from "../views/Profile/ProfileScreen";
// import SettingsScreen from "../views/Settings/SettingsScreen";
// import PlacesScreen from "../views/Places/PlacesScreen";
// import UsersScreen from "../views/Users/UsersScreen";
// import OfflineNotice from "../utils/OfflineNotice";
// import logo from "../assets/logo.png";
// import ProfileImage from "./components/ProfileImage";

// import reducer, { fetchPhoto } from "./components/reducer";

// const store = createStore(reducer, devToolsEnhancer());

// const fetchUserPhoto = async () => {
//   const userPhoto = await localStorage.getItem("USER")
//   if (!userPhoto) return

//   fetchPhoto(userPhoto);

//   return JSON.parse(userPhoto).photo;
// };

// export const headerBar = (navigation, goBack = false, rightElement = true) => (
//   <div
//     style={
//         {
//           backgroundColor: "white",
//           height: 80
//         }
//     }
//   >
//     <div
//       style={{
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between"
//       }}
//     >
//       {/* Header Left */}
//       {goBack ? withRouter(({history}) =>
//         <TouchableHighlight
//           activeOpacity={0.1}
//           onPress={() => history.goBack()}
//         >
//           <Icon
//             style={{ marginLeft: 20 }}
//             name="angle-left"
//             size={35}
//             color="#2E89AD"
//           />
//         </TouchableHighlight>
//       ) : (
//         <img
//           src={logo}
//           style={{
//             width: 30,
//             height: 30,
//             margin: 10,
//             resizeMode: "contain"
//           }}
//         />
//       )}

//       <p
//         style={{
//           color: "black",
//           fontWeight: "bold",
//           fontSize: 20,
//           fontFamily: "Raleway"
//         }}
//       >
//         Flex-Office
//       </p>

//       {/* Header Right */}
//       {withRouter(({history}) =>
//         <TouchableHighlight
//           activeOpacity={0.1}
//           onPress={() => {
//             if (rightElement) {
//               history.push('/settings')
//               fetchUserPhoto();
//             }
//           }}
//         >
//           <ProfileImage />
//         </TouchableHighlight>
//       )}
//     </div>
//     <LinearGradient
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       colors={["#58C0D0", "#468BB6", "#3662A0"]}
//       style={{ width: "100%", height: 7 }}
//     />
//   </div>
// );

// const NavigationApp = createStackNavigator({
//   Splash: {
//     screen: SplashScreen,
//     navigationOptions: () => ({
//       header: null
//     })
//   },
//   Login: { screen: LoginScreen },
//   Profile: {
//     screen: createBottomTabNavigator(
//       {
//         ProfileScreen,
//         PlacesScreen,
//         UsersScreen
//       },
//       {
//         title: "Places",
//         tabBarPosition: "bottom",
//         swipeEnabled: true,
//         tabBarOptions: {
//           labelStyle: {
//             fontSize: 13,
//             margin: 0,
//             padding: 0,
//             fontFamily: "Raleway"
//           },
//           showLabel: true,
//           showIcon: true,
//           inactiveTintColor: "#3662A0",
//           activeTintColor: "#58C0D0",
//           backgroundColor: "white",
//           style: {
//             backgroundColor: "white",
//             height: 50
//           },
//           indicatorStyle: {
//             backgroundColor: "white"
//           }
//         }
//       }
//     ),
//     navigationOptions: ({ navigation }) => ({
//       /* Custom header */
//       header: headerBar(navigation)
//     })
//   },
//   SettingsScreen: {
//     screen: SettingsScreen,
//     navigationOptions: ({ navigation }) => ({
//       /* Custom header */
//       header: headerBar(navigation, true)
//     })
//   }
// });

// const NetInfoWrapper = () => (
//   <Provider store={store}>
//     <div style={{ flex: 1 }}>
//       <OfflineNotice />
//       <NavigationApp />
//     </div>
//   </Provider>
// );

// export default NetInfoWrapper;

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

export default class NavigationApp extends React.Component {
  render() {
    return (
      <div style={{flex: 1, flexDirection: "column"}}>
        <p>Navigation</p>
        <Route exact path="/" component={ProfileScreen}/>
        <Route path="/places" component={PlacesScreen}/>
        <Route path="/users" component={UsersScreen}/>
        <Route path="/settings" component={SettingsScreen}/>
        <NavBar/>
      </div>
    )
  }
}