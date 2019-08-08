import React from "react"

interface ListItemProps {
    title: string
    subtitle: string
    containerStyle: any
    titleStyle: any
    subtitleStyle: any
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
        justifyContent: "flex-start",
        alignSelf: "center",
        height: "4.5rem",
    },
    image: {
        maxWidth: "2.3rem",
        maxHeight: "2.3rem"
    },
    imageRight: {
        width: "1.7rem",
        marginLeft: "auto",
    },
    text: {
        color: "#295CB3",
        fontSize: "1rem",
        fontWeight: 600,
    }
}

export default class ListItem extends React.Component<ListItemProps> {
    render() {
        const {title, subtitleStyle, titleStyle, containerStyle, subtitle, rightIcon, leftAvatar, bottomDivider} = this.props
        return (
            <div style={Object.assign({...styles.container}, Object.assign({...containerStyle}, (bottomDivider) ? styles.dividerStyle : {}))}>
                <img src={leftAvatar.source} style={Object.assign({...styles.image}, leftAvatar.imageStyle)} alt="profile"/>
                <div style={{marginLeft: 10}}>
                    <div style={Object.assign({...styles.text}, titleStyle)}>{title}</div>
                    <div style={Object.assign({...styles.text}, subtitleStyle)}>{subtitle}</div>
                </div>
                <img src={(rightIcon.fa) ? rightIcon.sourceFa : rightIcon.source} style={Object.assign({...styles.image}, styles.imageRight)} alt="star"/>
                {/* <span className={((rightIcon.fa) ? "fa" : "far") + " fa-" + rightIcon.name} style={{ flex: 1, display: "flex", justifyContent: "flex-end", color: rightIcon.color }}/> */}
            </div>
        )
    }
}