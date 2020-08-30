import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import socketIOClient from "socket.io-client";
import Hover from '../src/Hover';

class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001",
            locations: [],
            show: false,
            cur: {}
        };
    }

    componentDidMount() {
        // we can dynamically update it by using socket.io
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => (this.setState({ locations: data })));
    }

    showHandler = (data) => {
        this.setState({ show: true, cur: data });
    };

    hideHandler = () => {
        this.setState({ show: false, cur: {}});
        console.log("rfd");
        console.log(this.state.show);
    };

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
                {this.state.show ?
                    <Hover
                        bus_code = {this.state.cur.bus_code}
                        color = {this.state.cur.color}
                        corridor = {this.state.cur.corridor}
                        course = {this.state.cur.course}
                        dtd = {this.state.cur.dtd}
                        speed = {this.state.cur.speed}
                        lat = {this.state.cur.location.lat}
                        log = {this.state.cur.location.lng}
                        clicked = {this.hideHandler}
                     /> : null
                }
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
                                    <Marker key={item.name}
                                        position={item.location}
                                        onClick={() => this.showHandler(item)}

                                    >
                                    </Marker>

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

