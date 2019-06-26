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

const InputLogin = (props: {
  onSubmitEditing: any,
  onChangeText: any,
  onChangeText1: any,
  onChangeText2: any
}) => {
  const { onSubmitEditing, onChangeText, onChangeText1, onChangeText2 } = props;
  return (
    <form onSubmit={onSubmitEditing}>
      <input
        type="text"
        placeholder="Nom"
        onChange={onChangeText}
      />

      <input
        type="text"
        placeholder="Prénom"
        onChange={onChangeText1}
      />

      <input
        placeholder="ID"
        onChange={onChangeText2}
      />
    </form>
  );
};

export default InputLogin;
