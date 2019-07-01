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
  selectorContainer: {
    elevation: 2,
    padding: 15,
    margin: 20,
    marginBottom: 0,
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as "column",
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.4)"
	},
	label: {
		textAlign: "center" as "center",
		fontSize: 18,
		fontFamily: "Roboto",
		color: "black",
    marginBottom: 10,
    fontWeight: "bold" as "bold"
	}
}
