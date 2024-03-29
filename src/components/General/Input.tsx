import React, { InputHTMLAttributes } from "react"
import Radium, { Style } from "radium"

const styles = {
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "#295CB3",
        borderStyle: "solid",
        alignSelf: "stretch",
        fontFamily: "Raleway",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
        fontSize: "0.8rem"
    },
    container: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        borderColor: "#E64417",
        // margin: 10,
        width: "90%",
        // paddingTop: 90,
        outlineWidth: 0,
        fontColor: "#979797",
        fontSize: "0.9rem",
        maxWidth: 300,
    },

}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSubmit?: any
    type?: string
    ariaLabel?: string
    error?: string
    style?: any
    clearable?: boolean
    onClickOnX?: any
}

class Input extends React.Component<InputProps> {
    inputRef: any

    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    handleEnterPress = (e) => {
        if (e.key === "Enter") {
            this.props.onSubmit()
        }
    }

    handleClickOnX = () => {
        this.inputRef.current.value = "";
        this.props.onClickOnX();
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
        const { onSubmit, ariaLabel, type, style, error, clearable, onClickOnX, ...rest } = this.props
        return (
            <div
                style={Object.assign({ ...styles.container }, style || {})}
            >
                <div
                    style={styles.input}
                >
                    <Style scopeSelector='.my-input::placeholder' rules={{
                        color: '#7F8184'
                    }} />
                    <Style scopeSelector='input[type=number]::-webkit-outer-spin-button,
                            input[type=number]::-webkit-inner-spin-button' rules={{
                                '-webkit-appearance': 'none',
                                margin: 0
                    }} />
                    <Style scopeSelector='input[type=number]' rules={{
                                '-moz-appearance':'textfield'
                    }} />
                    <input
                        {...rest}
                        className="my-input"
                        aria-label={ariaLabel || "An input"}
                        type={type || "text"}
                        onKeyPress={this.handleEnterPress}
                        onSubmit={onSubmit || (() => true)}
                        ref={this.inputRef}
                        style={{
                            border: "none",
                            outline: "none",
                            fontSize: "1rem",
                            flex: 1,
                            
                        }}
                    />
                    {clearable && (
                        <span
                            style={{
                                cursor: "pointer",
                                color: "#295CB3",
                            }}
                            onClick={this.handleClickOnX}
                        >
                            X
                    </span>
                    )}
                </div>
                {error && this.errorView(error)}
            </div>
        )
    }
}

export default Radium(Input)