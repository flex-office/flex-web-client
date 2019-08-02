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
import styles from "../../views/Profile/ProfileScreenStyles";

const LeaveButton = (props: { place: any, onPress: () => void }) => {
  const { onPress, place } = props;
  return (

 <div
    style={{
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#468BB6",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column" as "column"
    }}
  >
  <div>Place {place}</div>
          
  <div style={styles.leave_button}>
    <button
      style={{
      width: 150,
      padding: 10,
      borderRadius: 7,
      border: "none",
      backgroundColor: "#468BB6",
      verticalAlign: "middle",
      color: "white",
      }}
      onClick={onPress}
    >
    <div>Libérer la place</div>
    </button>
  </div>
</div>
  );
};

export default LeaveButton;
