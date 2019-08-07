import React from "react"
import { withRouter } from "react-router-dom"
import server from "../../config/server.json";
import config from "../../config/api.json";
import regex from "../../config/regex.json";
import styles from "./LoginScreenStyles";
import logo from "../../assets/logo.png";
import HeaderBar from "../../components/Navigation/HeaderBar";
import Input from "../../components/General/Input"
import FilePicker from "../../components/General/FilePicker"
import Button from "../../components/General/Button"

interface CompleteViewProps {
    onValidate: any
    email: string
}

interface CompleteViewState {
    id: string
    name: string
    fname: string
    photo: string
    errorID: string
    errorName: string
    errorFname: string
}

class CompleteView extends React.Component<CompleteViewProps, CompleteViewState> {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            fname: "",
            photo: "",
            errorID: "",
            errorName: "",
            errorFname: "",
        }
    }

    capitalizeFirstLetter = x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()

    validateID = x => x.match(regex.idRegex) !== null

    onSubmit = async () => {
        const {id, name, fname, photo} = this.state
        const {email} = this.props

        this.setState({errorID: "", errorName: "", errorFname: ""})
        if (!id || !this.validateID(id))
            return this.setState({errorID: "ID invalide"})
        if (!name)
            return this.setState({errorName: "Veuillez saisir votre nom"})
        if (!fname)
            return this.setState({errorFname: "Veuillez saisir votre prénom"})

        const payload = {
            id_user: id,
            name,
            fname,
            photo,
            email,
        }

        try {
            const res = await fetch(`${server.address}complete_user`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`
                }
            })
            if (res.status !== 200) return this.setState({errorID: "Problème d'authentification"})
            const user = await res.json()
            localStorage.setItem("USER", JSON.stringify(user))
            this.props.onValidate()
        } catch (_) {
            return this.setState({errorID: "Problème d'authentification"})
        }
    }

    render() {
        const { errorID, errorName, errorFname } = this.state

        return (
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column" as "column",
                alignItems: "center",
                justifyContent: "space-around",
            }}>
                <Input
                    style={{
                        width: "75%",
                        maxWidth: "40rem",
                        justifySelf: "flex-start",
                    }}
                    onSubmit={this.onSubmit}
                    onChange={e => this.setState({ name: this.capitalizeFirstLetter(e.target.value) })}
                    value={this.state.name}
                    error={errorName}
                    placeholder="Nom"
                    clearable
                />
                <Input
                    style={{
                        width: "75%",
                        maxWidth: "40rem",
                        justifySelf: "flex-start",
                    }}
                    onSubmit={this.onSubmit}
                    onChange={e => this.setState({ fname: this.capitalizeFirstLetter(e.target.value) })}
                    value={this.state.fname}
                    error={errorFname}
                    placeholder="Prénom"
                    clearable
                />
                <Input
                    style={{
                        width: "75%",
                        maxWidth: "40rem",
                        justifySelf: "flex-start",
                    }}
                    onSubmit={this.onSubmit}
                    onChange={e => this.setState({ id: e.target.value.toUpperCase() })}
                    value={this.state.id}
                    error={errorID}
                    placeholder="ID format: XX00000"
                    clearable
                />
                <FilePicker
                    type="image/jpeg"
                    onChange={async image => this.setState({photo: image})}
                >
                    <Button
                        style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            backgroundColor: "#E64417",
                            fontSize: "1.1rem",
                        }}
                    >
                        Importer une photo de profil
                    </Button>
                </FilePicker>
                <Button
                    style={{
                        paddingLeft: 45,
                        paddingRight: 45,
                    }}
                    onClick={this.onSubmit}
                >
                    S'identifier
                </Button>
            </div>
        )
    }
}

interface VerificationViewProps {
    onValidate: any
}

interface VerificationViewState {
    user: any
}

class VerificationView extends React.Component<VerificationViewProps, VerificationViewState> {
    validate = async (code) => {
        const payload = {
            code
        }

        try {
            const res = await fetch(`${server.address}verify`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`
                }
            })
            if (res.status !== 200) return false
            const user = await res.json()
            localStorage.setItem("USER", JSON.stringify(user))
            await this.setState({user})
            return true
        } catch (_) {
            return false
        }
    }

    render() {
        return (
            <CommonView
                validate={this.validate}
                onValidate={() => this.props.onValidate(this.state.user)}
                errorMessage="Code non valide"
                title="Code"
                text="Valider"
                inputType="number"
            />
        )
    }
}

