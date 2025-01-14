"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Notification = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchNotifications = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/notification?userId=${session.user.id}`);
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [pathname, session?.user?.id]);

  return (
    <div className="relative">
      <h2 className="font-bold text-lg">🔔 Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-2 max-h-60 overflow-y-auto">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={`p-2 border-b ${
                notif.isRead ? "bg-gray-100" : "bg-blue-100"
              }`}
            >
              {notif.message}
              <span className="text-xs text-gray-500 block">
                {new Date(notif.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
          {notifications.length === 0 && <p>No notifications yet.</p>}
        </ul>
      )}
    </div>
  );
};

export default Notification;
