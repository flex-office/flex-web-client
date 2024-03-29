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
    // justifyContent: "space-around",
    margin: "2rem",
    flexDirection: "column" as "column",
    display: "flex",
    height: "60vh"
  },
  button: {
    backgroundColor: "#295CB3",
    borderRadius: 7,
    border: "none",
    width: "11rem",
    height: "2.7rem",
  },
  text: {
    color: "white",
    fontFamily: "Raleway",
    fontSize: "1.1rem",
  },
  ul:{
    maxWidth:"300px",
    width:"20rem",
    padding:"0px",
    alignItems: "center",
    listStyleType:"none",
    color:"#295CB3",
    margin:"Opx", 
    height: "200px", 
    overflow: "auto", 
  },
  test:{
    color:"black",
  },
  div:{
    alignItems: "center",
    borderRadius:".25rem",
    border:"1px solid rgba(0,0,0,.15)"
  }
}
