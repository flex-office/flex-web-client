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
import styles from "./styles/FetchPlacesButtonStyle";
import Icon from "react-fontawesome"

const FetchPlacesButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <div style={styles.view}>
      <div onClick={onPress} style={Object.assign({flexDirection: "row"}, styles.container)}>
        <div
          style={{
            color: "#2E89AD",
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginRight: 10
          }}
        >
          Actualiser
        </div>
        <Icon name="sync-alt" style={{ fontSize: 15, color: "#2E89AD"}}/>
      </div>
    </div>
  );
};

export default FetchPlacesButton;
