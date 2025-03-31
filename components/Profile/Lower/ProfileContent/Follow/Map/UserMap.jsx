import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import UserMarker from "./UserMarker";

import "leaflet/dist/leaflet.css";

const defaultCenter = [0, 0];
const defaultZoom = 2;
const maxZoomOut = 1;

const MapUpdater = ({ user }) => {
  const map = useMap();

  useEffect(() => {
    if (user) {
      map.flyTo([user.location.lat, user.location.lng], 7, { duration: 1.5 });
    } else {
      map.flyTo(defaultCenter, defaultZoom, { duration: 1.5 });
    }
  }, [user, map]);

  return null;
};

const UserMap = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen w-full flex">
      <div className="flex-grow relative">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          zoomControl={false}
          minZoom={maxZoomOut}
          maxZoom={18}
          className="h-full w-full"
        >
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="Map data © Google"
          />

          <ZoomControl position="bottomright" />

          <MapUpdater user={selectedUser} />

          {users.map((user) => (
            <UserMarker
              key={user.id}
              user={user}
              onSelectUser={setSelectedUser}
              selectedUser={selectedUser}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default UserMap;
