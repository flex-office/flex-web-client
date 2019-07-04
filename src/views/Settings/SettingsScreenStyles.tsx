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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
    fontFamily: "Roboto"
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
    fontFamily: "Roboto"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
    fontFamily: "Roboto"
  },
  buttonTouchable: {
    padding: 16
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column"
  },
  viewContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.4)",
    display: "flex",
    elevation: 2,
    height: 100,
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  viewContainerRemote: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.4)",
    display: "flex",
    elevation: 2,
    flexDirection: "column" as "column",
    height: 100,
    justifyContent: "space-between",
    margin: 20,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  viewContainerSemiFlex: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: "#3662A0",
    shadowOffset: { height: 1, width: 0 },
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    marginBottom: 0,
    height: 100,
    borderRadius: 5,
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.4)"
  },
  remoteText: {
    color: "#7E7E7E",
    fontFamily: "Roboto",
    fontWeight: "bold" as "bold",
    margin: 10,
  },
  semiFlexText: {
    margin: 10,
    marginBottom: 0,
    fontFamily: "Roboto"
  },
  regularText: {
    margin: 10,
    marginBottom: 0,
    fontFamily: "Roboto"
  },
  input: {
    height: 40,
    borderWidth: 0,
    margin: 0
  },
  button: {
    borderColor: "#E4E4E4",
    minWidth: "20%",
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  buttonSelected: {
    color: "#2E89AD",
    fontWeight: "bold"
  },
  semiFlexRow: {
    alignItems: "flex-start",
    flexDirection: "row" as "row",
    justifyContent: "flex-end",
  },
  semiFlexButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#1094F6',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 0,
    maxHeight: 40,
  },
  semiFlexButtonText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold" as "bold",
  },
}
