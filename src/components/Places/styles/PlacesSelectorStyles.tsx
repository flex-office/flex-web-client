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

export default {
  view: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    elevation: 2,
    backgroundColor: "green",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#1B3F7B",
    shadowOffset: { height: 1, width: 0 },
    borderRadius: 17.5,
    padding: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    borderColor: "#7F8184",
    borderWidth: 1,
    color: " #295CB3",
    fontFamily: "Raleway",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
    width: "8rem",
    margin: "0.5rem",
  },
  buttonSelected: {
    color: "#2E89AD",
    // fontWeight: 500,
  }
  
}
