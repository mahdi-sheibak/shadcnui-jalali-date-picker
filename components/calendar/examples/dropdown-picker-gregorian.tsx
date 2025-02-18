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
import { gregorianFormatWeekdayName } from "@/lib/calendar";
import CustomDropdown from "../custom-dropdown";

export function DropdownPickerGregorian() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Choose a Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian
          mode="single"
          captionLayout="dropdown"
          components={{
            Dropdown(props) {
              return <CustomDropdown props={props} dir="ltr" />;
            },
          }}
          startMonth={new Date(2020, 0)}
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          formatters={{ formatWeekdayName: gregorianFormatWeekdayName }}
          className="w-[380px]"
          classNames={{
            month_caption: "",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
