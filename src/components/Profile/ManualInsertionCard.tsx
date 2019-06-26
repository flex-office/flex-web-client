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
import styles from "./styles/ManualInsertionCardStyle";

const ManualInsertionCard = (props: {
  onChangeText: any,
  onPress: any
  onSubmitEditing: any
}) => {
  const { onSubmitEditing, onChangeText, onPress } = props;
  return (
    <div style={styles.view}>
      <form onSubmit={onSubmitEditing}>
        <input
          style={{ fontFamily: "Raleway", fontSize: 16, paddingBottom: 2, paddingLeft: 0 }}
          placeholder="Place"
          onChange={onChangeText}
        />
      </form>
      <button
        style={{
          width: 100,
          borderRadius: 15,
          backgroundColor: "#fff",
        }}
        title="Réserver"
        onClick={onPress}
      />
    </div>
  );
};

export default ManualInsertionCard;
