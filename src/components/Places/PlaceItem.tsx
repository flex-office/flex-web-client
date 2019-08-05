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
import Icon from "react-fontawesome";

interface PlaceItemProps {
	place: any
	onClick: any
}

class PlaceItem extends React.Component<PlaceItemProps> {
	render() {
		const { place, onClick } = this.props;
		return (
			<div
				style={{
					borderRadius: 7,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					padding: 4,
					width: 130,
					cursor: "pointer",
					border: "solid" as "solid",
					borderWidth: 1,
					borderColor: "#7F8184"
				}}
				onClick={() => onClick(place.id)}
			>
				<div style={{
					marginBottom: 0,
					marginRight: 10,
					color: "#7F8184",
					fontFamily: "Raleway",
					fontSize: "0.9rem",
				}}>
					{place.id}
				</div>
				<Icon
					name="circle"
					style={{
						fontSize: 10,
						color: place.id[5] === "V" ? "green" : (place.id[5] === "B" ? "blue" : "red")
					}}
				/>
			</div>
		);
	}
}

export default PlaceItem;