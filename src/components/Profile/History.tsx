import React from "react"
import PlacesList from "../../components/Places/PlacesList"
import { withRouter } from "react-router-dom"
import server from "../../config/server.json";
import config from "../../config/api.json";
import { Spinner } from "reactstrap"

interface HistoryProps {
    historical: Array<any>
    history: any
    takePlace: any
}

interface HistoryState {
    places: Array<any>
    loading: boolean
}

export class HistoryComponent extends React.Component<HistoryProps, HistoryState> {
    constructor(props) {
        super(props)
        this.state = {
            places: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.getPlaces()
    }

    getPlaces() {
        this.setState({ loading: true });
        fetch(`${server.address}places/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${config.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    places: data,
                    loading: false
                });
            });
    }

    isFree = place => {
        if (!this.state.places || this.state.places.length < 1) return false
        return !!this.state.places.find(x => x.id === place && !x.using)
    }

    getHistory(historical) {
        return Array.from(new Set(historical.map(x => x.id_place))).sort().filter(this.isFree).map(x => {return{id: x}})
    }

    onClick = async x => {
        if (await this.props.takePlace(x))
            this.props.history.push("/home/leave")
    }

    render () {
        const history = this.getHistory(this.props.historical)
        const { loading } = this.state

        return (
            <div style={{
                display: "flex",
                flexDirection: "column" as "column",
                alignItems: "center",
            }}>
                <div>History</div>
                {!loading ? (
                    <PlacesList places={history} onClickItem={this.props.takePlace} />
                ) : (
                    <Spinner
                        style={{ marginTop: 20, color: "#2E89AD" }}
                        size="large"
                    />
                )}
            </div>
        );
    }
};

export default withRouter(HistoryComponent)