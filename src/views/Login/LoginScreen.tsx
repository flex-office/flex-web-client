import React from "react"
import { withRouter } from "react-router-dom"
import server from "../../config/server.json";
import config from "../../config/api.json";
import regex from "../../config/regex.json";
import styles from "./LoginScreenStyles";
import LoginButton from "../../components/Login/LoginButton";
import InputLogin from "../../components/Login/InputLogin";
import logo from "../../assets/logo.png";
import HeaderBar from "../../components/Navigation/HeaderBar";

interface LoginScreenState {
    debugField: string
    name: string
    fname: string
    id: string
}

interface LoginScreenProps {
    history: any
}

class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
    constructor() {
        super(undefined);
        this.state = {
            debugField: "",
            name: "",
            fname: "",
            id: ""
        }
    }

    capitalizeFirstLetter(x) {
        return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
    }

    /** This function handle the user login */
    logIn() {
        if (
            this.state.name !== "" &&
            this.state.fname !== "" &&
            this.state.id !== "" &&
            this.state.id.match(regex.idRegex) !== null
        ) {
            const payload = {
                name: this.state.name,
                fname: this.state.fname,
                id_user: this.state.id
            };

            fetch(`${server.address}login_user`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(user => {
                            localStorage.setItem("USER", JSON.stringify({
                                id: this.state.id,
                                name: this.state.name,
                                fname: this.state.fname,
                                place: user.id_place,
                                historical: user.historical,
                                photo: user.photo,
                                remoteDay: user.remoteDay,
                                pool: user.pool
                            }));
                            this.props.history.push("/")
                        });
                    }
                    else if (res.status === 400) {
                        this.setState({ debugField: "Problème d'authentification" });
                        res.text().then(message => console.log(message));
                    }
                    else if (res.status === 500) {
                        this.setState({ debugField: "Problème d'authentification" });
                        res.text().then(message => console.log(message));
                    }
                })
        }
        else {
            this.setState({ debugField: "Problème d'authentification" });
        }
    }

    render() {
        const { debugField } = this.state;
        return (
            <div>
                <HeaderBar showLogo={false} showProfilePic={false}/>
                <div style={styles.view}>
                    <img src={logo} style={{width: "8%"}} alt="logo" />
                    <div style={styles.view_second}>
                        <InputLogin
                            onSubmitEditing={() => this.logIn()}
                            onChangeText={e => this.setState({name: this.capitalizeFirstLetter(e.target.value).trim()})}
                            onChangeText1={e => this.setState({fname: this.capitalizeFirstLetter(e.target.value).trim()})}
                            onChangeText2={e => this.setState({id: e.target.value.toUpperCase().trim()})}
                        />
                        <LoginButton onPress={() => this.logIn()} />
                        <p style={styles.debug}>{debugField}</p>
                    </div>
                    {/* <p style={styles.version}>{DeviceInfo.getVersion()}</p> */}
                </div>
            </div>
        );
    }
}

export default withRouter(LoginScreen)