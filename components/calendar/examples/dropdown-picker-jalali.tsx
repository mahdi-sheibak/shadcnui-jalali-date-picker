'use client';
import { format } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { CalendarJalali } from '@/components/calendar/calendar-jalali';
import { MonthsDropdown } from '@/components/calendar/months-dropdown';
import { YearsDropdown } from '@/components/calendar/years-dropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

export function DropdownPickerJalali() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>یک تاریخ را انتخاب کنید</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarJalali
          className="w-[380px]"
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
        />
      </PopoverContent>
    </Popover>
  );
}
