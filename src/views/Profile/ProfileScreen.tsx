import React from "react"
import { withRouter } from "react-router-dom"
import { omit } from "ramda"
import config from "../../config/api.json";
import server from "../../config/server.json";
import styles from "./ProfileScreenStyles";
import socketIOClient from "socket.io-client";
import HeaderCard from "../../components/Profile/HeaderCard"
import LeaveButton from "../../components/Profile/LeaveButton"
import ManualInsertionCard from "../../components/Profile/ManualInsertionCard"
import QRCodeComponent from "../../components/Profile/QRCodeComponent";
import takePlace from "../../utils/takePlace";

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
            isScanning: false
        };
        this.state.socket.on('leavePlace', () => this.leavePlace());
    }

    componentDidMount = async () => {
        const user = localStorage.getItem("USER")
        if (!user) this.props.history.push("/login")
        else {
            const result = JSON.parse(user);
            if (result.place || result.pool)
                this.state.socket.emit('checkPlace', result.id, result.place, config._id);
            await this.setState(result);
            const cond = (place, location) => !place && location.state && location.state.place && place !== location.state.place
            if (cond(this.state.place, this.props.location)) {
                this.insertPlace(this.props.location.state.place)
            }
        }
    };

    insertPlace = async (placeText) => {
        if (this.state.isScanning) return
        this.setState({ isScanning: true })
        try {
            await takePlace(this.state.id, placeText)
            this.setState({
                place: placeText,
                isWrongFormatPlace: false
            });
            this.state.socket.emit('joinRoom', placeText);
            localStorage.setItem("USER", JSON.stringify(omit(["socket", "isWronngFormatPlace", "isScanning"], this.state)))
        } catch (err) {
            switch(err.message) {
                case "WrongFormatPlace":
                    this.setState({ isWrongFormatPlace: true }); break
                case "AlreadyUsed":
                    alert(`Impossible, Place déjà utilisée par : ${err.user.fname} ${err.user.name}`); break
                default:
                    alert("Erreur inconnu"); break
            }
        }
        this.setState({ isScanning: false })
    }

    DefaultComponent = () => {
        const {
            fname,
            name,
            id,
            isWrongFormatPlace,
        } = this.state;

        const onRead = data => {
            if (data) {
                this.insertPlace(data);
            }
        };

        return (
            <div style={styles.view}>
                <HeaderCard fname={fname} name={name} id={id} />
                <QRCodeComponent onRead={onRead}/>
                <ManualInsertionCard
                    onChangeText={e => this.setState({placeInput: e.target.value.toUpperCase().trim()})}
                    onSubmitEditing={() => this.insertPlace(this.state.placeInput)}
                    onPress={() => this.insertPlace(this.state.placeInput)}
                />
                {isWrongFormatPlace ? (
                    <p style={styles.debug}>Mauvais format de place</p>
                ) : null}
            </div>
        );
    };

    LeaveComponent = () => {
        const { place } = this.state;

        return (
            <div style={styles.leave_button}>
                <LeaveButton place={place} onPress={() => this.leavePlace()} />
            </div>
        );
    };

    Content = ({ place }) => {
        if (!place) {
            return <this.DefaultComponent />;
        }
        return <this.LeaveComponent />;
    };

    leavePlace() {
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
                    localStorage.setItem("USER", JSON.stringify(omit(["socket"], this.state)))
                    this.state.socket.emit('leaveRoom', place);
                }
                else if (res.status === 400) {
                    res.text().then(message => console.log(message));
                }
            });
    }

    render() {
        const { place } = this.state;

        return <this.Content place={place} />;
    }
}

export default withRouter(ProfileScreen)