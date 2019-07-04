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
import React from 'react'
import styles from './styles/DeconnectionButtonStyle'
import Icon from "react-fontawesome"

const DeconnectionButton = (props: { onPress: () => any }) => {
  const { onPress } = props;
  return <div
    style={styles.view}
  >
    <button
      onClick={onPress}
      style={{
        backgroundColor: '#fff',
        width: 200,
        height: 45,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#2E89AD',
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
      }}
    >
      <Icon
        name="power-off"
        style={{
          size: 15,
          color: '#2E89AD'
        }}
      />
      <div style={{
        fontWeight: 700,
        fontFamily: 'Roboto',
        color: '#2E89AD'
      }}>
        ME DÉCONNECTER
      </div>
    </button>
  </div>
}

export default DeconnectionButton
