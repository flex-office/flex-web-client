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
// import { NavigationEvents } from "react-navigation";
import QrReader from "react-qr-reader";
import {logger} from "../../App";

type Props = {
  onRead: any
};

class QRCodeComponent extends React.Component<Props> {
  render() {
    const { onRead } = this.props;
    return (
      <div style={{
        flex: 1,
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <div
          style={{
            marginBottom: "1rem",
            fontFamily: "Raleway",
            color: "#7F8184",
            fontSize: "0.9rem",
          }}
        >
          Scannez le QR code
        </div>
        <QrReader
          onError={err => logger.error(err)}
          onScan={onRead}
          style={{width: "100%", maxWidth: "40rem", color: "white"}}
        />
      </div>
    );
  }
}

export default QRCodeComponent;
