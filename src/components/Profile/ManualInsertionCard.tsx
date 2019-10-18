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
import styles from "./styles/ManualInsertionCardStyles";
import Input from "../General/Input"
import PlacesScreen from "../../views/Places/PlacesScreen"
import server from "../../config/server.js";
import config from "../../config/api.js";


const ManualInsertionCard = (props: {
  onChangeText: any,
  onPress: any,
  onSubmitEditing: any,
  placeInput: string,
}) => {
  const { onSubmitEditing, onChangeText, onPress, placeInput } = props;
  
 
  const Places=asyncCall();

  

  
 
  return (
    <div style={styles.view}>
      <Input id="PlaceSearch"
        placeholder="Place"
        onChange={onChangeText}
        onSubmit={onSubmitEditing}
        value={placeInput}
        clearable
      />
      <button
        style={styles.button}
        onClick={onPress}
      >
        <div style={styles.text}>
          Réserver
        </div>
      </button>
    </div>
  );
};

async function asyncCall(){
    var result=await getPlaces();
    console.log("titi");
    return result;
}

function getPlaces (){
  return new Promise(result=>{
  fetch(`${server.address}places/`, {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization": `Bearer ${config.token}`
      }
  })
      .then(res => res.json())
      .then(async data => {
           result(await data.filter(async place => !place.using && (!place.semi_flex )));
        console.log("toto");
        });
    });
}

export default ManualInsertionCard;


