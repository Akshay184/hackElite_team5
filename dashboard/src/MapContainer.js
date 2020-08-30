import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import socketIOClient from "socket.io-client";
import Hover from '../src/Hover';
import MultiSelect from '../src/MultiSelect';
const google = window.google;

class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001",
            locations: [],
            unqiue_vehicle: [],
            hash_map: new Array(1000).fill(new Array(0)),
            show: false,
            cur: {},
        };
    }
    changeMe(data) {
        var flag = 0;
        var index = 0;
        for (var x of this.state.unqiue_vehicle) {
            if (x["value"] == data["bus_code"]) {
                flag = 1;
                index = x["index"];
                break;
            }
        }
        var temp = this.state.unqiue_vehicle;

        if (flag == 0) {
            var new_vehicle = temp.length;
            // console.log(new_vehicle);
            index = new_vehicle;
            temp.push({ "value": data["bus_code"], "index": new_vehicle })
        }

        var whole_map = this.state.hash_map;
        // console.log(typeof this.state.hash_map)
        var copy_vehicle = whole_map[index];
        copy_vehicle.push(data);
        whole_map[index] = copy_vehicle;
        // console.log(temp);
        // console.log(whole_map)
        var new_location = [];
        for (var i = 0; i < temp.length; i++) {
            var da = whole_map[i][whole_map[i].length - 1];
            // console.log(da)
            new_location.push(da);
        }

        this.setState({ locations: new_location, unqiue_vehicle: temp, hash_map: whole_map })
        // console.log(this.state.locations)
    }

    componentDidMount() {
        // we can dynamically update it by using socket.io
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => (this.changeMe(data)));
        // const loc = [
        //     {
        //         name: "Location 1",
        //         location: {
        //             lat: 44.3954,
        //             lng: 2.162
        //         },
        //     },
        //     {
        //         name: "Location 2",
        //         location: {
        //             lat: 41.3917,
        //             lng: 2.1649
        //         },
        //     },
        //     {
        //         name: "Location 3",
        //         location: {
        //             lat: 41.3773,
        //             lng: 2.1585
        //         },
        //     },
        //     {
        //         name: "Location 4",
        //         location: {
        //             lat: 41.3797,
        //             lng: 2.1682
        //         },
        //     },
        //     {
        //         name: "Location 5",
        //         location: {
        //             lat: 41.4055,
        //             lng: 2.1915
        //         },
        //     }
        // ];
        // this.setState({ locations: loc });
    }
    showHandler = (data) => {
        this.setState({ show: true, cur: data });
    };

    hideHandler = () => {
        this.setState({ show: false, cur: {} });
        console.log("rfd");
        console.log(this.state.show);
    };


    showHandler = (data) => {
        this.setState({ show: true, cur: data });
    };

    hideHandler = () => {
        this.setState({ show: false, cur: {}});
        console.log("rfd");
        console.log(this.state.show);
    };

    visibilityChangeHandler = () => {
        console.log("visibility");
    }

    render() {
        const mapStyles = {
            height: "100vh",
            width: "100%"
        };

        const defaultCenter = {
            lat: -6.1143, lng: 106.8927
        }
        return (
            <div>
                {this.state.show ?
                    <Hover
                        bus_code={this.state.cur.bus_code}
                        color={this.state.cur.color}
                        corridor={this.state.cur.corridor}
                        course={this.state.cur.course}
                        dtd={this.state.cur.dtd}
                        speed={this.state.cur.speed}
                        lat={this.state.cur.location.lat}
                        log={this.state.cur.location.lng}
                        clicked={this.hideHandler}
                    /> : null
                }
                <MultiSelect
                    data = {this.state.unqiue_vehicle}
                    changed = {this.visibilityChangeHandler}
                 />
                <LoadScript
                    googleMapsApiKey='AIzaSyDC45FCSbYMvnKlnEpbc2jhYFkBvi3DZq8'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={10}
                        center={defaultCenter}

                    >
                        {
                            this.state.hash_map.map(item => {

                                let log = [];
                                for (var i = 0; i < item.length; i++) {
                                    log.push(item[0].location);
                                }
                                // console.log(log);
                                return (
                                    <Polyline
                                        path={log}
                                        geodesic={true}
                                        options={{
                                            strokeColor: "#ff2527",
                                            strokeOpacity: 0.75,
                                            strokeWeight: 2,
                                            icons: [
                                                {
                                                    // icon: lineSymbol,
                                                    offset: "0",
                                                    repeat: "20px"
                                                }
                                            ]
                                        }}
                                    />
                                )
                            })
                        }

                        {
                            this.state.locations.map(item => {
                                return (
                                    <Marker key={item.bus_code} position={item.location} onClick={() => this.showHandler(item)} />
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

