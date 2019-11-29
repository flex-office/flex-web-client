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
import React, { Component, useState } from "react";
import { Button, ButtonGroup, Modal, Spinner } from "reactstrap"
//import { Spinner } from "react-activity"
import { withRouter } from "react-router-dom"

import { connect } from "react-redux";
import { assoc, omit } from "ramda";
import config from "../../config/api.js";
import server from "../../config/server.js";
import picProfile from "../../assets/profile.png";

import moment from "moment";

import styles from "./SettingsScreenStyles";

// import { Calendar } from "react-native-calendars";
import DeconnectionButton from "../../components/Settings/DeconnectionButton";

import Input from "../../components/General/Input";
import FilePicker from "../../components/General/FilePicker";
import {logger} from "../../App";

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { fetchPhoto, logOut } from "../../components/Navigation/reducer";

import defaultProfile from "../../assets/profile.png";

const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

type Historical = {
  place_id: string;
  begin: string;
  end: string;
};
const profileStyles = {
  row: {
    fontFamily: "Raleway",
    display: "flex",
    alignItems: "center",
    color: "#295CB3"
  },
  text: {
    fontWeight: 600,
    marginRight: 5,
    fontSize: "1.2rem"
  }
};

export const ProfileDescription = (props: {
  name: any;
  fname: any;
  id: any;
}) => {
  const { name, fname, id } = props;
  return (
    <div style={{ maxWidth: "1000px" }}>
      <div style={profileStyles.row}>
        {fname} {name.toUpperCase()}
      </div>
    </div>
  );
};

export const ModalComponent = (props: { visible: any; ctx: any }) => {
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
  start_date: any
  end_date: any
  remoteDayIndexes: Array<number>
  loadingSave: boolean
  progress: any
  userPlace: string
  change: boolean
};

interface SettingsScreenProps {
  history: any
  fetchPhoto: any
  logOut: any
  setTitle: any
}

export class SettingsScreen extends Component<
  SettingsScreenProps,
  SettingsScreenState
