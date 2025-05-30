'use client';
import { add, format, sub } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { CalendarJalali } from '@/components/calendar/calendar-jalali';
import { MonthsDropdown } from '@/components/calendar/months-dropdown';
import { YearsDropdown } from '@/components/calendar/years-dropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>یک تاریخ را انتخاب کنید (رزرو شده)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarJalali
          className="w-[380px]"
          disabled={bookedDates}
          selected={date}
          captionLayout="dropdown"
          components={{
            MonthsDropdown,
            YearsDropdown,
          }}
          defaultMonth={date}
          formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
          mode="single"
          onSelect={setDate}
          startMonth={new Date(2020, 0)}
          classNames={{
            disabled: 'bg-chart-2/50 opacity-90 rounded-md text-white',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
