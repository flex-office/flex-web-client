import regex from "../config/regex.js";
import server from "../config/server.js";
import config from "../config/api.js";

export class PlaceError extends Error {
  user: any;
  constructor(message: string, user?: any) {
    super(message);
    this.name = "PlaceError";
    this.user = user;
  }
}

export default async function takePlace(id: string, place: string) {
  var ListPlaces= JSON.parse(sessionStorage.getItem("PLACES"));
  ListPlaces=ListPlaces.filter(placeList=>placeList.id==place);
  if (place === "" || place.match(regex.placeRegex) === null || ListPlaces.length===0) {
    throw new PlaceError("WrongFormatPlace");
  }
  const payload = {
    id_user: id,
    id_place: place.toUpperCase()
  };

  const res = await fetch(`${server.address}places/take`, {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${config.token}`
    },
    body: JSON.stringify(payload)
  });
  
  if (res.status === 500) {
    const user = await res.json();
    throw new PlaceError("AlreadyTaken", user);
  } else if (res.status === 200) {
    return;
  } else {
    throw new PlaceError("Cette place n'est pas disponible");
  }
}
