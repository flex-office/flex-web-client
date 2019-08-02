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
    alignSelf: "center",
    width: "85%",
    display: "flex",
    justifyContent: "space-between",
    elevation: 2,
    // height: 100,
    padding: 10,
  },

  viewContainerRemote: {
    alignItems: "center",
    display: "flex",

    
    flexDirection: "column" as "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#468BB6",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  viewContainerSemiFlex: {
    
   
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 7,
    
    flexDirection: "column" as "column",
    display: "flex",
    padding: 10,
  },
  remoteText: {
    color: "#568AC4",
    fontFamily: "Roboto",
    fontSize: 12,
    margin: 10,
    width: "85%",
    display: "flex",
    justifyContent: "center",
    borderTop: "solid" as "solid",
    borderTopWidth: 1,
    borderTopColor:"#7F8184",
    paddingTop: 15,
    marginTop: 20

  },
  semiFlexText: {
    width: "40%",
    padding: 5,
    marginBottom: 0,
    fontFamily: "Roboto",
    color: " #568AC4",
    fontSize: 12,
   textAlign: "right" as "right"
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
    maxWidth: 80,
    margin: 7,
    marginTop: 0,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    fontSize: "0.7rem",
    paddingLeft: 8,
    paddingRight: 8,
    padding: 4

  },
  buttonSelected: {
    color: "white",
    border: "none",
    backgroundColor: "#568AC4",
    

  },
  semiFlexRow: {
    alignItems: "center",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    display: "flex",
    flex: 1,
    flexWrap: "wrap" as "wrap",
    width: "85%"
  },
  semiFlexButton: {
    alignItems: 'center',
    // alignSelf: 'stretch',
    backgroundColor: ' #568AC4',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    width: 130,
        padding: 4,
        border: "none",
        marginTop: "0.5rem",
  
  },
  semiFlexButtonText: {
    flex: 1,
    color: "white",
    fontSize: 12,
  
    
  },
}
