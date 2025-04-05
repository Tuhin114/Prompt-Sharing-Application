import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { cn } from "../../../src/lib/utils";
import { Separator } from "@components/ui/separator";

const TimePicker = ({ selectedDate, selectedTime, onTimeSelect }) => {
  const now = new Date();
  const isToday = useMemo(() => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === now.getDate() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getFullYear() === now.getFullYear()
    );
  }, [selectedDate, now]);

  // Generate time slots in 15-minute intervals
  const timeSlots = useMemo(() => {
    const slots = [];
    const totalMinutesInDay = 24 * 60;
    for (let minutes = 0; minutes < totalMinutesInDay; minutes += 15) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "AM" : "PM";
      const timeString = `${formattedHour}:${minute
        .toString()
        .padStart(2, "0")} ${ampm}`;
      slots.push({
        value: timeString,
        minutes: hour * 60 + minute,
      });
    }
    return slots;
  }, []);

  // Filter time slots for today if necessary
  const availableTimeSlots = useMemo(() => {
    if (!isToday) return timeSlots;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const nextSlotMinutes = Math.ceil(currentMinutes / 15) * 15;
    return timeSlots.filter((slot) => slot.minutes >= nextSlotMinutes);
  }, [isToday, timeSlots, now]);

  const handleTimeClick = (time) => {
    onTimeSelect(time);
  };

  return (
    <ScrollArea className="h-72 overflow-y-auto ">
      <div className="space-y-1">
        {availableTimeSlots.map((slot) => (
          <>
            <Button
              key={slot.value}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                selectedTime === slot.value &&
                  "bg-accent text-accent-foreground"
              )}
              onClick={() => handleTimeClick(slot.value)}
            >
              {slot.value}
              {selectedTime === slot.value && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </Button>
          </>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TimePicker;
