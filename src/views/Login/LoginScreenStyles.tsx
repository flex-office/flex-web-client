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
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    flexDirection: "column" as "column",
    backgroundColor: "white",
    display: "flex",
    minHeight: "calc(100% - 80px)",
  },
  view_second: {
    flex: 1,
    display: "flex"
  },
  debug: {
    display: "flex",
    justifyContent: "center",
    color: "#5167A4",
    margin: 10
  },
  version: {
    position: "absolute",
    bottom: 0,
    marginBottom: 5
  }
};
