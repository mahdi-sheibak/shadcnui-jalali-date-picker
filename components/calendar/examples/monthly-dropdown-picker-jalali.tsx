import { useState } from "react";
import { format } from "date-fns-jalali";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarJalali } from "../calendar-jalali";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { jalaliFormatWeekdayName } from "@/lib/calendar";
import { DropdownWrapper, useDropdowns } from "../custom-dropdown";
import { START_YEAR_JALALI } from "../calendar-utils";

export function MonthlyDropdownPickerJalali() {
  const [monthlyDate, setMonthlyDate] = useState<DateRange>();

  const [pickerOpen, setPickerOpen] = useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  function handleDateChange(date: Date, type: "from" | "to") {
    setMonthlyDate((prev) => ({ ...prev, [type]: date } as DateRange));
  }

  const getLabel = () => {
    if (!monthlyDate?.from && !monthlyDate?.to) return "";
    const from = monthlyDate.from ? format(monthlyDate.from, "MMMM yyyy") : "";
    const to = monthlyDate.to ? format(monthlyDate.to, "MMMM yyyy") : "";
    return `${from}${to ? " تا " + to : ""}`;
  };

  return (
    <Popover
      open={pickerOpen}
      onOpenChange={(open) => !isAnyDropdownOpen && setPickerOpen(open)}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !monthlyDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {monthlyDate ? (
            getLabel()
          ) : (
            <span>یک ماه را انتخاب کنید (ماهانه)</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-none">
        {(["from", "to"] as const).map((type) => (
          <CalendarJalali
            key={type}
            mode="single"
            captionLayout="dropdown"
            components={{
              Dropdown: (props) => (
                <DropdownWrapper
                  props={props}
                  id={`${type}-monthlyDropdown`}
                  openDropdowns={openDropdowns}
                  setDropdownOpen={setDropdownOpen}
                />
              ),
            }}
            startMonth={START_YEAR_JALALI}
            selected={monthlyDate?.[type]}
            onMonthChange={(value) => handleDateChange(value, type)}
            formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
            className="w-[300px]"
            classNames={{
              root: "",
              month_grid: "hidden",
              month_caption: "",
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