interface SendVerifViewProps {
    onValidate: any
}

interface SendVerifViewState {
    email: string
}

class SendVerifView extends React.Component<SendVerifViewProps, SendVerifViewState> {
    constructor(props) {
        super(props)
        this.state = {
            email: ""
        }
    }

    validate = async (email) => {
        if (/*!(/@bred.fr$/.test(email))*/false) return false
        const payload = {
            email
        }

        try {
            const res = await fetch(`${server.address}login_user`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`
                }
            })
            if (res.status !== 200) return false
            await this.setState({email})
            return true
        } catch (_) {
            return false
        }
    }

    render() {
        return (
            <CommonView
                validate={this.validate}
                onValidate={() => this.props.onValidate(this.state.email)}
                errorMessage="Adresse mail non valide"
                title="Adresse mail BRED"
                text="Envoyer le code"
                inputType="text"
            />
        )
    }
}

interface CommonViewProps {
    validate: any
    onValidate: any
    errorMessage: string
    title: string
    text: string
    inputType: string
}

interface CommonViewState {
    value: string
    error: string
}

class CommonView extends React.Component<CommonViewProps, CommonViewState> {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            error: "",
        }
    }

    onSubmit = async () => {
        const { validate, onValidate } = this.props
        if (await validate(this.state.value)) {
            this.setState({error: ""})
            onValidate()
        } else {
            this.setState({error: this.props.errorMessage})
        }
    }

    render() {
        const { error } = this.state

        return (
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column" as "column",
                alignItems: "center",
                justifyContent: "space-around",
            }}>
                <Input
                    style={{
                        width: "75%",
                        maxWidth: "40rem",
                        justifySelf: "flex-start",
                    }}
                    onSubmit={this.onSubmit}
                    onChange={e => this.setState({ value: e.target.value })}
                    error={error}
                    placeholder={this.props.title}
                    type={this.props.inputType}
                    clearable
                />
                <Button
                    onClick={this.onSubmit}
                >
                    {this.props.text}
                </Button>
            </div>
        )
    }
}

interface LoginScreenState {
    firstDone: boolean
    secondDone: boolean
    email: string
}

interface LoginScreenProps {
    history: any
}

class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
    constructor(props) {
        super(props);
        this.state = {
            firstDone: false,
            secondDone: false,
            email: "",
        }
    }

    // this.setState({ debugField: "Problème d'authentification" });
    // this.setState({ debugField: "Erreur de saisie" });

    thirdStage = () => {
        this.props.history.push("/")
    }

    secondStage = (user) => {
        if (user.id && user.name && user.fname)
            this.props.history.push("/")
        else
            this.setState({secondDone: true})
    }

    firstStage = (email) => {
        this.setState({firstDone: true, email})
    }

    render() {
        const { firstDone, secondDone, email } = this.state;
        return (
            <div style={{height: "100%"}}>
                <HeaderBar title="Flex-Office" showLogo={false} showProfilePic={false}/>
                <div style={styles.view}>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img src={logo} style={{width: "40%"}} alt="logo" />
                    </div>
                    <div style={styles.view_second}>
                        {(secondDone) ?
                        <CompleteView onValidate={this.thirdStage} email={email}/>
                        : (firstDone) ?
                        <VerificationView onValidate={this.secondStage}/>
                        : <SendVerifView onValidate={this.firstStage}/>
                        }
                    </div>
                    <div style={{flex: 1}}/>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginScreen)