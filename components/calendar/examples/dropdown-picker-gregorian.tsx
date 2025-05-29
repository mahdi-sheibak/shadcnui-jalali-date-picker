'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { gregorianFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

import { CalendarGregorian } from '../calendar-gregorian';
import { DropdownWrapper, useDropdowns } from '../custom-dropdown';

export function DropdownPickerGregorian() {
  const [date, setDate] = React.useState<Date>();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  return (
    <Popover onOpenChange={e => !isAnyDropdownOpen && setPickerOpen(e)} open={pickerOpen}>
      <PopoverTrigger asChild>
        <Button className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Choose a Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarGregorian
          className="w-[380px]"
          selected={date}
          captionLayout="dropdown"
          components={{
            Dropdown: props => (
              <DropdownWrapper
                id="dropdown-picker-gregorian"
                openDropdowns={openDropdowns}
                props={props}
                setDropdownOpen={setDropdownOpen}
              />
            ),
          }}
          defaultMonth={date}
          formatters={{ formatWeekdayName: gregorianFormatWeekdayName }}
          mode="single"
          onSelect={setDate}
          startMonth={new Date(2020, 0)}
          classNames={{
            month_caption: '',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
