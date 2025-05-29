import type { DateRange } from 'react-day-picker';

import { format } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../calendar-jalali';
import { START_YEAR_JALALI } from '../calendar-utils';
import { DropdownWrapper, useDropdowns } from '../custom-dropdown';

export function MonthlyDropdownPickerJalali() {
  const [monthlyDate, setMonthlyDate] = useState<DateRange>();

  const [pickerOpen, setPickerOpen] = useState(false);
  const { openDropdowns, setDropdownOpen, isAnyDropdownOpen } = useDropdowns();

  function handleDateChange(date: Date, type: 'from' | 'to') {
    setMonthlyDate(prev => ({ ...prev, [type]: date }) as DateRange);
  }

  const getLabel = () => {
    if (!monthlyDate?.from && !monthlyDate?.to) return '';
    const from = monthlyDate.from ? format(monthlyDate.from, 'MMMM yyyy') : '';
    const to = monthlyDate.to ? format(monthlyDate.to, 'MMMM yyyy') : '';
    return `${from}${to ? ` تا ${to}` : ''}`;
  };

  return (
    <Popover onOpenChange={open => !isAnyDropdownOpen && setPickerOpen(open)} open={pickerOpen}>
      <PopoverTrigger asChild>
        <Button className={cn('w-[280px] justify-start text-left font-normal', !monthlyDate && 'text-muted-foreground')} variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {monthlyDate ? getLabel() : <span>یک ماه را انتخاب کنید (ماهانه)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-none">
        {(['from', 'to'] as const).map(type => (
          <CalendarJalali
            className="w-[300px]"
            key={type}
            selected={monthlyDate?.[type]}
            captionLayout="dropdown"
            components={{
              Dropdown: props => (
                <DropdownWrapper
                  id={`${type}-monthlyDropdown`}
                  openDropdowns={openDropdowns}
                  props={props}
                  setDropdownOpen={setDropdownOpen}
                />
              ),
            }}
            formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
            mode="single"
            onMonthChange={value => handleDateChange(value, type)}
            startMonth={START_YEAR_JALALI}
            classNames={{
              root: '',
              month_grid: 'hidden',
              month_caption: '',
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
