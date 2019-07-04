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
// @flow
/* eslint-disable */
import React, { Component } from "react";
import { Button, ButtonGroup, Modal } from "reactstrap"
import { Spinner } from "react-activity"
import { withRouter } from "react-router-dom"

import { connect } from "react-redux";
import { assoc, omit } from "ramda";
import config from "../../config/api.json";
import server from "../../config/server.json";
import picProfile from "../../assets/profile.png";

import moment from "moment"

import styles from "./SettingsScreenStyles";

// import { Calendar } from "react-native-calendars";
import DeconnectionButton from "../../components/Settings/DeconnectionButton";

import { fetchPhoto, logOut } from "../../components/Navigation/reducer";

import defaultProfile from "../../assets/profile.png"
import { read } from "fs";

const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

type Historical = {
  place_id: string,
  begin: string,
  end: string
};

type SettingsScreenState = {
  name: string,
  fname: string,
  id: string,
  place?: string,
  photo?: string,
  historical?: Array<Historical>,
  debug?: Array<any> | string,
  remoteDay?: string,
  arrayOfFriends: Array<any>
  startDate: string
  endDate: string
  selectedIndex: number
  loadingSave: boolean
  progress: any
  userPlace: string
};

interface SettingsScreenProps {
  history: any
  fetchPhoto: any
  logOut: any
}

const profileStyles = {
  row: {
    fontFamily: "Roboto",
    display: "flex",
    alignItems: "center",
    color: "#7E7E7E"
  },
  text: {
    fontWeight: "bold" as "bold",
    marginRight: 5,
  },
}

export const ProfileDescription = (props: { name: any, fname: any, id: any }) => {
  const { name, fname, id } = props;
  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={profileStyles.row}>
        <div style={profileStyles.text}>Nom : </div>
        {name}
      </div>
      <div style={profileStyles.row}>
        <div style={profileStyles.text}>Prénom : </div>
        {fname}
      </div>
      <div style={profileStyles.row}>
        <div style={profileStyles.text}>ID : </div>
        {id}
      </div>
    </div>
  );
};

interface FilePickerProps {
  type: string
  onChange: any
}

export class FilePicker extends React.Component<FilePickerProps> {
  inputRef: any

  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  handleChange = async (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => this.props.onChange(reader.result)
    reader.onerror = err => console.error(err)
  }

  render() {
    return (
      <div style={{cursor: "pointer"}} onClick={() => this.inputRef.current.click()}>
        <input onChange={this.handleChange} ref={this.inputRef} style={{ display: "none" }} type="file" accept={this.props.type} />
        {this.props.children}
      </div>
    )
  }
}

