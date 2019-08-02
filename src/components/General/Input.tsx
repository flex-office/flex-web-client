import React, { InputHTMLAttributes } from "react"

const styles = {
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "#568AC4",
        borderStyle: "solid",
        alignSelf: "stretch",
        fontFamily: "Raleway",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
    },
    container: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
    }
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSubmit?: any
    type?: string
    ariaLabel?: string
    error?: string
    style?: any
    clearable?: boolean
}

export default class Input extends React.Component<InputProps> {
    inputRef: any

    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    handleEnterPress = (e) => {
        // console.log(this.inputRef.current)
        if (e.key === "Enter") {
            this.props.onSubmit()
        }
    }

    errorView(error) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row" as "row",
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                fontFamily: "Raleway",
            }}>
                <div style={{
                    color: "#C90000"
                }}>
                    {error}
                </div>
            </div>
        )
    }

    render() {
        const { onSubmit, ariaLabel, type, style, error, clearable, ...rest } = this.props
        return (
            <div
                style={Object.assign({...styles.container}, style || {})}
            >
                <div
                    style={styles.input}
                >
                    <input
                        {...rest}
                        aria-label={ariaLabel || "An input"}
                        type={type || "text"}
                        onKeyPress={this.handleEnterPress}
                        onSubmit={onSubmit || (() => true)}
                        ref={this.inputRef}
                        style={{
                            border: "none",
                            outline: "none",
                            flex: 1,
                        }}
                    />
                    {clearable ? (
                    <span
                        style={{
                            cursor: "pointer",
                            color: "#6C99CB",
                        }}
                        onClick={() => this.inputRef.current.value = ""}
                    >
                        X
                    </span>
                    ) : <div/>}
                </div>
                {error ? this.errorView(error) : <div/>}
            </div>
        )
    }
}
