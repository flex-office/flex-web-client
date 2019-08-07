import React from "react"
import { NavLink } from 'react-router-dom'
import Radium, { Style } from "radium"

const styles = {
    navLink: {
        width: "100%",
        alignSelf: "center",
        color: "#979797",
        textAlign: "center",
    },
}

interface NavElemProps {
    to: string
    src: string
    unactiveSrc?: string
    exact?: boolean
    border?: boolean
}

export default class NavElem extends React.Component<NavElemProps> {
    render() {
        const {border} = this.props

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Raleway",
                fontSize: "0.8rem",
                flex: 1,
                // color: "#3662A0",
            }}>
            <Style scopeSelector='a:hover' rules={{
                textDecoration: "none"
            }} />
            {(this.props.src || this.props.unactiveSrc) ?
            <NavLink to={this.props.to}
                exact={this.props.exact}
                style={Object.assign({
                    height: "1.9rem",
                    background: `url(${this.props.unactiveSrc}) no-repeat 50%`,
                }, styles.navLink)}
                activeStyle={{
                    textDecoration: "none",
                    background: `url(${this.props.src}) no-repeat 50%`,
                    pointerEvents: "none",
                    textColor: "#979797",
                }}
            >
            </NavLink>
            : null}
            <NavLink to={this.props.to}
                exact={this.props.exact}
                style={styles.navLink}
                activeStyle={Object.assign({
                    textDecoration: "none",
                    color: "#1B3F7B",
                }, (border) ? {
                    borderBottom: "solid" as "solid",
                    borderWidth: 1.5,
                    textDecoration: "none",
                    paddingBottom: "0.4rem",
                    pointerEvents: "none",
                    fontWeight: 600,
                } : {})}
            >
                {this.props.children}
            </NavLink>
            </div>
        )
    }
}