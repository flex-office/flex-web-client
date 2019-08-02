import React from "react"
import UsersList from "../../components/Users/UsersList"
import Input from "../../components/General/Input"
import { Spinner } from "reactstrap"
import styles from "./styles/UsersScreenSearchStyles"

type UsersScreenFavoritesState = {
    search: string
};

interface UsersScreenFavoritesProps {
    users: Array<any>
    removeFriend: any
    loading: boolean
}

export default class UsersScreenFavorites extends React.Component<UsersScreenFavoritesProps, UsersScreenFavoritesState> {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }

    render() {
        const { users, removeFriend, loading } = this.props
        const { search } = this.state

        return (
            <div style={{
                display: "flex",
                flexDirection: "column" as "column",
                alignItems: "center"
            }}>
                <Input
                    onChange={e => this.setState({ search: e.target.value })}
                    placeholder="Nom Prénom"
                />
                {!loading ? (
                <UsersList
                    users={users}
                    search={search}
                    onClick={removeFriend}
                    isFriend={() => true}
                />
                ) : (
                <div style={styles.spinner}>
                    <Spinner style={{ marginTop: 40, color: "#2E89AD" }}/>
                </div>
                )}
            </div>
        )
    }
}