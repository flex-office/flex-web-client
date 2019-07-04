import React from "react"
import { append, filter } from "ramda";
import { withRouter } from "react-router-dom"
import config from "../../config/api.json";
import server from "../../config/server.json";
import Icon from "react-fontawesome"
import { Spinner } from "reactstrap"
import Input from "../../components/General/Input"
import ListPlaces from "../../components/Users/ListPlaces"
import ListItem from "../../components/Users/ListItem"
import profileDefaultPic from "../../assets/profile.png";

type UsersScreenState = {
    users: Array<any>
    search: string
    userName: string
    loading: boolean
    friendLoading: boolean
    arrayOfFriends: Array<any>
    id?: string
    remoteDay?: string
    name?: string
    fname?: string
    photo?: string
    place?: string
    historical?: Array<any>
};

interface UsersScreenProps {
    history: any
}

class UsersScreen extends React.Component<UsersScreenProps, UsersScreenState> {
    _isMounted = false;

    constructor() {
        super(undefined);
        this.state = {
            users: [],
            search: "",
            userName: null,
            loading: false,
            friendLoading: false,
            arrayOfFriends: []
        };
    }

    getAsyncStorageUser = async () => {
        const result = localStorage.getItem("USER")
        if (!result) {
            this.props.history.push("/login")
        } else {
            const { remoteDay, historical, arrayOfFriends, id } = JSON.parse(result);
            const userName = JSON.parse(result).name;
            const userFName = JSON.parse(result).fname;
            const place = JSON.parse(result).place;
            const photo = JSON.parse(result).photo;

            await this.setState({
                userName: `${userName}/${userFName}`,
                remoteDay,
                name: JSON.parse(result).name,
                fname: JSON.parse(result).fname,
                photo,
                place,
                historical,
                id,
                arrayOfFriends: arrayOfFriends || []
            });
            this.fetchFriends();
        }
    };

    componentDidMount = async () => {
        await this.getAsyncStorageUser();

        this._isMounted = true;
        this.getUsers();
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    addFriend = item => {
        const { users, id, arrayOfFriends, friendLoading } = this.state;
        if (!friendLoading) {
            // const newListOfUSers = users.filter(e => e.id !== item.id);
            this.setState({
                users: users.map(x => x.id === item.id ? Object.assign(x, { isFriend: true }) : x),
                arrayOfFriends: append(item, arrayOfFriends),
                friendLoading: true
            });
            const payload = {
                id_user: id,
                id: item.id,
                name: item.name,
                fname: item.fname,
                id_place: item.id_place,
                photo: item.photo
            };

            return fetch(`${server.address}add_friend`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`
                }
            })
                .then(res => res.json()) // transform data to json
                .then(friend => {
                    // this.setState({
                    //   arrayOfFriends: append(item, friend.user.friend)
                    // });
                    localStorage.setItem("USER", JSON.stringify(this.state));
                    this.setState({ friendLoading: false });
                });
        }
    };

    fetchFriends = async () => {
        const { id } = this.state;
        return fetch(`${server.address}users/${id}/friends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${config.token}`
            }
        })
            .then(res => res.json())
            .then(arrayOfFriends => {
                this.setState({ arrayOfFriends })
                const { users } = this.state;
                this.refreshFriends(arrayOfFriends, users)
                localStorage.setItem("USER", JSON.stringify(this.state));
            });
    };

    refreshFriends = (arrayOfFriends, users) => {
        // Here we check if users are in the friend list
        const mappedUsers = users.map(
            word => Object.assign(word, { isFriend: !!arrayOfFriends.find(e => e.id === word.id) })
        );
        this.setState({
            users: mappedUsers
        });
    }

    getUsers = () => {
        this.setState({ loading: true });
        fetch(`${server.address}users/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${config.token}`
            }
        })
            .then(res => res.json()) // transform data to json
            .then(users => {
                if (this._isMounted) {
                    const { arrayOfFriends } = this.state;
                    this.refreshFriends(arrayOfFriends, users)
                }
                this.setState({ loading: false });
            });
    };

    _handleSearch = search => {
        this.setState({ search });
        // if (search.length >= 3) this.getUsers();
    };

    sortUsers = (a, b) => {
        const comp = b.isFriend - a.isFriend

        if (comp)
            return comp
        return a.name.localeCompare(b.name)
    }

    _handleList = () => {
        const { users, search } = this.state;

        if (users === [])
            return users
        users.sort(this.sortUsers);
        if (search === "")
            return users
        return users.filter(e => e.name.includes(search) || e.fname.includes(search))
    };

    removeFriend = friendToBeRemoved => {
        const { id, arrayOfFriends, users, friendLoading } = this.state;
        const isNotRemovedUser = userFriend => userFriend.id !== friendToBeRemoved.id;
        this.setState({
            users: users.map(x => !isNotRemovedUser(x) ? Object.assign(x, { isFriend: false }) : x),
            arrayOfFriends: filter(isNotRemovedUser, arrayOfFriends)
        });
        if (!friendLoading) {
            this.setState({ friendLoading: true });
            const payload = {
                id_user: id,
                id: friendToBeRemoved.id
            };

            fetch(`${server.address}remove_friend`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`
                }
            })
                .then(res => res.json()) // transform data to json
                .then(friendUser => {
                    localStorage.setItem(
                        "USER",
                        JSON.stringify(this.state)
                    );
                    this.setState({ friendLoading: false });
                });
        }
    };

    render() {
        const { users, loading, userName } = this.state;

        return (
            <div
                style={{
                    marginLeft: 40,
                    marginRight: 40,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                <div
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginBottom: 10,
                        marginTop: 10,
                        display: "flex"
                    }}
                >
                    <Input
                        onChange={e => this._handleSearch(e.target.value)}
                        onSubmit={() => this.getUsers()}
                        placeholder="Recherche   ex: Prénom NOM"
                    />
                    <button
                        onClick={() => this.getUsers()}
                        style={{
                            boxShadow: "2px 2px 2px 2px rgba(54, 98, 160, 0.4)",
                            backgroundColor: "#fff",
                            borderRadius: 17.5,
                            flex: 1,
                            height: 35,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                    >
                        <Icon name="arrow-right" style={{ fontSize: 15, color: "#2E89AD" }} />
                    </button>
                </div>
                {/* <FindPlacesCard users={() => this.getUsers()} /> */}
                {!loading ? (
                <div>
                    {users !== [] && users.length > 0 ? (
                    <ListPlaces
                        handleList={this._handleList()}
                        build={item =>
                            item && `${item.name}/${item.fname}` !== userName ? (
                            <div
                                key={item.id}
                                onClick={() => item.isFriend ? this.removeFriend(item) : this.addFriend(item)}
                                style={{cursor: "pointer"}}
                            >
                                {/* <Card containerStyle={{ borderRadius: 10 }}> */}
                                <ListItem
                                    title={`${item.name} / ${item.fname}`}
                                    subtitle={item.id_place}
                                    containerStyle={{ margin: 0, padding: 5 }}
                                    titleStyle={{ fontFamily: "Roboto" }}
                                    rightIcon={{
                                        name: "star",
                                        fa: item.isFriend,
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
                ) : (
                        <div
                            style={{
                                backgroundColor: "white",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Spinner
                                style={{ marginTop: 40, color: "#2E89AD" }}
                            />
                        </div>
                    )}
            </div>
        );
    }
}

export default withRouter(UsersScreen)