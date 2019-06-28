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
    onChange: any,
    onSubmit: any,
    placeholder: string
}

export default class Input extends React.Component<InputProps> {
    handleEnterPress = (e) => {
        if (e.key === "Enter") {
            this.props.onSubmit()
        }
    }

    render() {
        const { onChange, placeholder } = this.props
        return (
            <input
                onKeyPress={this.handleEnterPress}
                style={styles.input}
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />
        )
    }
}
