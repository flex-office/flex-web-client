import React from "react"
import PlacesList from "../../components/Places/PlacesList"
import { withRouter } from "react-router-dom"
import server from "../../config/server.js";
import config from "../../config/api.js";
import { Spinner } from "reactstrap";
import {logger} from "../../App";

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
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            places: [],
            loading: true,
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.getPlaces()
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    getPlaces() {
        if (this._isMounted) {
            logger.debug("PLACES HISTORY");
            this.setState({ loading: true });
            const result = localStorage.getItem("USER");
            const userId = JSON.parse(result).id;
            this.setState({places:JSON.parse(result).historical});
  
            
            /*
            fetch(`${server.address}users/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "authorization": `Bearer ${config.token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                logger.debug("data : "+data);
                this.setState({
                    places: data.historical,
                    loading: false
                });
            });
            */
        }
    }

    isFree = place => {
        if (!this.state.places || this.state.places.length < 1) return false
        //return this.state.places.find(x => x.id === place.id && !x.using)
        logger.debug("this.state.places : "+this.state.places);
        return this.state.places
    }

    getHistory(historical) { 
        if(this.state.loading) {
            var histori=Array.from(new Set((JSON.parse(localStorage.getItem("USER")).historical).map(x=>x.id_place))); 
            fetch(`${server.address}places/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "authorization": `Bearer ${config.token}`
                }
            })
                .then(res => res.json())
                .then(async data => {
                    
                    var ListPlaces=(await (data));
                    sessionStorage.setItem("PLACES_USE",JSON.stringify(ListPlaces.filter(place=>place.using)));
                    var ListTemp=ListPlaces.filter(place => !place.using && (!place.semi_flex) && histori.includes(place.id))
                    ListPlaces=Array.from(new Set(ListTemp.concat(ListPlaces)));
                    sessionStorage.setItem("PLACES", JSON.stringify(ListPlaces));
                    this.setState({loading:false});
                    
            });
        }
        logger.debug("historical : "+historical);
       // var history=historical.filter(x=>!JSON.parse(sessionStorage.getItem("PLACES_USE")).map(x=>x.id).includes(x.id_place));
        return Array
        .from(
            new Set(
                historical.map(x => x.id_place)
                )
            )
        .sort()
        .map(x => {return{id: x}})
    }

    onClick = async x => {
        if (await this.props.takePlace(x))
            this.props.history.push("/home/leave")
    }
   
    render () {

        const history = this.getHistory(this.props.historical)
        return (
            <div style={{
                display: "flex",
                flexDirection: "column" as "column",
                alignItems: "center",
            }}>
                {!this.state.loading ? (

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