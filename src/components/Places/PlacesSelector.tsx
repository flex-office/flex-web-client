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
import { Button, ButtonGroup } from "reactstrap";
import styles from "./styles/PlacesSelectorStyles"

interface PlacesSelectorProps {
  onPress: any
  selectedIndex: number
  buttons: Array<string>
}

class PlacesSelector extends React.Component<PlacesSelectorProps> {
  render() {
    const { onPress, selectedIndex, buttons } = this.props;
    return(
      <ButtonGroup
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          flex: 1,
          margin: 10
        }}
      >
        {buttons.map((button, i) =>
        <Button
          onClick={() => onPress(i)}
          key={i}
          outline
          style={Object.assign({...styles.button}, (i === selectedIndex) ? styles.buttonSelected : {})}
        >
          <span style={{verticalAlign: "middle"}}>{button}</span>
        </Button>)}
      </ButtonGroup>
    );
  }
}

export default PlacesSelector;