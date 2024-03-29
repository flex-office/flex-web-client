/*
Copyright 2019-2020 BRED Banque Populaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from "react";
import PlaceItem from "./PlaceItem";
import EmptyResult from "./EmptyResult";

interface PlaceListProps {
	places: any
	onClickItem: any
}

class PlacesList extends React.Component<PlaceListProps> {
	render() {
		const { places, onClickItem } = this.props;
		return (
			<div
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					// marginBottom: 20,
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					maxWidth: "600px",
					marginBottom: 20,
				}}
			>
				{(places.length > 0) ?
					places.map(place =>
					<div key={place.id} style={{margin: 10}}>
						<PlaceItem place={place} onClick={onClickItem} />
					</div>)
					: <EmptyResult />
				}
			</div>
		);
	}
}

export default PlacesList;