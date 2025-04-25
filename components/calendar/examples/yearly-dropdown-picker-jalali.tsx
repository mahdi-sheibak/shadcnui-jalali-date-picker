import { useState } from "react";
import { format, addYears, startOfYear, subYears } from "date-fns-jalali";
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
import { END_YEAR_JALALI, START_YEAR_JALALI } from "../calendar-utils";

export function YearlyDropdownPickerJalali() {
  const [yearlyDate, setYearlyDate] = useState<DateRange>();
  const [pickerOpen, setPickerOpen] = useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  function updateYear(date: Date, type: "from" | "to") {
    setYearlyDate((prev) => ({ ...prev, [type]: date } as DateRange));
  }

  function navigateYear(type: "from" | "to", direction: "pre" | "next") {
    const current = yearlyDate?.[type] ?? startOfYear(new Date());
    const newDate =
      direction === "next" ? addYears(current, 1) : subYears(current, 1);
    updateYear(newDate, type);
  }

  function renderYear(date?: Date) {
    return date && format(date, "yyyy");
  }

  function getLabel() {
    return (
      <>
        {renderYear(yearlyDate?.from)}{" "}
        {yearlyDate?.from && yearlyDate?.to && "تا"}{" "}
        {renderYear(yearlyDate?.to)}
      </>
    );
  }

  return (
    <Popover
      open={pickerOpen}
      onOpenChange={(open) => !isAnyDropdownOpen && setPickerOpen(open)}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-[280px] max-w-fit whitespace-normal h-fit justify-start text-left font-normal",
            !yearlyDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {yearlyDate ? (
            getLabel()
          ) : (
            <span>یک سال را انتخاب کنید (سالانه)</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 shadow-none">
        {(["from", "to"] as const).map((type) => (
          <CalendarJalali
            key={type}
            mode="single"
            captionLayout="dropdown"
            startMonth={START_YEAR_JALALI}
            endMonth={END_YEAR_JALALI}
            defaultMonth={new Date()}
            month={yearlyDate?.[type]}
            onMonthChange={(date) => updateYear(date, type)}
            onNextClick={() => navigateYear(type, "next")}
            onPrevClick={() => navigateYear(type, "pre")}
            components={{
              Dropdown: (props) => (
                <DropdownWrapper
                  props={props}
                  id={`${type}-YearlyDropdown`}
                  openDropdowns={openDropdowns}
                  setDropdownOpen={setDropdownOpen}
                  dropdownClasses={{ month_dropdown_class: "hidden" }}
                />
              ),
            }}
            formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
            disabled={() => true}
            classNames={{
              root: "",
              month_grid: "hidden",
              month_caption: "",
              months:
                "flex flex-col items-center space-y-4 sm:space-x-4 sm:space-y-0 relative px-10",
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
