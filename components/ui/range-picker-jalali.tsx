"use client";

import * as React from "react";
import { format } from "date-fns-jalali";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarJalali } from "@/components/ui/calendar-jalali";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RangePickerJalali() {
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
            <span>
              از {dateRange.from && format(dateRange.from, "PPP")} تا{" "}
              {dateRange.to && format(dateRange.to, "PPP")}
            </span>
          ) : (
            <span>{"محدوده مورد نظر را انتخاب کنید"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarJalali
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          defaultMonth={dateRange?.from}
        />
      </PopoverContent>
    </Popover>
  );
}
