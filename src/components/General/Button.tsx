import React, { ButtonHTMLAttributes } from "react"

const styles = {
    button: {
        fontFamily: "Raleway",
        backgroundColor: "#568AC4",
        borderRadius: 9,
        border: 0,
        color: "white",
        padding: 12,
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
    }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    style?: any
}

export default class Button extends React.Component<ButtonProps> {

    render() {
        const { style, ...rest } = this.props
        return (
            <button
                {...rest}
                style={Object.assign({...styles.button}, style)}
            >
                {this.props.children}
            </button>
        )
    }
}
