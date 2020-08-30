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
        const loc = [
            {
                name: "Location 1",
                location: {
                    lat: 44.3954,
                    lng: 2.162
                },
            },
            {
                name: "Location 2",
                location: {
                    lat: 41.3917,
                    lng: 2.1649
                },
            },
            {
                name: "Location 3",
                location: {
                    lat: 41.3773,
                    lng: 2.1585
                },
            },
            {
                name: "Location 4",
                location: {
                    lat: 41.3797,
                    lng: 2.1682
                },
            },
            {
                name: "Location 5",
                location: {
                    lat: 41.4055,
                    lng: 2.1915
                },
            }
        ];
        this.setState({ locations: loc });
    }

    render() {
        const mapStyles = {
            height: "100vh",
            width: "100%"
        };

        const defaultCenter = {
            lat: -6.4543, lng: 106.1527
        }
        return (
            <div>
                <LoadScript
                    googleMapsApiKey='AIzaSyDC45FCSbYMvnKlnEpbc2jhYFkBvi3DZq8'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={5}
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

