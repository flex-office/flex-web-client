import React from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import config from "../../config/api.json";
import server from "../../config/server.json";
import placesConfig from "../../config/places.json";

type PlacesScreenState = {
    places: Array<any>,
    loading: boolean,
    selectedFloorIndex: number,
    selectedZoneIndex: number,
    selectedSideIndex: number
};

interface PlacesScreenProps {
    history: any
}

class PlacesScreen extends React.Component<PlacesScreenProps, PlacesScreenState> {
    constructor() {
        super(undefined);
        this.state = {
            places: [],
            loading: true,
            selectedFloorIndex: 0,
            selectedZoneIndex: 0,
            selectedSideIndex: 0
        };
    }

    componentDidMount() {
        const user = localStorage.getItem("USER")
        if (!user) this.props.history.push("/login")
        else {
            this.setState(JSON.parse(user));
            this.getPlaces();
        }
    };

    placeIsAllowed = place => place.start_date && place.end_date && moment().isBetween(place.start_date, place.end_date)

    getPlaces = () => {
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
                const result = data.filter(place => !place.using && (!place.semi_flex || this.placeIsAllowed(place)));
                this.setState({
                    places: result,
                    loading: false
                });
            });
    }

    updateFloorIndex = selectedFloorIndex => {
        this.setState({ selectedFloorIndex });
    };

    updateZoneIndex = selectedZoneIndex => {
        this.setState({ selectedZoneIndex });
    };

    updateSideIndex = selectedSideIndex => {
        this.setState({ selectedSideIndex });
    };

    filterPlaces = () => {
        const { places, selectedFloorIndex, selectedZoneIndex, selectedSideIndex } = this.state;

        const floor = selectedFloorIndex === 0 ? "3" : "4";
        const zoneCode = placesConfig.zoneCodes[selectedZoneIndex];
        const side = placesConfig.sideIndexUpper[selectedSideIndex];

        return places.filter(place => place.id[0] === floor && place.id[2] === zoneCode && place.id.slice(4, -2) === side);
    };

    render() {
        return (
            <div>
                <p>Places Screen</p>
                <ul>
                    {this.state.places.map(place => <li key={place.id}>{place.id}</li>)}
                </ul>
            </div>
        )
    }
}

export default withRouter(PlacesScreen)