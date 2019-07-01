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

const ZoneCard = (props: {
  checked: any,
  onPress: () => void,
  checked1: any,
  onPress1: () => void,
  checked2: any,
  onPress2: () => void,
}) => {
  const {
    checked,
    onPress,
    checked1,
    onPress1,
    checked2,
    onPress2,
  } = props;
  return (
    <div>
      <div
        // center
        // title={I18n.t("places.red")}
        // checkedIcon="dot-circle-o"
        // checkedColor="#2E89AD"
        // uncheckedIcon="circle-o"
        // checked={checked}
        onClick={onPress}
      />
      <div
        // center
        // title={I18n.t("places.blue")}
        // checkedIcon="dot-circle-o"
        // checkedColor="#2E89AD"
        // uncheckedIcon="circle-o"
        // checked={checked1}
        onClick={onPress1}
      />
      <div
        // center
        // title={I18n.t("places.green")}
        // checkedIcon="dot-circle-o"
        // checkedColor="#2E89AD"
        // uncheckedIcon="circle-o"
        // checked={checked2}
        onClick={onPress2}
      />
    </div>
  );
};

export default ZoneCard;
