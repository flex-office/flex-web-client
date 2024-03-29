import React from "react"
import { append, filter } from "ramda";
import { withRouter } from "react-router-dom"
import config from "../../config/api.js";
import server from "../../config/server.js";
import UsersScreenSearch from "../../components/Users/UsersScreenSearch"
import UsersScreenFavorites from "../../components/Users/UsersScreenFavorites"
import NavElem from "../../components/Navigation/NavElem"
import { Route } from 'react-router-dom'
import {logger, correlation_id} from "../../App";

type UsersScreenState = {
    users: Array<any>
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
    tabIndex?: number
};

interface UsersScreenProps {
    history: any
    location: any
    setTitle: any
}

class UsersScreen extends React.Component<UsersScreenProps, UsersScreenState> {
    _isMounted = false;


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userName: null,
            loading: false,
            friendLoading: false,
            arrayOfFriends: [],
            tabIndex: 1,
        };
        props.setTitle("Utilisateurs")
    }

    redirect(x) {
        if (this.props.location.pathname !== "/users") return
        if (!x || x.length === 0) {
            this.props.history.push("/users/search")
        } else {
            this.props.history.push("/users/favorites")
        }
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
            this.redirect(arrayOfFriends)

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

            return fetch(`${server.address}friend/add`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`,
                    "X-Correlation-ID": correlation_id
                }
            })
                .then(res => res.json()) // transform data to json
                .then(friend => {
                    // this.setState({
                    //   arrayOfFriends: append(item, friend.user.friend)
                    // });
                    this.setState({ friendLoading: false });
                    localStorage.setItem("USER", JSON.stringify(this.state));
                   
                });
        }
    };

    fetchFriends = async () => {
        const { id } = this.state;
        return fetch(`${server.address}users/${id}/friends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${config.token}`,
                "X-Correlation-ID": correlation_id
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
                "authorization": `Bearer ${config.token}`,
                "X-Correlation-ID": correlation_id
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

            fetch(`${server.address}friend/remove`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${config.token}`,
                    "X-Correlation-ID": correlation_id
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
        const { users, userName, loading } = this.state
        return (
            <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "0.8rem 0.7rem 1.5rem 0rem",
                    width: "100%",
                    justifyContent: "center",
                    fontFamily: "Raleway",
                    maxWidth: 900,
                   
                }}>
                    <NavElem to="/users/favorites" src="" border>Favoris</NavElem>
                    <NavElem to="/users/search" src="" border>Recherche</NavElem>
                </div>
                <Route path="/users/favorites" render={ () =>
                    <UsersScreenFavorites
                        users={users.filter(x => x.isFriend)}
                        removeFriend={this.removeFriend}
                        loading={loading}
                        getUsers={this.getUsers}
                    />
                }
                />
                <Route path="/users/search" render={ () =>
                    <UsersScreenSearch
                        users={users}
                        loading={loading}
                        userName={userName}
                        getUsers={this.getUsers}
                        removeFriend={this.removeFriend}
                        addFriend={this.addFriend}
                    />
                }
                />
            </div>
        )
    }
}

export default withRouter(UsersScreen)