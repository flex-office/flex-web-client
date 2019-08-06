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
        borderBottomWidth: 2,
        borderColor: "#76A6DC",
        // borderImage: "linear-gradient(to right, #58C0D0, #468BB6, #3662A0)",
        borderImageSlice: 1,
        display: "flex",
        flex: 1,
        flexDirection: "row" as "row",
        height: "4rem",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "fixed" as "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "white",
    },
    text: {
        color: "#568AC4",
        fontFamily: "Raleway",
        fontSize: "1.2rem",
        textAlign: "center" as "center",
        fontWeight: "bold" as "bold",
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
            <div style={{ height: "4.5rem"}}>
                <div style={styles.container}>
                    {/* Header Left */}
                    {(showLogo) ?
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                height: "1.5rem",
                                // paddingLeft: "1rem"
                            }}
                        /> : <div />}
                    <div style={styles.text}>
                        {title}
                    </div>

                    {/* Header Right */}
                    {(showProfilePic) ?
                        <Link to="/settings"
                            onClick={() => {
                                fetchUserPhoto();
                            }}
                            style={{
                                // paddingRight: "1rem"
                            }}
                        >
                            <ProfileImage />
                        </Link> : <div />}
                </div>
            </div>
        )
    }
};
