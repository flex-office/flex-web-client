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
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import styles from "./styles/PlacesSelectorStyles"

interface PlacesSelectorState {
  dropdownIsOpen: boolean
}

interface PlacesSelectorProps {
  onPress: any
  selectedIndex: number
  buttons: Array<string>
}

class PlacesSelector extends React.Component<PlacesSelectorProps, PlacesSelectorState> {
  constructor(props) {
    super(props)
    this.state = {
      dropdownIsOpen: false,
    }
  }

  render() {
    const { onPress, selectedIndex, buttons } = this.props;
    return(
      <Dropdown
        isOpen={this.state.dropdownIsOpen}
        toggle={() => this.setState({dropdownIsOpen: !this.state.dropdownIsOpen})}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column" as "column",
        }}
      >
        <DropdownToggle
          caret
          color="white"
          style={styles.button}
        >
          {buttons[selectedIndex]}
        </DropdownToggle>
        <DropdownMenu>
          {buttons.map((button, i) =>
          <DropdownItem
            onClick={() => onPress(i)}
            key={i}
            active={i === selectedIndex}
            // style={Object.assign({...styles.button}, (i === selectedIndex) ? styles.buttonSelected : {})}
          >
            <span style={{verticalAlign: "middle"}}>{button}</span>
          </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default PlacesSelector;