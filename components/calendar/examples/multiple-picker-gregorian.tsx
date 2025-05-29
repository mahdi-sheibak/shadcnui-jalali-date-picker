'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { CalendarGregorian } from '../calendar-gregorian';

export function MultiplePicker() {
  const [dateList, setDateList] = React.useState<Date[]>([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn('min-w-[280px] justify-start text-left font-normal', !dateList.length && 'text-muted-foreground')}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateList.length ? (
            <div className="ButtonContentScroll">
              {dateList.map((date, index) => (
                <span key={index}>{format(date, 'PPP')} and </span>
              ))}
            </div>
          ) : (
            <span>choose dates</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian required max={3} selected={dateList} mode="multiple" onSelect={setDateList} />
      </PopoverContent>
    </Popover>
  );
}
