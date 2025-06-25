import { addYears, isEqual } from 'date-fns';
import { format } from 'date-fns-jalali';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

import type { Events } from '@/types';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { gregorianEvents } from '@/data/gregorian-events';
import { persianEvents } from '@/data/persian-events';
import { JalaliDate } from '@/lib/jalaliToGregorian';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../../calendar-jalali';
import { MonthsDropdown } from '../../months-dropdown';
import { YearsDropdown } from '../../years-dropdown';
import { DayButton } from './EventsDayButton';
import { EventsFooter } from './EventsFooter';

export function HolidaysPickerJalali() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [displayedMonth, setDisplayedMonth] = useState(() => new Date());
  const [holidaysDates, setHolidaysDates] = useState<Events[]>();
  const [eventsDates, setEventsDates] = useState<Events[]>();

  const persianDisplayedMonth = format(displayedMonth, 'MM');
  const persianDisplayedYear = Number(format(displayedMonth, 'yyyy'));

  const { holidays, events } = useMemo(() => fetchHolidayDates(Number(persianDisplayedMonth)), [persianDisplayedMonth]);

  useEffect(() => {
    setHolidaysDates(holidays);
    setEventsDates(events);
  }, [persianDisplayedMonth, events, holidays]);

  const convertedHolidays = useMemo(
    () => holidaysDates?.map(event => JalaliDate.jalaliToJSDate(persianDisplayedYear, event.month, event.day)) ?? [],
    [holidaysDates, persianDisplayedYear],
  );
  const convertedEvents = useMemo(
    () => eventsDates?.map(event => JalaliDate.jalaliToJSDate(persianDisplayedYear, event.month, event.day)) ?? [],
    [eventsDates, persianDisplayedYear],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'min-w-[280px] max-w-fit whitespace-normal h-fit justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, 'PPP') : <span>تقویم تعطیلات رسمی</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-h-10 min-w-10 p-0">
        <CalendarJalali
          className="w-[380px]"
          selected={selectedDate}
          captionLayout="dropdown"
          components={{
            YearsDropdown,
            MonthsDropdown,
            DayButton,
          }}
          defaultMonth={selectedDate}
          endMonth={new Date(addYears(new Date(), 5))}
          footer={
            <EventsFooter
              eventsDates={eventsDates}
              selectedDate={selectedDate}
              holidaysDates={holidaysDates}
              setDisplayedMonth={setDisplayedMonth}
            />
          }
          formatters={{ formatWeekdayName: date => format(date, 'EEEEEE') }}
          mode="single"
          modifiers={{
            friday: { dayOfWeek: [5] },
            holidays: (date: Date) => convertedHolidays.some(holidayDate => isEqual(date, holidayDate)),
            events: (date: Date) => convertedEvents.some(eventDate => isEqual(date, eventDate)),
          }}
          modifiersClassNames={{
            friday: 'text-chart-1 opacity-100',
            holidays: 'text-chart-1 opacity-100',
          }}
          month={displayedMonth}
          onMonthChange={setDisplayedMonth}
          onSelect={setSelectedDate}
          showOutsideDays={false}
          classNames={{
            month_caption: '',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function fetchHolidayDates(month: number): {
  events: Events[];
  holidays: Events[];
} {
  const eventsData = [...persianEvents, ...gregorianEvents];
  const filteredMonth = eventsData.filter(event => event.month === month).map(day => day);
  return {
    events: filteredMonth.filter(event => !event.holiday),
    holidays: filteredMonth.filter(event => event.holiday),
  };
}
