import { useState, useEffect } from "react";

function getFormattedDateTime() {
  const now = new Date();

  // e.g. "Wednesday"
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

  // e.g. "Feb 19, 2025"
  const monthDayYear = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Hours, Minutes, AM/PM (manual formatting to match "7 : 22 pm")
  let hour = now.getHours(); // 0 - 23
  const minute = now.getMinutes(); // 0 - 59
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert 24h -> 12h
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour; // if hour is 0, set to 12

  // Make minutes 2-digit (e.g., 07, 22, etc.)
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  // "Feb 19, 2025 | Wednesday,  7 : 22 pm"
  return `${monthDayYear} | ${weekday},  ${hour} : ${formattedMinute} ${ampm}`;
}

export default function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-lg font-semibold">{dateTime}</div>;
}
