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

import Input from "../../components/General/Input";
import FilePicker from "../../components/General/FilePicker";

import { fetchPhoto, logOut } from "../../components/Navigation/reducer";

import defaultProfile from "../../assets/profile.png"

const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

type Historical = {
  place_id: string,
  begin: string,
  end: string
};

const profileStyles = {
  row: {
    fontFamily: "Raleway",
    display: "flex",
    alignItems: "center",
    color: "#568AC4",
  },
  text: {
    fontWeight: 600,
    marginRight: 5,
    fontSize: "1.2rem",
  },
}

export const ProfileDescription = (props: { name: any, fname: any, id: any }) => {
  const { name, fname, id } = props;
  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={profileStyles.row}>
        {fname} {name.toUpperCase()}
      </div>
    </div>
  );
};

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

type SettingsScreenState = {
  name: string,
  fname: string,
  id: string,
  place?: string,
  photo?: string,
  historical?: Array<Historical>,
  debug?: Array<any> | string,
  remoteDay?: Array<string>,
  arrayOfFriends: Array<any>
  startDate: string
  endDate: string
  remoteDayIndexes: Array<number>
  loadingSave: boolean
  progress: any
  userPlace: string
};

interface SettingsScreenProps {
  history: any
  fetchPhoto: any
  logOut: any
  setTitle: any
}

export class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  static navigationOptions = {
    title: "Profile",
    headerTintColor: "black",
    tabBarIcon: () => (
      <img
        src={picProfile}
        style={{ width: "1rem", height: "1rem" }}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fname: "",
      id: "",
      remoteDayIndexes: [],
      photo: "",
      arrayOfFriends: [],
      loadingSave: false,
      progress: 0,
      userPlace: null,
      startDate: "",
      endDate: ""
    };
    props.setTitle("Profil")
  }

  componentDidMount() {
    const result = localStorage.getItem("USER")
    if (!result) this.props.history.push("/login")
    else {
      this.setState(JSON.parse(result));
      const days = JSON.parse(result).remoteDay
      this.setState({
        // map Trouve index du jour
        remoteDayIndexes: (!days) ? [] :
          (days.map) ? days.map(
            x => WEEK_DAYS.findIndex(
              e => e === x
            )
          ) : [WEEK_DAYS.findIndex(e => e === days)],
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
        if (data) {
          this.setState({
            userPlace: data,
            startDate: moment(data.start_date).format("DD/MM/YYYY"),
            endDate: moment(data.end_date).format("DD/MM/YYYY")
          });
        }
      });
  }

  addDay = i => this.state.remoteDayIndexes.concat(i)

  removeDay = i => this.state.remoteDayIndexes.filter(x => x !== i)

  updateIndex = async i => {
    const newIndexes = (this.state.remoteDayIndexes.includes(i)) ? this.removeDay(i) : this.addDay(i)
    if (newIndexes.length > 2) return
    await this.setState({ remoteDayIndexes: newIndexes, remoteDay: newIndexes.map(x => WEEK_DAYS[x]) })
    this.saveRemote()
  }

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
        // console.log(data);
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
    const { remoteDayIndexes, name, fname, id, photo, loadingSave, startDate, endDate } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.viewContainer}>
          <ModalComponent visible={loadingSave} ctx={this} />
          <img
            style={
              photo
                ? {
                  width: "1rem",
                  height: "1rem",
                  borderRadius: 35,
                }
                : {
                  width: "4rem",
                  height: "4rem",
                }
            }
            src={photo ? photo : defaultProfile}
          />
          <div style={{
            marginLeft: "0.6rem",
            marginTop: "0.24rem",
            marginBottom: "0.24rem",
            flex: 1,
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "space-between",
          }}>
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
              <button style={{
                flex: 1,
                background: "#76A6DC",
                borderRadius: 7,
                border: "none",
                color: "white",
                fontSize: "0.9rem",
                padding: 2,
                width: 170,
                cursor: "pointer"
              }}>Importer une photo de profil</button>
            </FilePicker>
          </div>

        </div>

        <DeconnectionButton
          onPress={() => {
            // LogOut current user
            this.props.logOut("");
            localStorage.removeItem("USER");
            this.props.history.push("/login")
          }}
        />


        <div style={styles.viewContainerRemote}>
          <div style={styles.remoteText}>Télétravail </div>
          <ButtonGroup
            style={{
              margin: 10,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              maxWidth: "100%",
              justifyContent: "center"
            }}
          >
            {WEEK_DAYS.map((day, i) =>
              <Button
                onClick={() => this.updateIndex(i)}
                key={i}
                outline
                style={Object.assign({ ...styles.button }, (remoteDayIndexes.includes(i)) ? styles.buttonSelected : {})}
              >
                {day}
              </Button>)}
          </ButtonGroup>
        </div>

        <div style={styles.viewContainerSemiFlex}>
          <div style={styles.semiFlexRow}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}>
              <div style={styles.semiFlexText}>Absent/e du</div>
              <Input
                onChange={e => this.setState({ startDate: e.target.value })}
                onSubmit={() => this.saveRemote()}
                placeholder="DD/MM/AAAA"
                value={startDate}
                style={styles.semiFlexInput}
                clearable
              />
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "0.1rem",
              marginBottom: "1.2rem",
            }}>
              <div style={styles.semiFlexText}>au</div>
              <Input
                onChange={e => this.setState({ endDate: e.target.value })}
                onSubmit={() => this.saveRemote()}
                placeholder="DD/MM/AAAA"
                value={endDate}
                style={styles.semiFlexInput}
                clearable
              />
            </div>
          </div>
          <button
            style={styles.semiFlexButton}
            onClick={() => this.saveRemote()}
          >
            <div style={styles.semiFlexButtonText}>Enregistrer</div>
          </button>
        </div>

        {/* For future purpose */}
        {/* <Calendar /> */}

      </div>
    );
  }
}

const mapStateToProps = (state, _) => {
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
