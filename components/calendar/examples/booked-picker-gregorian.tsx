'use client';

import { add, format, sub } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { gregorianFormatWeekdayName, normalizeDate } from '@/lib/calendar';
import { cn } from '@/lib/utils';

import { CalendarGregorian } from '../calendar-gregorian';
import { DropdownWrapper, useDropdowns } from '../custom-dropdown';

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

export function BookedPickerGregorian() {
  const [date, setDate] = React.useState<Date>();
  const [bookedOpen, setBookedOpen] = React.useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  function handleDayChange(value: Date | undefined) {
    const isSelectBooked = bookedDates.find(booked => normalizeDate(booked).getTime() === value?.getTime());
    if (!isSelectBooked) return setDate(value);
  }

  return (
    <Popover onOpenChange={e => !isAnyDropdownOpen && setBookedOpen(e)} open={bookedOpen}>
      <PopoverTrigger asChild>
        <Button className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date (Booked dates)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian
          className="w-[380px]"
          disabled={bookedDates}
          selected={date}
          captionLayout="dropdown"
          components={{
            Dropdown: props => (
              <DropdownWrapper id="booked-picker-gregorian" openDropdowns={openDropdowns} props={props} setDropdownOpen={setDropdownOpen} />
            ),
          }}
          defaultMonth={date}
          formatters={{ formatWeekdayName: gregorianFormatWeekdayName }}
          mode="single"
          onSelect={handleDayChange}
          startMonth={new Date(2020, 0)}
          classNames={{
            month_caption: '',
            disabled: 'bg-chart-2/50 opacity-90 rounded-md text-white',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
