import React from "react"
import { withRouter } from "react-router-dom"
import { omit } from "ramda"
import config from "../../config/api.js";
import server from "../../config/server.js";
import styles from "./ProfileScreenStyles";
// Socket comment
// import socketIOClient from "socket.io-client";
import HeaderCard from "../../components/Profile/HeaderCard"
import LeaveButton from "../../components/Profile/LeaveButton"
import History from "../../components/Profile/History"
import ManualInsertionCard from "../../components/Profile/ManualInsertionCard"
import QRCodeComponent from "../../components/Profile/QRCodeComponent";
import NavElem from "../../components/Navigation/NavElem"
import takePlace from "../../utils/takePlace";
import isMobile from "../../utils/isMobile";
import { Route, Switch } from 'react-router-dom'

interface LeaveComponentProps {
    place: string
    leavePlace: any
    showMessage: boolean
    name: string
    fname: string
}

export class LeaveComponent extends React.Component<LeaveComponentProps> {
    render() {
        const { place, leavePlace, showMessage, name, fname } = this.props;

        return (
            <div style={styles.leave_button}>
                <HeaderCard fname={fname} name={name} />
                <div style={{
                    display: "flex",
                    flexDirection: "column" as "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "6rem",
                }}>
                    <div style={{
                        color: "#468BB6",
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}>
                        Place {place}
                    </div>
                    {(showMessage) &&
                    <div style={{
                        color: "#7F8184",
                        fontSize: "1.3rem",
                    }}>
                        Votre place a bien été réservée !
                    </div>}
                </div>
                <LeaveButton onPress={() => leavePlace()} />
            </div>
        );
    }
};

type ProfileScreenState = {
    name: string,
    fname: string,
    id: string,
    place: string,
    debug?: Array<any> | string,
    isWrongFormatPlace: boolean
    placeInput: string
    // Socket comment
    // socket: any
    isScanning: boolean
    historical: Array<any>
    recentlyOccupied: boolean
};

interface ProfileScreenProps {
    history: any
    location: any
    setTitle: any
}

class ProfileScreen extends React.Component<ProfileScreenProps, ProfileScreenState> {
    constructor(props) {
        super(props);
        this.state = {
            placeInput: "",
            // Socket comment
            // socket: socketIOClient(server.sockets),
            name: "",
            fname: "",
            id: "",
            place: "",
            isWrongFormatPlace: false,
            isScanning: false,
            historical: [],
            recentlyOccupied: false,
        };
        // Socket comment
        // this.state.socket.on('leavePlace', () => this.leavePlace());
        props.setTitle("Ma place")
    }

    // Socket comment
    // exclude = ["socket", "isWrongFormatPlace", "isScanning", "placeInput", "recentlyOccupied"]

    exclude = ["isWrongFormatPlace", "isScanning", "placeInput", "recentlyOccupied"]

    componentDidMount = async () => {
        const user = localStorage.getItem("USER")
        if (!user) this.props.history.push("/login")
        else {
            const result = JSON.parse(user);
            // Socket comment
            // if (result.place || result.pool)
            //     this.state.socket.emit('checkPlace', result.id, result.place, config._id);
            await this.setState(result);
            this.takePlaceExternal()
            this.redirect()
        }
    };

    takePlaceExternal = () => {
        const cond = (place, location) => location.state && location.state.place && place !== location.state.place
        if (cond(this.state.place, this.props.location)) {
            this.takePlace(this.props.location.state.place)
        }
    }

    takePlace = async place => !this.state.place && await this.insertPlace(place)

    redirect() {
        const { place, historical } = this.state
        const pathname = this.props.location.pathname
        console.log("pathname : "+pathname);
        console.log("place : "+place);
        console.log("historical : "+historical);

        if (pathname !== "/home") return
        console.log("HOHOHOHOHOHOHOH");
        const goTo = x => (x !== pathname) && this.props.history.push(x)

        if (place) goTo("/home/leave")
        else if (historical && historical.length > 0) goTo("/home/history")
        else if (isMobile()) goTo("/home/scan")
        else goTo("/home/input")
    }

    insertPlace = async (placeText) => {
        if (this.state.isScanning) return false
        this.setState({ isScanning: true })
        try {
            await takePlace(this.state.id, placeText)
            this.setState({
                place: placeText,
                isWrongFormatPlace: false
            });
            // Socket comment
            // this.state.socket.emit('joinRoom', placeText);
            this.setState({ recentlyOccupied: true, historical: this.state.historical.concat([{id_place: placeText}]) })
            localStorage.setItem("USER", JSON.stringify(omit(this.exclude, this.state)))
            this.props.history.push("/home/leave")
            this.setState({ isScanning: false })
            return true
        } catch (err) {
            switch (err.message) {
                case "WrongFormatPlace":
                    this.setState({ isWrongFormatPlace: true }); break
                case "AlreadyTaken":
                    alert(`Impossible, Place déjà utilisée par : ${err.user.fname} ${err.user.name}`); break
                default:
                    alert("Erreur inconnu"); break
            }
            this.setState({ isScanning: false })
            return false
        }
    }

    onRead = data => {
        if (data) {
            this.insertPlace(data);
        }
    };

    leavePlace = () => {
        const { id, place } = this.state;

        const payload = {
            id_user: id,
            id_place: place
        };

        fetch(`${server.address}places/leave`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${config.token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        place: ""
                    });
                    localStorage.setItem("USER", JSON.stringify(omit(this.exclude, this.state)))
                    // Socket comment
                    //this.state.socket.emit('leaveRoom', place);
                    this.props.history.push("/home")
                    this.redirect()
                }
                else if (res.status === 400) {
                    res.text().then(message => console.log(message));
                }
            });
    }

    render() {
        const {
            fname,
            name,
            isWrongFormatPlace,
            place,
            placeInput,
            recentlyOccupied,
            historical,
        } = this.state

        console.log(this.state, this.props)
        /*
        if (place){
            const pathname = this.props.location.pathname
            const goTo = x => (x !== pathname) && this.props.history.push(x)
            goTo("/home/leave")
        }*/
        
        /*
        const pathname = this.props.location.pathname
        const goTo = x => (x !== pathname) && this.props.history.push(x)
        if (place) {
            goTo("/home/leave")
            return
        }else{*/
            return (
                <div style={styles.view}>
                    <Switch>
                        <Route path="/home/leave" render={() =>
                            <LeaveComponent name={name} fname={fname} place={place} leavePlace={this.leavePlace} showMessage={recentlyOccupied} />
                        }
                        />
                        <Route>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                fontFamily: "Raleway",
                                maxWidth: 900,
                                alignSelf: "center"
                            }}>
                                <NavElem to="/home/scan" src="" border>Scan du <br></br> QR Code</NavElem>
                                <NavElem to="/home/input" src="" border>Saisie <br></br> Manuelle</NavElem>
                                <NavElem to="/home/history" src="" border>Mes dernières <br></br> places</NavElem>
                            </div>
                            <HeaderCard fname={fname} name={name} />
                            <Route path="/home/scan" render={() =>
                                <QRCodeComponent onRead={this.onRead} />
                            }
                            />
                            <Route path="/home/input" render={() =>
                                <ManualInsertionCard
                                    onChangeText={e => this.setState({ placeInput: e.target.value.toUpperCase().trim() })}
                                    placeInput={placeInput}
                                    onSubmitEditing={() => this.insertPlace(this.state.placeInput)}
                                    onPress={() => this.insertPlace(this.state.placeInput)}
                                />
                            }
                            />
                            <Route path="/home/history" render={() =>
                                <History historical={historical} takePlace={this.takePlace} />
                            }
                            />
                            {isWrongFormatPlace && (
                                <p style={styles.debug}>Mauvais format de place</p>
                            )}
                        </Route>
                    </Switch>
                </div>
                )
        //}

    }
}

export default withRouter(ProfileScreen)
