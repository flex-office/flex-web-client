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

class EmptyResult extends React.Component {
  render() {
		return (
			<div
				style={{
					color: "#7F8184",
					fontFamily: "Raleway",
					fontSize: "1rem",
					textAlign: "center",
					marginTop: 70,
					width: 280,
				}}
			>
				Désolé, aucune place n'est disponible avec les critères sélectionnés pour le moment.
			</div>
		);
  }
}

export default EmptyResult;