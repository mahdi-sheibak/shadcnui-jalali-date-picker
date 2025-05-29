"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarGregorian } from "../calendar-gregorian";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RangePicker() {
  const [dateRange, setDateRange] = React.useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange ? (
            <span className="ButtonContentScroll">
              from {dateRange.from && format(dateRange.from, "PPP")} to{" "}
              {dateRange.to && format(dateRange.to, "PPP")}
            </span>
          ) : (
            <span>{"choose a range"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
        />
      </PopoverContent>
    </Popover>
  );
}
