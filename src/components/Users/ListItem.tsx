import React from "react"

interface ListItemProps {
    title: string
    subtitle: string
    containerStyle: any
    titleStyle: any
    rightIcon: any
    leftAvatar: any
    bottomDivider: boolean
}

const styles = {
    dividerStyle: {
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#7F8184"
    },
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },
    image: {
        width: 30,
        height: 30
    },
    text: {
        color: "#568AC4",
        fontSize: 14
    }
}

export default class ListItem extends React.Component<ListItemProps> {
    render() {
        const {title, titleStyle, containerStyle, subtitle, rightIcon, leftAvatar, bottomDivider} = this.props
        return (
            <div style={Object.assign({...styles.container}, Object.assign({...containerStyle}, (bottomDivider) ? styles.dividerStyle : {}))}>
                <img src={leftAvatar.source} style={Object.assign({...styles.image}, leftAvatar.imageStyle)} alt="profile"/>
                <div style={{marginLeft: 10}}>
                    <div style={Object.assign({...styles.text}, titleStyle)}>{title}</div>
                    <div style={Object.assign({...styles.text}, titleStyle)}>{subtitle}</div>
                </div>
                <span className={((rightIcon.fa) ? "fa" : "far") + " fa-" + rightIcon.name} style={{ flex: 1, display: "flex", justifyContent: "flex-end", color: rightIcon.color }}/>
            </div>
        )
    }
}