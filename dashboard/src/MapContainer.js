import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {

    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 41.3954,
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


    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyDzCP5oMHWf1dNgcIdchURB1UP5t0mMt70'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            >
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name} position={item.location} />
                        )
                    })
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;