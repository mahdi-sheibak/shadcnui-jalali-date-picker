'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { faIR } from 'date-fns-jalali/locale';
import * as React from 'react';
import { DayPicker } from 'react-day-picker/jalali';

import { cn } from '@/lib/utils';

import { getClassNames } from './calendar.styles';

export type CalendarJalaliProps = React.ComponentProps<typeof DayPicker>;

function CalendarJalali({ components, showOutsideDays = true, className, classNames, ...props }: CalendarJalaliProps) {
  return (
    <DayPicker
      dir="rtl"
      className={cn('p-3', className)}
      components={{
        Chevron(props) {
          if (props.orientation === 'left') return <ChevronRightIcon className="h-4 w-4" />;
          else if (props.orientation === 'right') return <ChevronLeftIcon className="h-4 w-4" />;
          return <span />;
        },
        ...components,
      }}
      locale={faIR}
      showOutsideDays={showOutsideDays}
      classNames={{
        ...getClassNames(props),
        ...classNames,
      }}
      {...props}
    />
  );
}
CalendarJalali.displayName = 'CalendarJalali';

export { CalendarJalali };
