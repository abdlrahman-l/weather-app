'use client';
import MarkerIcon from 'public/images/marker-icon.png';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type MapLocationCoordinateProps = {
  lat: number;
  long: number;
};

const MapLocationCoordinate = ({ lat, long }: MapLocationCoordinateProps) => {
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    import('leaflet').then((L) => {
      const newicon = new L.Icon({
        iconUrl: MarkerIcon.src,
        iconSize: [40, 40],
      });
      setIcon(newicon);
    });
  }, []);

  if (!icon) return null;

  return (
    <MapContainer
      center={[lat, long]}
      zoom={14}
      scrollWheelZoom={false}
      style={{
        height: 200,
        zIndex: 1,
      }}
      dragging={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[lat, long]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLocationCoordinate;
