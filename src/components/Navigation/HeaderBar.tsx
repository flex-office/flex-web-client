import React from "react"
import logo from "../../assets/logo.png";
import ProfileImage from "./ProfileImage";
import { fetchPhoto } from "./reducer";
import { Link } from 'react-router-dom'

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
            <div
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    display: "flex",
                    backgroundColor: "white",
                    height: 80,
                    borderBottomWidth: 7,
                    borderBottomStyle: "solid",
                    borderImage: "linear-gradient(to right, #58C0D0, #468BB6, #3662A0)",
                    borderImageSlice: 1
                }}
            >
                {/* Header Left */}
                {(showLogo) ? <img
                    src={logo}
                    alt="logo"
                    style={{
                        height: 30,
                        margin: 10,
                    }}
                /> : <div />}
                <div
                    style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 20,
                        fontFamily: "Roboto"
                    }}
                >
                    Flex-Office
                </div>

                {/* Header Right */}
                {(showProfilePic) ? <Link to="/settings"
                    onClick={() => {
                        fetchUserPhoto();
                    }}
                >
                    <ProfileImage />
                </Link> : <div />}
            </div>
        )
    }
};
