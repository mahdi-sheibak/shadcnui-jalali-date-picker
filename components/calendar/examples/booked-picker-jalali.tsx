"use client";

import * as React from "react";
import { add, sub } from "date-fns";
import { format } from "date-fns-jalali";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarJalali } from "../calendar-jalali";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { jalaliFormatWeekdayName, normalizeDate } from "@/lib/calendar";
import { DropdownWrapper, useDropdowns } from "../custom-dropdown";

const todayDate = new Date();
const bookedDates = [
  sub(todayDate, { days: 2 }),
  sub(todayDate, { days: 4 }),
  sub(todayDate, { days: 6 }),
  sub(todayDate, { days: 10 }),
  add(todayDate, { days: 2 }),
  add(todayDate, { days: 4 }),
  add(todayDate, { days: 6 }),
  add(todayDate, { days: 10 }),
];

export function BookedPickerJalali() {
  const [date, setDate] = React.useState<Date>();
  const [bookedOpen, setBookedOpen] = React.useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  function handleDayChange(value: Date | undefined) {
    const isSelectBooked = bookedDates.find(
      (booked) => normalizeDate(booked).getTime() === value?.getTime()
    );
    if (!isSelectBooked) return setDate(value);
  }

  return (
    <Popover
      open={bookedOpen}
      onOpenChange={(e) => !isAnyDropdownOpen && setBookedOpen(e)}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>یک تاریخ را انتخاب کنید (رزرو شده)</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarJalali
          mode="single"
          captionLayout="dropdown"
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "bg-chart-2/50 rounded-md text-white pointer-events-none",
          }}
          components={{
            Dropdown: (props) => (
              <DropdownWrapper
                props={props}
                id="booked-picker-jalali"
                openDropdowns={openDropdowns}
                setDropdownOpen={setDropdownOpen}
              />
            ),
          }}
          startMonth={new Date(2020, 0)}
          selected={date}
          onSelect={handleDayChange}
          defaultMonth={date}
          formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
          className="w-[380px]"
          classNames={{ month_caption: "" }}
        />
      </PopoverContent>
    </Popover>
  );
}
