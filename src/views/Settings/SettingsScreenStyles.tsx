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
    fontSize: "1rem",
    padding: 32,
    color: "#777",
    fontFamily: "Raleway"
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
    fontFamily: "Raleway"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
    fontFamily: "Raleway"
  },
  buttonTouchable: {
    padding: 16
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    maxWidth: "100%",
    marginTop: "1.5rem",
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column"
  },
  viewContainer: {
    alignItems: "stretch",
    alignSelf: "center",
    maxWidth: "20rem",
    width: "85%",
    display: "flex",
    justifyContent: "center",
    elevation: 2,
    padding: "0.7rem",
    marginBottom: "1rem",
    // padding: 10,
  },
  viewContainerRemote: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-between",
    paddingLeft: "0.7rem",
    paddingRight: "0.7rem",
    maxWidth: "25rem",
    shadowColor: "#468BB6",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  viewContainerSemiFlex: {
    marginTop: "2rem",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 7,
    flexDirection: "column" as "column",
    display: "flex",
    // flex: 1,
    // padding: 10,
  },
  remoteText: {
    color: "#295CB3",
    fontFamily: "Roboto",
    fontSize: "1.1rem",
    margin: 10,
    width: "85%",
    display: "flex",
    justifyContent: "center",
    borderTop: "solid" as "solid",
    borderTopWidth: 1,
    borderTopColor:"#7F8184",
    paddingTop: "0.7rem",
    marginTop: "1rem"

  },
  semiFlexText: {
    width: "40%",
    // padding: 5,
    marginBottom: 0,
    fontFamily: "Raleway",
    color: " #295CB3",
    fontSize: "0.9rem",
    textAlign: "right" as "right"
  },
  semiFlexInput: {
    flex: 1,
    fontSize: "1rem",
    marginLeft: "0.3rem",
  },
  input: {
    height: 40,
    borderWidth: 0,
    margin: 0,
  },
  button: {
    backgroundColor: "white",
    color: "#979797",
    borderColor: "#979797",
    borderRadius: 4,
    // minWidth: "20%",
    maxWidth: "20%",
    margin: "0.6rem",
    marginRight: "0.3rem",
    marginLeft: "0.3rem",
    marginTop: 0,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    fontSize: "0.9rem",
    padding: "0.3rem",
    paddingLeft: "2.7rem",
    paddingRight: "2.7rem",
  },
  buttonSelected: {
    color: "white",
    border: "none",
    backgroundColor: "#295CB3",
  },
  semiFlexRow: {
    alignItems: "center",
    flexDirection: "column" as "column",
    justifyContent: "center",
    display: "flex",
    flex: 1,
    flexWrap: "wrap" as "wrap",
    // width: "85%"
  },
  semiFlexButton: {
    alignItems: 'center',
    borderRadius: 5,
    // flex: 1,
    justifyContent: 'center',
    // width: 130,
    padding: "0.4rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    border: "none",
    marginTop: "0.5rem",
  },
  semiFlexButtonText: {
    flex: 1,
    color: "white",
    fontSize: "0.9rem",
  },
  spinner: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
}
}
