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
import Input from "../General/Input";
import Downshift from 'downshift';
import { any } from "prop-types";
import server from "../../config/server.js";
import config from "../../config/api.js";


const ManualInsertionCard = (props: {
  onChangeText: any,
  // onPress: any,
  // onSubmitEditing: any,
  // placeInput: string,
}) => {
  const { onChangeText} = props;

  var ListPlaces= JSON.parse(localStorage.getItem("PLACES"));
  


 
  // var ListPlaces=[];
  //   fetch(`${server.address}places/`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //             "authorization": `Bearer ${config.token}`
  //         }
  //     })
  //         .then(res => res.json())
  //         .then(async data => {
  //             ListPlaces=await data.filter(async place => !place.using && (!place.semi_flex ));
  //           console.log("toto");
  //     });
  
 
  return (
    <Downshift
    onChange={onChangeText}
    // onInputValueChange={onChangeText}
    itemToString={item => (item ? item.id : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      
    }) => (
      <div style={styles.view}>
        
        <Input
        id="PlaceSearch"
        placeholder="Place"
        onSubmit={e=>e}
        onClickOnX={e=>e}
        clearable
       {...getInputProps()} />
        <ul style={styles.ul}
        {...getMenuProps()}>
          {isOpen
            ? ListPlaces
                .filter((item => !inputValue.toUpperCase() || item.id.includes(inputValue.toUpperCase()) && !item.using))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.id,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.id}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
  );
};

export default ManualInsertionCard;


