'use client';
import { addYears, format, startOfYear, subYears } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import type { CalendarJalaliProps } from '@/components/calendar/calendar-jalali';

import { CalendarJalali } from '@/components/calendar/calendar-jalali';
import { MonthsDropdown } from '@/components/calendar/months-dropdown';
import { YearsDropdown } from '@/components/calendar/years-dropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

const currentDate = new Date();
const startYear = subYears(startOfYear(new Date()), 12);
const endYear = addYears(startOfYear(new Date()), 12);

export function YearPickerJalali() {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  let label = '';
  if (fromDate) label += format(fromDate, 'yyyy');
  if (toDate) label += ` تا ${format(toDate, 'yyyy')}`;

  const calendarProps: CalendarJalaliProps = {
    captionLayout: 'dropdown',
    components: {
      MonthsDropdown,
      YearsDropdown,
    },
    defaultMonth: currentDate,
    endMonth: endYear,
    formatters: { formatWeekdayName: jalaliFormatWeekdayName },
    mode: 'single',
    startMonth: startYear,
    classNames: {
      root: '',
      month_grid: 'hidden',
      month_caption: '',
      months: 'flex flex-col items-center space-y-4 sm:space-x-4 sm:space-y-0 relative px-10',
    },
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-fit max-w-fit min-w-[280px] justify-start text-left font-normal whitespace-normal',
            !(fromDate ?? toDate) && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {(fromDate ?? toDate) ? label : <span>یک سال را انتخاب کنید (سالانه)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 shadow-none">
        <CalendarJalali
          {...calendarProps}
          month={fromDate}
          onMonthChange={setFromDate}
          onNextClick={() => {
            setFromDate(prevState => addYears(prevState ?? currentDate, 1));
          }}
          onPrevClick={() => {
            setFromDate(prevState => subYears(prevState ?? currentDate, 1));
          }}
        />
        <CalendarJalali
          {...calendarProps}
          month={toDate}
          onMonthChange={setToDate}
          onNextClick={() => {
            setToDate(prevState => addYears(prevState ?? new Date(), 1));
          }}
          onPrevClick={() => {
            setToDate(prevState => subYears(prevState ?? new Date(), 1));
          }}
        />
        {/*  */}
      </PopoverContent>
    </Popover>
  );
}
