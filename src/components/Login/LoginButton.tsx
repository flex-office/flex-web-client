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

const styles = {
  container: {
    alignItems: "center",
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
  },
  button: {
    backgroundColor: "white",
    borderColor: "#2E89AD",
    borderRadius: 15,
    borderWidth: 2,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    color: "#2E89AD",
    fontFamily: "Roboto",
    fontWeight: "bold" as "bold",
    textTransform: "uppercase" as "uppercase",
  },
}

const LoginButton = (props: { onPress: () => void }) => {
  const { onPress } = props;
  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={onPress}
      >
        <div
          style={styles.text}
        >
          S'identifier
        </div>
      </button>
    </div>
  );
};

export default LoginButton;
