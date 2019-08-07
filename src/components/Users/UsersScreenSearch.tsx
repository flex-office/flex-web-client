import React from "react"
import { withRouter } from "react-router-dom"
import { Spinner } from "reactstrap"
import Input from "../../components/General/Input"
import UsersList from "../../components/Users/UsersList"
import styles from "./styles/UsersScreenSearchStyles"

type UsersScreenSearchState = {
    search: string
};

interface UsersScreenSearchProps {
    history: any
    loading: boolean
    users: Array<any>
    userName: string
    getUsers: any
    addFriend: any
    removeFriend: any
}

class UsersScreenSearch extends React.Component<UsersScreenSearchProps, UsersScreenSearchState> {
    _isMounted = false;

    constructor() {
        super(undefined);
        this.state = {
            search: "",
        };
    }

    _handleSearch = search => {
        this.setState({ search });
        // if (search.length >= 3) this.getUsers();
    };

    render() {
        const { search } = this.state;
        const { users, userName, loading, getUsers, removeFriend, addFriend } = this.props

        return (
            <div style={styles.view}>
                <div style={styles.search}>
                    <Input
                        onChange={e => this._handleSearch(e.target.value)}
                        onSubmit={getUsers}
                        placeholder="Nom Prénom"
                        clearable
                    />
                    <button
                        onClick={getUsers}
                        style={styles.searchButton}
                    >
                        Rechercher
                    </button>
                </div>
                {/* <FindPlacesCard users={getUsers} /> */}
                {!loading ? (
                <div style={{ alignSelf: "center", width: "80%" }}>
                    {search !== "" && users !== [] && users.length > 0 ? (
                    <UsersList
                        users={users}
                        search={search}
                        filterItem={item => `${item.name}/${item.fname}` !== userName }
                        onClick={item => item.isFriend ? removeFriend(item) : addFriend(item)}
                        isFriend={item => item.isFriend}
                    />
                    ) : null}
                </div>
                ) : (
                <div style={styles.spinner}>
                    <Spinner style={{ marginTop: 40, color: "#2E89AD" }}/>
                </div>
                )}
            </div>
        );
    }
}

export default withRouter(UsersScreenSearch)