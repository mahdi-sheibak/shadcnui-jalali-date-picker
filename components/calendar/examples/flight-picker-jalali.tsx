import type { DateRange } from 'react-day-picker';

import { format, startOfYear } from 'date-fns-jalali';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../calendar-jalali';
import { MonthsDropdown } from '../months-dropdown';
import { YearsDropdown } from '../years-dropdown';

const END_YEAR = startOfYear(new Date(2030, 0));

export function FlightPickerJalali() {
  const [selectedDate, setSelectedDate] = useState<DateRange>();
  const [displayedMonth, setDisplayedMonth] = useState(() => new Date());

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
          {selectedDate ? (
            <span className="ButtonContentScroll">
              از {selectedDate.from && format(selectedDate.from, 'PPP')} {selectedDate.to && <>تا {format(selectedDate.to, 'PPP')}</>}
            </span>
          ) : (
            <span>تقویم رفت و برگشت</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 shadow-none">
        <CalendarJalali
          disabled={{ before: new Date() }}
          max={25}
          selected={selectedDate}
          captionLayout="dropdown"
          components={{
            YearsDropdown,
            MonthsDropdown,
          }}
          defaultMonth={selectedDate?.from}
          endMonth={END_YEAR}
          footer={
            <div className="p-3 flex justify-between w-full items-center">
              <div>
                {selectedDate?.from && (
                  <span>
                    <span className="text-neutral-400 ml-1">رفت</span>
                    {format(selectedDate.from, 'd MMMM')}
                  </span>
                )}
                {selectedDate?.to && (
                  <span className="mr-2">
                    - <span className="text-neutral-400 ml-1">برگشت</span>
                    {format(selectedDate.to, 'd MMMM')}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                className="text-chart-5 hover:bg-transparent p-0 hover:text-chart-4"
                variant="ghost"
                onClick={() => setDisplayedMonth(new Date())}
              >
                برو به امروز
              </Button>
            </div>
          }
          formatters={{ formatWeekdayName: date => format(date, 'EEEEEE') }}
          mode="range"
          month={displayedMonth}
          numberOfMonths={2}
          onMonthChange={setDisplayedMonth}
          onSelect={setSelectedDate}
          showOutsideDays={false}
          startMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
          classNames={{
            root: 'w-[650px] min-h-[270px]',
            month_caption: '',
            months: 'flex items-start gap-6 relative',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
