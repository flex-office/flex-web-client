import React from "react"

const styles = {
    input: {
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: "lightgrey",
        margin: 10
    }
}

interface InputProps {
    onChange: any
    onSubmit: any
    placeholder: string
    ariaLabel?: string
}

export default class Input extends React.Component<InputProps> {
    handleEnterPress = (e) => {
        if (e.key === "Enter") {
            this.props.onSubmit()
        }
    }

    render() {
        const { onChange, onSubmit, placeholder, ariaLabel } = this.props
        return (
            <input
                aria-label={ariaLabel || "An input"}
                onKeyPress={this.handleEnterPress}
                onSubmit={onSubmit}
                style={styles.input}
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />
        )
    }
}
