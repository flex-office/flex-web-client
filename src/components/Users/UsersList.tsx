import React from "react"
import ListPlaces from "../../components/Users/ListPlaces"
import ListItem from "../../components/Users/ListItem"
import profileDefaultPic from "../../assets/profile.png";
import moment from "moment"
// import { isDeclareModuleExports } from "@babel/types";

interface UsersListProps {
    users: Array<any>
    search?: string
    filterItem?: any
    onClick?: any
    isFriend?: any
}

export default class UsersList extends React.Component<UsersListProps> {
    sortUsers = (a, b) => {
        const comp = b.isFriend - a.isFriend

        if (comp)
            return comp
        return a.name.localeCompare(b.name)
    }

    _handleList = () => {
        const { users, search } = this.props;

        if (users === [])
            return users
        users.sort(this.sortUsers);
        if (search === "")
            return users
        const upper = x => x.toUpperCase()
        return users.filter(e => upper(e.name).includes(upper(search)) || upper(e.fname).includes(upper(search)))
    };

    WEEK_DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

    getWeekDay = () => this.WEEK_DAYS[(new Date()).getDay()]

    isRemote = x => x.includes(this.getWeekDay())

    getDisplayDate = x => moment(x).format("DD.MM.YYYY")

    getAbsentMessage = x => `Absent jusqu'au ${this.getDisplayDate(x.end_date)}`

    listStrings = x => `${x.slice(0, -1).join(", ")} et ${x[x.length - 1]}`

    getRemoteDays = x => (x <= 1) ? x[0]
                            : this.listStrings(x.map(x => x.toLowerCase()))

    getRemoteMessage = x => `Télétravail : ${this.getRemoteDays(x.remoteDay)}`

    getStatus(user) {
        if (user.id_place) return user.id_place
        if (user.start_date && user.end_date && moment().isBetween(user.start_date, user.end_date)) return this.getAbsentMessage(user)
        if (this.isRemote(user.remoteDay)) return this.getRemoteMessage(user)
        return ""
    }

    render() {
        const { users } = this.props
        const filterItem = this.props.filterItem || (() => true)
        const onClick = this.props.onClick || (() => true)
        const isFriend = this.props.isFriend || (() => false)

        return (
            <div style={{ alignSelf: "stretch", width: "100%" }}>
                {users !== [] && users.length > 0 ? (
                <ListPlaces
                    handleList={this._handleList()}
                    build={item =>
                        item && filterItem(item) ? (
                        <div
                            key={item.id}
                            onClick={() => onClick(item)}
                            style={{cursor: "pointer", alignSelf: "center", border: "black"}}
                        >
                            {/* <Card containerStyle={{ borderRadius: 10 }}> */}
                            <ListItem
                                title={`${item.name} ${item.fname}`}
                                subtitle={this.getStatus(item)}
                                containerStyle={{ margin: 0, padding: 5 }}
                                titleStyle={{ fontFamily: "Raleway" }}
                                rightIcon={{
                                    name: "star",
                                    fa: isFriend(item),
                                    color: "#2E89AD"
                                }}
                                leftAvatar={{
                                    source: item.photo ? item.photo : profileDefaultPic,
                                    imageStyle: {
                                        resizeMode: "contain",
                                        backgroundColor: "white"
                                    },
                                    rounded: false
                                }}
                                bottomDivider={true}
                            />
                            {/* </Card> */}
                        </div>
                        ) : null
                    }
                />
                ) : null}
            </div>
        )
    }
}