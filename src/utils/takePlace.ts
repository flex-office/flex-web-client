import regex from "../config/regex.json"
import server from "../config/server.json"
import config from "../config/api.json"

export class PlaceError extends Error {
    user: any
    constructor(message: string, user?: any) {
        super(message)
        this.name = "PlaceError"
        this.user = user
    }
}

export default async function takePlace(id: string, place: string) {
    if (place === "" || place.match(regex.placeRegex) === null) {
        throw new PlaceError("WrongFormatPlace")
    }
    const payload = {
        id_user: id,
        id_place: place.toUpperCase()
    }

    const res = await fetch(`${server.address}take_place`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${config.token}`
        },
        body: JSON.stringify(payload)
    })
    if (res.status === 500) {
        const user = await res.json()
        throw new PlaceError("AlreadyTaken", user)
    }
    else if (res.status === 200) {
        return
    }
    else {
        throw new PlaceError("UnknownError")
    }
}