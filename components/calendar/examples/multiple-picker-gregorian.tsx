"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarGregorian } from "../calendar-gregorian";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MultiplePicker() {
  const [dateList, setDateList] = React.useState<Date[]>([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[280px] justify-start text-left font-normal",
            !dateList.length && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateList.length ? (
            <div className="ButtonContentScroll">
              {dateList.map((date, index) => (
                <span key={index}>{format(date, "PPP")} and </span>
              ))}
            </div>
          ) : (
            <span>{"choose dates"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian
          mode="multiple"
          selected={dateList}
          onSelect={setDateList}
          required={true}
          max={3}
        />
      </PopoverContent>
    </Popover>
  );
}
