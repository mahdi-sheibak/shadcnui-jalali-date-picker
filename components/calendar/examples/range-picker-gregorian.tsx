'use client';
import type { DateRange } from 'react-day-picker';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { CalendarGregorian } from '../calendar-gregorian';

export function RangePickerGregorian() {
  const [dateRange, setDateRange] = React.useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('w-[280px] justify-start text-left font-normal', !dateRange && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange ? (
            <span className="ButtonContentScroll">
              from {dateRange.from && format(dateRange.from, 'PPP')} to {dateRange.to && format(dateRange.to, 'PPP')}
            </span>
          ) : (
            <span>choose a range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian selected={dateRange} mode="range" onSelect={setDateRange} />
      </PopoverContent>
    </Popover>
  );
}