export const ModalComponent = (props: { visible: any, ctx: any }) => {
  const { visible } = props;
  // Animated.timing(ctx.state.progress, {
  //   toValue: 1,
  //   duration: 3500
  // }).start();
  return (
    <Modal
      isVisible={visible}
      backdropColor="white"
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      {/* <ActivityIndicator size="large" color="#2E89AD" /> */}
      <div
        style={{
          backgroundColor: "transparent",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* Used with lottie-react-native purpose */}
        {/* <LottieView
          style={{ height: 80, width: 80, marginTop: 10 }}
          source={require("../../assets/loading.json")}
          progress={ctx.state.progress}
        /> */}
        <Spinner />
      </div>
    </Modal>
  );
};

export class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  static navigationOptions = {
    title: "Profile",
    headerTintColor: "black",
    tabBarIcon: () => (
      <img
        src={picProfile}
        style={{ width: 20, height: 20 }}
      />
    )
  };

  constructor() {
    super(undefined);
    this.state = {
      name: "",
      fname: "",
      id: "",
      selectedIndex: 0,
      photo: "",
      arrayOfFriends: [],
      loadingSave: false,
      progress: 0,
      userPlace: null,
      startDate: "",
      endDate: ""
    };
  }

  componentDidMount() {
    const result = localStorage.getItem("USER")
    if (!result) this.props.history.push("/login")
    else {
      this.setState(JSON.parse(result));
      this.setState({
        // map Trouve index du jour
        selectedIndex: WEEK_DAYS.findIndex(
          e => e === JSON.parse(result).remoteDay
        ),
        place: ""
      });
      const userId = JSON.parse(result).id;
      fetch(`${server.address}users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization": `Bearer ${config.token}`
        }
      })
        .then(res => res.json()) // transform data to json
        .then(data => {
          this.setState({
            historical: data.historical,
            loadingSave: false
          });
          this.getUserPlace(userId)
        });
    }
  };

  getUserPlace = userId => {
    fetch(`${server.address}users/${userId}/place`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "authorization": `Bearer ${config.token}`
      }
    })
      .then(res => res.json()) // transform data to json
      .then(data => {
        console.log("data")
        console.log(data)
        if (data) {
          this.setState({
            userPlace: data,
            startDate: moment(data.start_date).format("DD/MM/YYYY"),
            endDate: moment(data.end_date).format("DD/MM/YYYY")
          });
        }
      });
  }

  updateIndex = selectedIndex => {
    this.saveRemote();
    return this.setState({ selectedIndex, remoteDay: WEEK_DAYS[selectedIndex] });
  };

  saveRemote = async () => {
    const { id, photo, remoteDay, startDate, endDate } = this.state;
    // this.setState({ loadingSave: true });

    const payload = {
      id_user: id,
      photo: photo.substring(23),
      remoteDay,
      startDate,
      endDate
    };

    fetch(`${server.address}settings_user`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${config.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })

    // Wait until the photo is uploaded to Cloudinary and the link is provided to perform request
    setTimeout(async () => {
      fetch(`${server.address}users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${config.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.props.fetchPhoto(data.photo);
          localStorage.setItem(
            "USER",
            JSON.stringify(
              assoc(
                "place",
                data.id_place,
                omit(["loadingSave"], assoc("photo", data.photo, this.state))
              )
            )
          );

          this.setState({ loadingSave: false });
        });
    }, 3000);
  };

  render() {
    const { selectedIndex, name, fname, id, photo, loadingSave, userPlace, startDate, endDate } = this.state;

    return (
      <div style={{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}>
        <div style={styles.viewContainer}>
          <ModalComponent visible={loadingSave} ctx={this} />
          <ProfileDescription name={name} fname={fname} id={id} />
          <FilePicker
            type="image/jpeg"
            onChange={async image => {
              if (image) {
                await this.setState({ photo: image });
                this.saveRemote();
              }
            }}
          >
            <img
              style={
                photo
                  ? {
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                  }
                  : {
                    width: 70,
                    height: 70,
                  }
              }
              src={photo ? photo : defaultProfile}
            />
          </FilePicker>
        </div>
        <div style={styles.viewContainerRemote}>
          <div style={styles.remoteText}>Jour de télétravail </div>
          <ButtonGroup
            style={{
              margin: 10,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              flex: 1
            }}
          >
            {WEEK_DAYS.map((day, i) =>
              <Button
                onClick={() => this.updateIndex(i)}
                key={i}
                outline
                style={Object.assign({...styles.button}, (i === selectedIndex) ? styles.buttonSelected : {})}
              >
                {day}
              </Button>)}
          </ButtonGroup>
        </div>

        {userPlace ? (
          <div style={styles.viewContainerSemiFlex}>
            <div style={styles.semiFlexText}>Je suis absent.e entre</div>
            <div style={styles.semiFlexRow}>
              <input
                style={styles.input}
                onChange={e => this.setState({ startDate: e.target.value })}
                value={startDate}
              />
              <p style={styles.regularText}>et</p>
              <input
                style={styles.input}
                onChange={e => this.setState({ endDate: e.target.value })}
                value={endDate}
              />
            </div>
            <button
              style={styles.semiFlexButton}
              onClick={() => this.saveRemote()}
            >
              <div style={styles.semiFlexButtonText}>Confirmer</div>
            </button>
          </div>
        ) : null}

        {/* For future purpose */}
        {/* <Calendar /> */}

        <div style={{flex: 1, alignSelf: "center"}}>
          <DeconnectionButton
            onPress={() => {
              // LogOut current user
              this.props.logOut("");
              localStorage.removeItem("USER");
              this.props.history.push("/login")
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.photo
  };
};

const mapDispatchToProps = {
  fetchPhoto,
  logOut
};

// export default withRouter(SettingsScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SettingsScreen));
