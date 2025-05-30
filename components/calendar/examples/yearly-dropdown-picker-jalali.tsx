import type { DateRange } from 'react-day-picker';

import { addYears, format, startOfYear, subYears } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { MonthsDropdown } from '@/components/calendar/months-dropdown';
import { YearsDropdown } from '@/components/calendar/years-dropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../calendar-jalali';
import { END_YEAR_JALALI, START_YEAR_JALALI } from '../calendar-utils';

export function YearlyDropdownPickerJalali() {
  const [yearlyDate, setYearlyDate] = useState<DateRange>();

  function updateYear(date: Date, type: 'from' | 'to') {
    setYearlyDate(prev => ({ ...prev, [type]: date }) as DateRange);
  }

  function navigateYear(type: 'from' | 'to', direction: 'next' | 'pre') {
    const current = yearlyDate?.[type] ?? startOfYear(new Date());
    const newDate = direction === 'next' ? addYears(current, 1) : subYears(current, 1);
    updateYear(newDate, type);
  }

  function renderYear(date?: Date) {
    return date && format(date, 'yyyy');
  }

  function getLabel() {
    return (
      <>
        {renderYear(yearlyDate?.from)} {yearlyDate?.from && yearlyDate.to && 'تا'} {renderYear(yearlyDate?.to)}
      </>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'min-w-[280px] max-w-fit whitespace-normal h-fit justify-start text-left font-normal',
            !yearlyDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {yearlyDate ? getLabel() : <span>یک سال را انتخاب کنید (سالانه)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 shadow-none">
        {(['from', 'to'] as const).map(type => (
          <CalendarJalali
            disabled={() => true}
            key={type}
            captionLayout="dropdown"
            components={{
              MonthsDropdown,
              YearsDropdown,
            }}
            defaultMonth={new Date()}
            endMonth={END_YEAR_JALALI}
            formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
            mode="single"
            month={yearlyDate?.[type]}
            onMonthChange={date => updateYear(date, type)}
            onNextClick={() => navigateYear(type, 'next')}
            onPrevClick={() => navigateYear(type, 'pre')}
            startMonth={START_YEAR_JALALI}
            classNames={{
              root: '',
              month_grid: 'hidden',
              month_caption: '',
              months: 'flex flex-col items-center space-y-4 sm:space-x-4 sm:space-y-0 relative px-10',
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
