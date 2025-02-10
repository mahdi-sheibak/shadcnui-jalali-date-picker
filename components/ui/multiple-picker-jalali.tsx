"use client";

import * as React from "react";
import { format } from "date-fns-jalali";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarJalali } from "@/components/ui/calendar-jalali";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MultiplePickerJalali() {
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
            <div>
              {dateList.map((date, index) => (
                <span key={index}>{format(date, "PPP")} و </span>
              ))}
            </div>
          ) : (
            <span>{"تاریخ ها مورد نظر را انتخاب کنید"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarJalali
          mode="multiple"
          selected={dateList}
          onSelect={setDateList}
          defaultMonth={dateList[0]}
          required={true}
          max={3}
        />
      </PopoverContent>
    </Popover>
  );
}
