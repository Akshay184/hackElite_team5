import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import socketIOClient from "socket.io-client";
import Hover from '../src/Hover';
import MultiSelect from '../src/MultiSelect';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const google = window.google;

class MapContainer extends Component {

    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001",
            locations: [],
            unqiue_vehicle: [],
            hash_map: new Array(1000).fill(new Array()),
            show: false,
            cur: {}
        };
    }
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
    async changeMe(data) {
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
        // numbersCopy = JSON.parse(JSON.stringify(nestedNumbers));
        var copy_vehicle = JSON.parse(JSON.stringify(whole_map[index]));
        copy_vehicle.push(data);
        whole_map[index] = JSON.parse(JSON.stringify(copy_vehicle));
        // console.log(temp);
        // console.log(whole_map)
        var new_location = [];
        // console.log(temp);

        for (var i = 0; i < temp.length; i++) {
            // console.log(i);
            var da = whole_map[i][whole_map[i].length - 1];
            // console.log(da)
            console.log(da)
            new_location.push(da);
        }
        console.log(new_location);

        await this.setState({ locations: new_location, unqiue_vehicle: temp, hash_map: whole_map })
        console.log(this.state.hash_map)
        // console.log(this.state.locations)
    }

    componentDidMount() {
        // we can dynamically update it by using socket.io
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => (this.changeMe(data)));

    }
    showHandler = (data) => {
        this.setState({ show: true, cur: data });
    };

    hideHandler = () => {
        this.setState({ show: false, cur: {} });
        console.log("rfd");
        console.log(this.state.show);
    };
    visibilityChangeHandler = () => {
        console.log("visibility");
    }



    showHandler = (data) => {
        this.setState({ show: true, cur: data });
    };

    hideHandler = () => {
        this.setState({ show: false, cur: {} });
        console.log("rfd");
        console.log(this.state.show);
    };

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
                    data={this.state.unqiue_vehicle}
                    changed={this.visibilityChangeHandler}
                />
                <LoadScript
                    googleMapsApiKey='AIzaSyDC45FCSbYMvnKlnEpbc2jhYFkBvi3DZq8'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={10}
                        center={defaultCenter}

                    >

                        {
                            this.state.unqiue_vehicle.map(vehicle => {
                                var index = vehicle["index"];
                                // var color = randomColor();
                                var loc = [];
                                for (var i = 0; i < this.state.hash_map[index].length; i++) {
                                    loc.push(this.state.hash_map[index][i].location)
                                }
                                return (
                                    <Polyline
                                        path={loc}
                                        strokeColor={"#989700"}
                                        strokeOpacity={0.2}
                                        strokeWeight={1} />
                                )
                            })
                        }

                        {
                            this.state.locations.map(item => {
                                this.createNotification('info');
                                return (
                                    <Marker key={item.bus_code} position={item.location} title={item.bus_code} onClick={() => this.showHandler(item)} />
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

