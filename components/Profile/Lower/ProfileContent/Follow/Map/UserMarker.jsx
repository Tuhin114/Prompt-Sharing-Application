"use client";
import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import UserPopup from "./UserPopup";

const UserMarker = ({ user, onSelectUser, selectedUser }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-12 h-12 bg-white rounded-full shadow-lg p-1 border border-black">
            <img src="${user.image}" alt="${user.name}" class="w-full h-full rounded-full object-cover" />
          </div>
           <div class="absolute bottom-0 transform translate-y-1 w-3 h-3 bg-black border-2 border-white rounded-full shadow-md"></div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -40],
    });

    setIcon(customIcon);
  }, [user.image, user.name]);

  if (!icon) return null;

  return (
    <Marker
      position={[user.location.lat, user.location.lng]}
      icon={icon}
      eventHandlers={{
        click: () => {
          if (selectedUser?.id === user.id) {
            onSelectUser(null);
          } else {
            onSelectUser(user);
          }
        },
        popupclose: () => onSelectUser(null),
      }}
    >
      <Popup className="custom-popup">
        <UserPopup user={user} />
      </Popup>
    </Marker>
  );
};

export default UserMarker;
