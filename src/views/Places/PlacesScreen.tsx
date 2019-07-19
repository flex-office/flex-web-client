import React from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import config from "../../config/api.json";
import server from "../../config/server.json";
import placesConfig from "../../config/places.json";
import PlacesList from "../../components/Places/PlacesList"
import PlacesSelector from "../../components/Places/PlacesSelector"
import FetchPlacesButton from "../../components/Places/FetchPlacesButton"
import { Spinner } from "reactstrap"
import styles from "./PlacesScreenStyles"

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

    placeIsAllowed = async place => {
        try {
            const user = await fetch(`${server.address}users/${place.id_owner}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "authorization": `Bearer ${config.token}`
                }
            }).then(res => res.json()) // transform data to json
            return user.start_date && user.end_date && moment().isBetween(user.start_date, user.end_date)
        } catch (_) {
            return false
        }
    }

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
            .then(async data => {
                const result = await data.filter(async place => !place.using && (!place.semi_flex || await this.placeIsAllowed(place)));
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

    handleOnClickItem = place => {
        this.props.history.push("/home", { place })
    }

    render() {
        const {
            loading,
            selectedFloorIndex,
            selectedZoneIndex,
            selectedSideIndex
        } = this.state;

        const filteredPlaces = this.filterPlaces()
        return (
            <div style={styles.view}>
                <div style={styles.selectorContainer}>

                    <div style={styles.label}>Places disponibles</div>

                    {/* Floor selector */}
                    <PlacesSelector
                        buttons={placesConfig.floorIndex}
                        onPress={this.updateFloorIndex}
                        selectedIndex={selectedFloorIndex}
                    />

                    {/* Zone selector */}
                    <PlacesSelector
                        buttons={placesConfig.zoneIndex}
                        onPress={this.updateZoneIndex}
                        selectedIndex={selectedZoneIndex}
                    />

                    {/* Side selector */}
                    <PlacesSelector
                        buttons={placesConfig.sideIndex}
                        onPress={this.updateSideIndex}
                        selectedIndex={selectedSideIndex}
                    />

                    <FetchPlacesButton
                        onPress={() => this.getPlaces()}
                    />
                </div>
                {!loading ? (
                    <div style={{ marginTop: 10 }}>
                        <div style={styles.label}>Nombre de places : {filteredPlaces.length}</div>
                        <PlacesList places={filteredPlaces} onClickItem={x => this.handleOnClickItem(x)} />
                    </div>
                ) : (
                        <Spinner
                            style={{ marginTop: 20, color: "#2E89AD" }}
                            size="large"
                        />
                    )}
            </div>
        )
    }
}

export default withRouter(PlacesScreen)