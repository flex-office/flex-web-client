import React from "react"

interface FilePickerProps {
    type: string
    onChange: any
}

export default class FilePicker extends React.Component<FilePickerProps> {
    inputRef: any

    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    handleChange = async (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => this.props.onChange(reader.result)
        reader.onerror = err => console.error(err)
    }

    render() {
        const { children } = this.props
        return (
            <div style={{ cursor: "pointer", display: "flex" }} onClick={() => this.inputRef.current.click()}>
                <input
                    onChange={this.handleChange}
                    ref={this.inputRef}
                    style={{ display: "none" }}
                    accept={this.props.type}
                    type="file"
                />
                {children}
            </div>
        )
    }
}