import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import socketIOClient from "socket.io-client";

class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001",
            locations: [],
        };
    }

    componentDidMount() {
        // we can dynamically update it by using socket.io
        const prvlocations = [...this.state.locations];
        const prv = this.state.locations;
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI",
            data => (this.setState({ locations: data})));

    }

    render() {
        const mapStyles = {
            height: "100vh",
            width: "100%"
        };

        const defaultCenter = {
            lat: 41.390205, lng: 2.154007
        }

        return (
            <div>
                <LoadScript
                    googleMapsApiKey='AIzaSyDzCP5oMHWf1dNgcIdchURB1UP5t0mMt70'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={defaultCenter}
                    >
                        {
                            this.state.locations.map(item => {
                                return (
                                    <Marker key={item.name} position={item.location} />
                                )
                            })
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}

export default MapContainer;