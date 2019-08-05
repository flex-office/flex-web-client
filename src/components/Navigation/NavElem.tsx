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
        fontSize: "0.9rem",
        textDecoration: "none",
        fontFamily: "Raleway",
    },
}

interface NavElemProps {
    to: string
    src: string
    exact?: boolean
    border?: boolean
}

export default class NavElem extends React.Component<NavElemProps> {
    render() {
        const {border} = this.props
        
        return (
            <NavLink to={this.props.to}
                exact={this.props.exact}
                style={styles.navLink}
                activeStyle={Object.assign({
                    color: "#3662A0",
                    textDecoration: "none",
                }, (border) ? {
                    borderBottom: "solid #3662A0" as "solid #3662A0",
                    borderWidth: 1.5,
                    textDecoration: "none",
                    paddingBottom: "0.4rem",
                    pointerEvents: "none",
                    fontWeight: 600,
                } : {})}
            >
                {(this.props.src) ? <img style={{height: "1.7rem"}} src={this.props.src} alt=""/> : null}
                
                {this.props.children}
            </NavLink>
        )
    }
}