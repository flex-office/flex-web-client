import React from "react"
import QrReader from "react-qr-reader"
import { withRouter } from "react-router-dom"
import { omit } from "ramda"
import config from "../../config/api.json";
import server from "../../config/server.json";
import regex from "../../config/regex.json";
import styles from "./ProfileScreenStyles";
import socketIOClient from "socket.io-client";
import HeaderCard from "../../components/Profile/HeaderCard"
import LeaveButton from "../../components/Profile/LeaveButton"
import ManualInsertionCard from "../../components/Profile/ManualInsertionCard"

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

    componentDidMount = () => {
        const user = localStorage.getItem("USER")
        if (!user) this.props.history.push("/login")
        else {
            const result = JSON.parse(user);
            if (result.place || result.pool)
                this.state.socket.emit('checkPlace', result.id, result.place, config._id);
            this.setState(result);
        }
    };

    DefaultComponent = () => {
        const {
            fname,
            name,
            id,
            isWrongFormatPlace,
        } = this.state;

        const insertPlace = (placeText) => {
            if (placeText !== "" && placeText.match(regex.placeRegex) !== null) {
                if (this.state.isScanning) return
                const payload = {
                    id_user: id,
                    id_place: placeText
                };

                this.setState({ isScanning: true })
                fetch(`${server.address}take_place`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${config.token}`
                    },
                    body: JSON.stringify(payload)
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                place: placeText,
                                isWrongFormatPlace: false
                            });
                            this.state.socket.emit('joinRoom', placeText);
                            localStorage.setItem("USER", JSON.stringify(omit(["socket"], this.state)))
                        }
                        else if (res.status === 500) {
                            res.json().then(user => {
                                alert(`Impossible, Place déjà utilisée par : ${user.fname} ${user.name}`);
                            })
                        }
                        this.setState({ isScanning: false })
                    });
            } else this.setState({ isWrongFormatPlace: true });
        }

        const onRead = data => {
            if (data) {
                insertPlace(data);
            }
        };

        return (
            <div style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                display: "flex",
                width: "100%",
            }}>
                <HeaderCard fname={fname} name={name} id={id} />
                <QrReader
                    onError={err => console.log(err)}
                    onScan={onRead}
                    style={{width: "100%", maxWidth: "45rem"}}
                />
                <ManualInsertionCard
                    onChangeText={e => this.setState({placeInput: e.target.value.toUpperCase().trim()})}
                    onSubmitEditing={() => insertPlace(this.state.placeInput)}
                    onPress={() => insertPlace(this.state.placeInput)}
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
            <div
                style={{
                    backgroundColor: "white",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "100%"
                }}
            >
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