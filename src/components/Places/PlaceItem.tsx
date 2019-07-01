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
}

class PlaceItem extends React.Component<PlaceItemProps> {
	render() {
		const { place } = this.props;
		return (
			<div
				style={{
					borderRadius: 10,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					flexBasis: "50%",
					flexGrow: 1,
					flex: "1 1 50%",
					padding: 10,
					boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)"
				}}
			>
				<div style={{ marginBottom: 0, marginRight: 10, fontFamily: "Roboto" }}>{place.id}</div>
				<Icon
					name="circle"
					style={{
						fontSize: 15,
						color: place.id[2] === "V" ? "green" : (place.id[2] === "B" ? "blue" : "red")
					}}
				/>
			</div>
		);
	}
}

export default PlaceItem;