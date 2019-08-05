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
/* eslint-disable */

import React, { Component } from "react";
import picProfile from "../../assets/profile.png";

import { fetchPhoto } from "./reducer";
import { connect } from "react-redux";

interface ProfileImageProps {
  photo: string
  fetchPhoto: any
}

class ProfileImage extends Component<ProfileImageProps> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchUserPhoto();
  }

  fetchUserPhoto = async () => {
    const user = localStorage.getItem("USER");
    if (!user) return

    this.props.fetchPhoto(JSON.parse(user).photo || "");
  };

  render() {
    const { photo } = this.props;

    return (
      <img
        src={
          photo === ""
            ? picProfile
            : photo
        }
        style={
          photo === ""
            ? {
                width: "2.2rem",
                height: "2.2rem",
                margin: 8,
              }
            : {
                width: "2.2rem",
                height: "2.2rem",
                borderRadius: "0.7rem",
                margin: 8,
              }
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.photo
  };
};

const mapDispatchToProps = {
  fetchPhoto
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileImage);
