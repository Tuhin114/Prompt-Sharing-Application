import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "../../../src/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import TimePicker from "./TimePicker";

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const ScheduleOptions = ({ post, handleCreatePrompt }) => {
  const [publishOption, setPublishOption] = useState("now");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timePopoverOpen, setTimePopoverOpen] = useState(false);

  const userId = "66c2ea75d5be47e78d405f67";

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowTimePicker(true);
    // Reset time if a new date is selected
    setTime(null);
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
    setTimePopoverOpen(false); // Close the time picker after selection
  };

  const handlePublish = async () => {
    if (publishOption === "schedule" && (!date || !time)) {
      console.log("Please select a date and time for scheduling.");
      return;
    }

    let scheduledDateTime;
    if (publishOption === "schedule") {
      // Merge date and time into a single Date object
      const scheduledDate = new Date(date);
      const [hours, minutes] = time.split(":");
      scheduledDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
      scheduledDateTime = scheduledDate.toISOString();
      console.log("Prompt scheduled for:", scheduledDateTime);
    } else {
      console.log("Publishing now");
    }

    const response = await handleCreatePrompt();
    if (!response) return;

    const postId = response._id;
    console.log("Post ID:", postId);

    // For this example, assume you have a currentUserId from context or props
    if (publishOption === "schedule") {
      await handleSchedule({ userId, postId, scheduledAt: scheduledDateTime });
    }
  };

  const handleSchedule = async ({ userId, postId, scheduledAt }) => {
    if (!date) {
      console.log("No date selected");
      return;
    }

    // const scheduledAt = date.toISOString();
    console.log(scheduledAt);

    try {
      const response = await fetch("/api/schedule/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          postId,
          scheduledAt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule the post");
      }

      const data = await response.json();
      console.log("Post scheduled successfully:", data);
    } catch (error) {
      console.error("Error scheduling post:", error);
    }

    console.log("Post scheduled for:", scheduledAt);
  };

  const now = new Date();

  return (
    <div className="space-y-6 pt-6">
      <h2 className="text-2xl font-bold tracking-tight">Publish options</h2>
      <RadioGroup
        value={publishOption}
        onValueChange={setPublishOption}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3 rounded-md border p-3">
          <RadioGroupItem value="now" id="now" />
          <Label htmlFor="now" className="flex-1 cursor-pointer">
            Publish now
          </Label>
        </div>
        <div className="flex items-center space-x-3 rounded-md border p-3">
          <RadioGroupItem value="schedule" id="schedule" />
          <Label htmlFor="schedule" className="flex-1 cursor-pointer">
            Schedule for later
          </Label>
        </div>
      </RadioGroup>

      {publishOption === "schedule" && (
        <div className="space-y-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Select date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    handleDateSelect(selectedDate);
                    setCalendarOpen(false);
                  }}
                  disabled={(d) => d < now && !isSameDay(d, now)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          {showTimePicker && (
            <div className="space-y-2">
              <Label>Select time</Label>
              <Popover open={timePopoverOpen} onOpenChange={setTimePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setTimePopoverOpen(true)}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !time && "text-muted-foreground"
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time ? time : <span>Pick a time</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40" align="start">
                  <TimePicker
                    selectedDate={date}
                    selectedTime={time}
                    onTimeSelect={handleTimeSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-2 justify-end pt-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button
          onClick={handlePublish}
          className="bg-black hover:bg-gray-800 text-white"
        >
          {publishOption === "now"
            ? "Publish"
            : publishOption === "draft"
            ? "Save draft"
            : "Schedule"}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleOptions;