> {
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
      start_date: null,
      end_date: null,
      change: false,
    };
    props.setTitle("Profil");
  }

  handleDateChange = (selectedStartDate) => {
    this.setState({
      
      start_date: selectedStartDate,
      change : true
    });
  }
  handleEndDateChange = (selectedEndDate) => {
    this.setState({
      end_date: selectedEndDate,
      change : true
    }); 
  }
  async componentDidMount() {
    const result = localStorage.getItem("USER");
    if (!result) this.props.history.push("/login");
    else {
      this.setState(JSON.parse(result));
      const days = JSON.parse(result).remoteDay;
      this.setState({
        // map Trouve index du jour
        remoteDayIndexes: !days
          ? []
          : days.map
          ? days.map(x => WEEK_DAYS.findIndex(e => e === x))
          : [WEEK_DAYS.findIndex(e => e === days)],
        place: ""
      });
      const userId = JSON.parse(result).id;
      const response = await fetch(`${server.address}users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization": `Bearer ${config.token}`
        }
      });
      const json = await response.json();
      logger.debug(json);
      
          
          this.setState({
            photo: json.photo,
            historical: json.historical,
            loadingSave: false,
            start_date:JSON.parse(localStorage.getItem("USER")).start_date,
            end_date: JSON.parse(localStorage.getItem("USER")).end_date,
            change: false
          });
          const user = JSON.parse(localStorage.getItem("USER") || "");
          localStorage.setItem(
            "USER",
            JSON.stringify(Object.assign({ ...user }, { photo: json.photo }))
          );
          this.getUserPlace(userId);
          if(this.state.start_date === undefined){
            this.setState({start_date:null});
          }
          if(this.state.end_date === undefined){
            this.setState({end_date:null});
          }
        
    }
  }

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
            userPlace: data
          });
        }
      })
      .catch(error => logger.error(error))
  };

  addDay = i => this.state.remoteDayIndexes.concat(i);

  removeDay = i => this.state.remoteDayIndexes.filter(x => x !== i);

  updateIndex = async i => {
    const newIndexes = this.state.remoteDayIndexes.includes(i)
      ? this.removeDay(i)
      : this.addDay(i);
    if (newIndexes.length > 2) return;
    await this.setState({
      remoteDayIndexes: newIndexes,
      remoteDay: newIndexes.map(x => WEEK_DAYS[x]),
      change: true,
    });

  };






  saveRemote = async () => {
    const { id, photo, remoteDay, start_date, end_date } = this.state;
    this.setState({ loadingSave: true });
    console.log(photo);

    if(typeof start_date==typeof 'string' && typeof end_date==typeof 'string' && JSON.parse(localStorage.getItem("USER")).start_date!=null){
      var start_date2=null;
      var end_date2=null;
    }
    else{
      var start_date2=start_date;
      var end_date2=end_date;
    }
    

    const payload = {
      id_user: id,
      photo: photo,
      remoteDay,
      start_date: moment.utc(start_date2).format("DD/MM/YYYY"),
      end_date: moment.utc(end_date2).format("DD/MM/YYYY")
    };
    fetch(`${server.address}user/settings`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${config.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
      });
      
    // Wait until the photo is uploaded to Cloudinary and the link is provided to perform request
    // Jan 06092019 : uploaded with a GET ? downloaded instead ?

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

            this.setState({ loadingSave: false, change: this.state.change ? false : false });
          });
      });
    logger.debug('save')
  };

 showAlert()
{
  alert("Vos modifications ont bien été prises en compte !");
};


verifyIfItPossible(start_date,end_date){
  if(typeof start_date==typeof 'string'){
    start_date=new Date(start_date);
  }
  if(typeof end_date==typeof 'string'){
    end_date=new Date(end_date);
  }
  console.log(start_date, end_date);
     
  if((start_date!==null && end_date !==null)&&(end_date>=start_date)){
            this.setState({start_date:start_date});
            this.setState({end_date:end_date});
            this.saveRemote();
  }
    else{
      console.log("date pas enregistre");
    }
}

  render() {
    const { remoteDayIndexes, name, fname, id, photo, loadingSave, start_date, end_date, change } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.viewContainer}>
          <ModalComponent visible={loadingSave} ctx={this} />
          <img
            style={
              photo
                ? {
                    width: "2.2rem",
                    height: "2.2rem",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }
                : {
                    width: "2.2rem",
                    height: "2.2rem",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }
            }
            src={photo ? photo : defaultProfile}
          />
          <div
            style={{
              marginLeft: "0.6rem",
              marginTop: "0.24rem",
              marginBottom: "0.24rem",
              flex: 1,
              display: "flex",
              flexDirection: "column" as "column",
              justifyContent: "space-between"
            }}
          >
            <ProfileDescription name={name} fname={fname} id={id} />
            <FilePicker
              type="image/*"
              onChange={async image => {
                if (image) {
                  await this.setState({ photo: image, change: true });
                  this.saveRemote();
                }
              }}
            >
              <button
                style={{
                  flex: 1,
                  background: "#295CB3",
                  borderRadius: 7,
                  border: "none",
                  color: "white",
                  fontSize: "0.9rem",
                  padding: 2,
                  width: 170,
                  cursor: "pointer"
                }}
              >
                Importer une photo de profil
              </button>
            </FilePicker>
          </div>
        </div>

        <DeconnectionButton
          onPress={() => {
            // LogOut current user
            this.props.logOut("");
            localStorage.removeItem("USER");
            this.props.history.push("/login");
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
            {WEEK_DAYS.map((day, i) => (
              <Button
                onClick={() => this.updateIndex(i)}
                key={i}
                outline
                style={Object.assign(
                  { ...styles.button },
                  remoteDayIndexes.includes(i) && styles.buttonSelected
                )}
              >
                {day}
              </Button>
            ))}
          </ButtonGroup>
        </div>
   
        <div style={styles.viewContainerSemiFlex}>
          <div style={styles.semiFlexRow}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "baseline"
            }}>
              <div style={styles.semiFlexText}>Absent.e du</div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                 //  @ts-ignore
                    emptyLabel="XX/XX/XXXX"
                    disableToolbar
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    maxDate={this.state.end_date ? this.state.end_date:null}
                    value={this.state.start_date}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date' }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "0.1rem",
                marginBottom: "1.2rem"
              }}
            >
              <div style={styles.semiFlexText}>au</div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                  //  @ts-ignore
                    emptyLabel="XX/XX/XXXX"
                    disableToolbar
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    minDate={this.state.start_date}
                    value={this.state.end_date}
                    onChange={this.handleEndDateChange}
                    KeyboardButtonProps={{'aria-label': 'change date' }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

            </div>
          </div>
            {!loadingSave ? (
              <button
                style={{ display: change ? 'block':'none', backgroundColor: '#295CB3', ...styles.semiFlexButton}}
                onClick={() => !change ? null : this.verifyIfItPossible(start_date,end_date)}
              >
                <div style={styles.semiFlexButtonText}
                 >Enregistrer
                </div>
              </button>
            ) : (
              <div style={styles.spinner}>
                <Spinner style={{ margin: "1rem", color: "#E64417" }}/>
              </div>
            )}
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
