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
import Input from "../General/Input"

const InputLogin = (props: {
  onSubmitEditing: any,
  onChangeID: any,
  onChangeSurname: any,
  onChangeName: any,
  id: any,
  surname: any,
  name: any,
}) => {
  const { onSubmitEditing, onChangeID, onChangeSurname, onChangeName, id, surname, name } = props;
  return (
    <div style={{
      flex: 1,
      flexDirection: "column",
      display: "flex"
    }}>

      <Input
        onChange={onChangeID}
        onSubmit={onSubmitEditing}
        placeholder="ID format: XX00000"
        value={id}
      />

      <Input
        onChange={onChangeSurname}
        onSubmit={onSubmitEditing}
        placeholder="Nom"
        value={surname}
        // disabled
      />

      <Input
        onChange={onChangeName}
        onSubmit={onSubmitEditing}
        placeholder="Prénom"
        value={name}
        // disabled
      />
    </div>
  );
};

export default InputLogin;
