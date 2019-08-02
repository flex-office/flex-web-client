import React from "react"
import logo from "../../assets/logo.png";
import ProfileImage from "./ProfileImage";
import { fetchPhoto } from "./reducer";
import { Link } from 'react-router-dom'

const styles = {
    container: {
        alignItems: "center",
        alignSelf: "flex-start",
        borderBottomStyle: "solid" as "solid",
        borderBottomWidth:2 ,
        borderColor: "#568AC4",
        display: "flex",
        flex: 1,
        flexDirection: "row" as "row",
        height: 55,
        justifyContent: "space-around",
        overflow: "hidden",
        position: "fixed" as "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "white"
      
    },
    text: {
        color: " #568AC4",
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
            <div style={{height: 55}}>
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
                    <div style={styles.text}>Flex-Office</div>

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
