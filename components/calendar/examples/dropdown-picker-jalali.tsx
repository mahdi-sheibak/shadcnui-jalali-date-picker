'use client';

import { format } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../calendar-jalali';
import { DropdownWrapper, useDropdowns } from '../custom-dropdown';

export function DropdownPickerJalali() {
  const [date, setDate] = React.useState<Date>();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  return (
    <Popover onOpenChange={e => !isAnyDropdownOpen && setPickerOpen(e)} open={pickerOpen}>
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
            Dropdown: props => {
              return <DropdownWrapper id="singleDropdown" openDropdowns={openDropdowns} props={props} setDropdownOpen={setDropdownOpen} />;
            },
          }}
          defaultMonth={date}
          formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
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
