'use client';
import { format } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../calendar-jalali';

export function MultiplePickerJalali() {
  const [dateList, setDateList] = React.useState<Date[]>([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('w-[260px] justify-start font-normal', !dateList.length && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateList.length ? (
            <div className="ButtonContentScroll">
              {dateList.map(date => (
                <span key={date.toISOString()}>{format(date, 'PPP')} و </span>
              ))}
            </div>
          ) : (
            <span>تاریخ ها مورد نظر را انتخاب کنید</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarJalali required max={3} selected={dateList} mode="multiple" onSelect={setDateList} />
      </PopoverContent>
    </Popover>
  );
}
