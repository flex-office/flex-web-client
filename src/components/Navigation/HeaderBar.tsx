import React from "react"
import logo from "../../assets/logo.png";
import ProfileImage from "./ProfileImage";
import { fetchPhoto } from "./reducer";
import { Link } from 'react-router-dom'

const styles = {
    container: {
        alignItems: "center",
        display: "flex",
        height: "4rem",
        justifyContent: "space-between",
        maxWidth: 800,
        width: "100%",
        // zIndex: 100,
    },
    text: {
        color: "#1B3F7B",
        fontFamily: "Raleway",
        fontSize: "1.2rem",
        textAlign: "center" as "center",
        fontWeight: "bold" as "bold",
        width : "100%"
    }
}

const fetchUserPhoto = async () => {
    const userPhoto = await localStorage.getItem("USER")
    if (!userPhoto) return

    fetchPhoto(userPhoto);

    return JSON.parse(userPhoto).photo;
};

interface HeaderBarProps {
    title: string
    showLogo?: boolean,
    showProfilePic?: boolean,
}

export default class HeaderBar extends React.Component<HeaderBarProps> {
    static defaultProps = {
        showLogo: true,
        showProfilePic: true,
    }

    render() {
        const { showLogo, showProfilePic, title } = this.props
        return (
            <div style={{
                height: "4.5rem",
            }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid" as "2px solid",
                borderBottomColor: "#1B3F7B",
                position: "fixed" as "fixed",
                background: "white",
                width: "100%",
                zIndex: 100,
            }}>
                <div style={styles.container}>
                    {/* Header Left */}
                    {(showLogo) &&
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                width: "6.1rem",
                                paddingLeft: "2rem",
                            }}
                        />}
                    <div style={styles.text}>
                        {title}
                    </div>

                    {/* Header Right */}
                    {(showProfilePic) &&
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "6.1rem",
                                paddingRight: "2rem"
                            }}>
                            <Link to="/settings"
                                onClick={() => {
                                    fetchUserPhoto();
                                }}
                            >
                                <ProfileImage />
                            </Link>
                        </div>}
                </div>
            </div >
            </div >
        )
    }
};
