import React from "react";
import { NavLink } from 'react-router-dom'
import Icon from "react-fontawesome"

const styles = {
    navLink: {
        alignItems: "center",
        color: "#7F8184",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        textAlign: "center",
        fontSize: 11,
        textDecoration: "none"
    },
}

interface NavElemProps {
    to: string
    icon: string
    exact?: boolean
}

export default class NavElem extends React.Component<NavElemProps> {
    render() {
        return (
            <NavLink to={this.props.to}
                exact={this.props.exact}
                style={styles.navLink}
                activeStyle={{
                    color: "#3662A0",
                    borderBottom : "solid #3662A0" as "solid #3662A0",
                    borderWidth: 1.5,
                    textDecoration: "none",
                    paddingBottom: 3,
                }}
            >
                <Icon
                    name={this.props.icon}
                    style={{ fontSize: 23 }}
                />
                {this.props.children}
            </NavLink>
        )
    }
}