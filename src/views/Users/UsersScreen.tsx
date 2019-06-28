import React from "react"
import { append, filter } from "ramda";
import { withRouter } from "react-router-dom"
import config from "../../config/api.json";
import server from "../../config/server.json";

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
        return (
            <div>
                <p>Users Screen</p>
                <ul>
                    {this.state.users.map(user => <li key={user.id}>{user.name} / {user.fname}</li>)}
                </ul>
            </div>
        )
    }
}

export default withRouter(UsersScreen)