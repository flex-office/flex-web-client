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
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    flexDirection: "column" as "column",
    width: "100%",
    maxWidth: "30rem"
  },
  selectorContainer: {
    elevation: 2,
    padding: "0.7rem",
    marginBottom: 0,
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    display: "flex",
    alignItems: "stretch",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    justifyContent:"center",  
    flex: 0,
    maxWidth: "30rem",
	},
	label: {
		textAlign: "center" as "center",
		fontSize: "1.1rem",
		fontFamily: "Raleway",
		color: " #568AC4",
    marginBottom: 10,
    fontWeight: 600,
    justifyContent: "center"
	}
}
