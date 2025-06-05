import type { Dispatch, SetStateAction } from 'react';
import type { NextMonthButtonProps, PreviousMonthButtonProps } from 'react-day-picker';

import { ChevronLeftIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { addYears, format, startOfYear, subYears } from 'date-fns-jalali';
import { Calendar as CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { jalaliFormatWeekdayName } from '@/lib/calendar';
import { cn } from '@/lib/utils';

import { CalendarJalali } from '../calendar-jalali';
import { MonthsDropdown } from '../months-dropdown';
import YearNavigation from '../year-navigation';
import { YearsDropdown } from '../years-dropdown';

const START_YEAR = startOfYear(new Date(2010, 0));
const END_YEAR = startOfYear(new Date(2030, 0));

export function YearNavigationJalali() {
  // Without separating these states, any change to the navigation or dropdown would also update the selected date,
  // (consider that selected is just for selecting a date not navigate) which is not the intended behavior of DayPicker.
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [displayedMonth, setDisplayedMonth] = useState(() => new Date());

  function NextMonthButton(props: NextMonthButtonProps) {
    return NextMonthButtonWrapper({ displayedMonth, setDisplayedMonth, ...props });
  }

  function PreviousMonthButton(props: PreviousMonthButtonProps) {
    return PreviousMonthButtonWrapper({ displayedMonth, setDisplayedMonth, ...props });
  }

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
          {selectedDate ? <span>{format(selectedDate, 'PPP')}</span> : <span>پیمایش سال (Year Navigation)</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 shadow-none">
        <CalendarJalali
          selected={selectedDate}
          captionLayout="dropdown"
          components={{
            YearsDropdown,
            MonthsDropdown,
            NextMonthButton,
            PreviousMonthButton,
          }}
          defaultMonth={selectedDate}
          endMonth={END_YEAR}
          formatters={{ formatWeekdayName: jalaliFormatWeekdayName }}
          mode="single"
          month={displayedMonth}
          onMonthChange={setDisplayedMonth}
          onSelect={setSelectedDate}
          startMonth={START_YEAR}
          classNames={{
            root: 'w-[380px] min-h-[330px]',
            month_caption: '',
            months: 'flex flex-col items-center space-y-4 sm:space-x-4 sm:space-y-0 relative',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

interface DisplayedMonthProps {
  displayedMonth: Date;
  setDisplayedMonth: Dispatch<SetStateAction<Date>>;
}

function NextMonthButtonWrapper({ displayedMonth, setDisplayedMonth, ...props }: DisplayedMonthProps & NextMonthButtonProps) {
  return (
    <YearNavigation
      isDisabled={displayedMonth.getFullYear() >= END_YEAR.getFullYear()}
      monthClassName="!left-9"
      monthContent={<ChevronLeftIcon className="h-4 w-4" />}
      onClick={() => setDisplayedMonth(addYears(displayedMonth, 1))}
      props={props}
      yearContent={<DoubleArrowLeftIcon className="h-4 w-4" />}
      yearDirection="next"
    />
  );
}

function PreviousMonthButtonWrapper({ displayedMonth, setDisplayedMonth, ...props }: DisplayedMonthProps & PreviousMonthButtonProps) {
  return (
    <YearNavigation
      isDisabled={displayedMonth.getFullYear() <= START_YEAR.getFullYear()}
      monthClassName="!right-9"
      monthContent={<ChevronRightIcon className="h-4 w-4" />}
      onClick={() => setDisplayedMonth(subYears(displayedMonth, 1))}
      props={props}
      yearContent={<DoubleArrowRightIcon className="h-4 w-4" />}
      yearDirection="prev"
    />
  );
}
