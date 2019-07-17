import React, { InputHTMLAttributes } from "react"

const styles = {
    input: {
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: "lightgrey",
        margin: 10
    }
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSubmit?: any
    type?: string
    ariaLabel?: string
}

export default class Input extends React.Component<InputProps> {
    handleEnterPress = (e) => {
        if (e.key === "Enter") {
            this.props.onSubmit()
        }
    }

    render() {
        const { onSubmit, ariaLabel, type, ...rest } = this.props
        return (
            <input
                {...rest}
                aria-label={ariaLabel || "An input"}
                type={type || "text"}
                onKeyPress={this.handleEnterPress}
                onSubmit={onSubmit || (() => true)}
                style={styles.input}
            />
        )
    }
}
