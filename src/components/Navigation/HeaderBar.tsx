import React from "react"
import logo from "../../assets/logo.png";
import ProfileImage from "./ProfileImage";
import { fetchPhoto } from "./reducer";
import { Link } from 'react-router-dom'

const styles = {
    container: {
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "white",
        borderBottomStyle: "solid" as "solid",
        borderBottomWidth: 7,
        borderImage: "linear-gradient(to right, #58C0D0, #468BB6, #3662A0)",
        borderImageSlice: 1,
        display: "flex",
        flex: 1,
        flexDirection: "row" as "row",
        height: 80,
        justifyContent: "space-between",
        overflow: "hidden",
        position: "fixed" as "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
    },
    text: {
        color: "black",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: 500,
    }
}

const fetchUserPhoto = async () => {
    const userPhoto = await localStorage.getItem("USER")
    if (!userPhoto) return

    fetchPhoto(userPhoto);

    return JSON.parse(userPhoto).photo;
};

interface HeaderBarProps {
    showLogo?: boolean,
    showProfilePic?: boolean,
}

export default class HeaderBar extends React.Component<HeaderBarProps> {
    static defaultProps = {
        showLogo: true,
        showProfilePic: true,
    }

    render() {
        const { showLogo, showProfilePic } = this.props
        return (
            <div style={{height: 80}}>
                <div style={styles.container}>
                    {/* Header Left */}
                    {(showLogo) ?
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            height: 30,
                            margin: 10,
                        }}
                    /> : <div />}
                    <div style={styles.text}>
                        Flex-Office
                    </div>

                    {/* Header Right */}
                    {(showProfilePic) ?
                    <Link to="/settings"
                        onClick={() => {
                            fetchUserPhoto();
                        }}
                    >
                        <ProfileImage />
                    </Link> : <div />}
                </div>
            </div>
        )
    }
};
