import React from "react"
import { withRouter } from "react-router-dom"
import { omit } from "ramda"
import config from "../../config/api.json";
import server from "../../config/server.json";
import styles from "./ProfileScreenStyles";
import socketIOClient from "socket.io-client";
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
}

export class LeaveComponent extends React.Component<LeaveComponentProps> {
    render () {
        const { place, leavePlace, showMessage } = this.props;

        return (
            <div style={styles.leave_button}>
                {(showMessage) ?
                <div style={{color: "#7F8184"}}>Votre place a bien été réservée !</div>
                : null}
                <LeaveButton place={place} onPress={() => leavePlace()} />
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
    socket: any
    isScanning: boolean
    historical: Array<any>
    recentlyOccupied: boolean
};

interface ProfileScreenProps {
    history: any
    location: any
}

class ProfileScreen extends React.Component<ProfileScreenProps, ProfileScreenState> {
    constructor() {
        super(undefined);
        this.state = {
            placeInput: "",
            socket: socketIOClient(server.sockets),
            name: "",
            fname: "",
            id: "",
            place: "",
            isWrongFormatPlace: false,
            isScanning: false,
            historical: [],
            recentlyOccupied: false,
        };
        this.state.socket.on('leavePlace', () => this.leavePlace());
    }

    exclude = ["socket", "isWrongFormatPlace", "isScanning", "placeInput", "recentlyOccupied"]

    componentDidMount = async () => {
        const user = localStorage.getItem("USER")
        if (!user) this.props.history.push("/login")
        else {
            const result = JSON.parse(user);
            if (result.place || result.pool)
                this.state.socket.emit('checkPlace', result.id, result.place, config._id);
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

    takePlace = async place => {
        if (!this.state.place) {
            if (await this.insertPlace(place)) return true
            return false
        }
        return false
    }

    redirect() {
        if (this.props.location.pathname !== "/home") return
        const { place, historical } = this.state
        const goTo = x => this.props.history.push(x)

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
            this.state.socket.emit('joinRoom', placeText);
            localStorage.setItem("USER", JSON.stringify(omit(this.exclude, this.state)))
            this.setState({recentlyOccupied: true})
            this.props.history.push("/home/leave")
            this.setState({ isScanning: false })
            return true
        } catch (err) {
            switch(err.message) {
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

        fetch(`${server.address}leave_place`, {
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
                    this.state.socket.emit('leaveRoom', place);
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
            id,
            isWrongFormatPlace,
            place,
            placeInput,
            recentlyOccupied,
            historical,
        } = this.state

        return (
            <div style={styles.view}>
                <Switch>
                    <Route path="/home/leave" render={ () =>
                        <LeaveComponent place={place} leavePlace={this.leavePlace} showMessage={recentlyOccupied}/>
                    }
                    />
                    <Route>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: 15,
                            marginBottom: 25,
                            width: "100%",
                            justifyContent: "center",
                           
                        }}>
                            <NavElem to="/home/scan" icon="">Scan du <br></br> QR Code</NavElem>
                            <NavElem to="/home/input" icon="">Saisie <br></br> Manuelle</NavElem>
                            <NavElem to="/home/history" icon="">Mes dernières <br></br> places</NavElem>
                        </div>
                        <HeaderCard fname={fname} name={name} id={id} />
                        <Route path="/home/scan" render={ () =>
                            <QRCodeComponent onRead={this.onRead}/>
                        }
                        />
                        <Route path="/home/input" render={ () =>
                            <ManualInsertionCard
                                onChangeText={e => this.setState({placeInput: e.target.value.toUpperCase().trim()})}
                                placeInput={placeInput}
                                onSubmitEditing={() => this.insertPlace(this.state.placeInput)}
                                onPress={() => this.insertPlace(this.state.placeInput)}
                            />
                        }
                        />
                        <Route path="/home/history" render={ () =>
                            <History historical={historical} takePlace={this.takePlace}/>
                        }
                        />
                        {isWrongFormatPlace ? (
                            <p style={styles.debug}>Mauvais format de place</p>
                        ) : null}
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ProfileScreen)
