import React from "react";
import { NavLink } from 'react-router-dom'
import Icon from "react-fontawesome"

const styles = {
    navLink: {
        alignItems: "center",
        color: "#3662A0",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
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
                    color: "#58C0D0"
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