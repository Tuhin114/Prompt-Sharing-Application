import React from "react";
import { MapPin, X } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const UserPopup = ({ user, onClose }) => {
  return (
    <Card className="w-64 rounded-2xl overflow-hidden shadow-lg relative">
      {/* Header with Profile Image & Name */}
      <CardHeader className="bg-black text-white p-4 pb-10 text-center relative">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-400">{user.role}</p>
      </CardHeader>

      {/* Profile Image (Balanced Positioning) */}
      <div className="absolute top-[5rem] left-1/2 transform -translate-x-1/2">
        <img
          src={user.image}
          alt={user.name}
          className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      {/* Details Section */}
      <CardContent className="p-4 text-sm text-muted-foreground flex flex-col items-center mt-8">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{user.locationName}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPopup;
