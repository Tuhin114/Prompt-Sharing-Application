import React from "react";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Users } from "../../../../../../app/data/user";
import UserMap from "./UserMap";
import { Button } from "@components/ui/button";

const Map = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          <MapPin className="text-gray-600 h-5 w-5" />
          <span className="text-gray-700 text-sm font-medium">View Map</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            All Followers <span>({Users.length})</span>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow">
          <UserMap users={Users} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Map;
