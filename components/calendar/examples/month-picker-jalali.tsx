'use client';

import { format, startOfYear, subYears } from 'date-fns-jalali';
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

const startYear = subYears(startOfYear(new Date()), 12);

export function MonthPickerJalali() {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  let label = '';
  if (fromDate) label += format(fromDate, 'MMMM yyyy');
  if (toDate) label += ` تا ${format(toDate, 'MMMM yyyy')}`;

  const calendarProps: CalendarJalaliProps = {
    className: 'w-[300px]',
    captionLayout: 'dropdown',
    components: {
      MonthsDropdown,
      YearsDropdown,
    },
    formatters: { formatWeekdayName: jalaliFormatWeekdayName },
    mode: 'single',
    startMonth: startYear,
    classNames: {
      root: '',
      month_grid: 'hidden',
      month_caption: '',
    },
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn('w-[280px] justify-start text-left font-normal', !(fromDate ?? toDate) && 'text-muted-foreground')}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {(fromDate ?? toDate) ? label : <span>یک ماه را انتخاب کنید (ماهانه)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-none">
        <CalendarJalali {...calendarProps} selected={fromDate} onMonthChange={setFromDate} />

        <CalendarJalali {...calendarProps} selected={toDate} onMonthChange={setToDate} />
      </PopoverContent>
    </Popover>
  );
}
