'use client';
import Leaflet from "leaflet";
import MarkerIcon from 'public/images/marker-icon.png'
import React from 'react'
import { MapContainer, Marker, Popup,TileLayer } from 'react-leaflet'

type MapLocationCoordinateProps = {
    lat: number;
    long: number;
}

export const newicon = new Leaflet.Icon({
    iconUrl: MarkerIcon.src,
    iconSize: [40, 40]
  });

const MapLocationCoordinate = ({ lat, long }: MapLocationCoordinateProps) => {
    return (
        <MapContainer center={[lat, long]} zoom={14} scrollWheelZoom={false}  style={{
            height: 200,
            zIndex: 1,
        }}
        dragging={false}
        zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]} icon={newicon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapLocationCoordinate
