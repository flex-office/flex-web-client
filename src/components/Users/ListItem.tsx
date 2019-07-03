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
        borderBottomColor: "lightgrey"
    },
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    image: {
        width: 50,
        height: 50
    }
}

export default class ListItem extends React.Component<ListItemProps> {
    render() {
        const {title, titleStyle, containerStyle, subtitle, rightIcon, leftAvatar, bottomDivider} = this.props
        return (
            <div style={Object.assign(Object.assign({...containerStyle}, (bottomDivider) ? styles.dividerStyle : {}), styles.container)}>
                <img src={leftAvatar.source} style={Object.assign({...styles.image}, leftAvatar.imageStyle)} alt="profile"/>
                <div style={titleStyle}>{title}</div>
                <div style={titleStyle}>{subtitle}</div>
                <span className={((rightIcon.fa) ? "fa" : "far") + " fa-" + rightIcon.name} style={{ flex: 1, display: "flex", justifyContent: "flex-end", color: rightIcon.color }}/>
            </div>
        )
    }
}