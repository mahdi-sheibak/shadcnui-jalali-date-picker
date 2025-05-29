'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

import { getClassNames } from './calendar.styles';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CalendarGregorian({ components, showOutsideDays = true, className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn('p-3', className)}
      components={{
        Chevron(props) {
          if (props.orientation === 'left') return <ChevronRightIcon className="h-4 w-4" />;
          else if (props.orientation === 'right') return <ChevronLeftIcon className="h-4 w-4" />;
          return <span />;
        },
        ...components,
      }}
      showOutsideDays={showOutsideDays}
      classNames={{
        ...getClassNames(props),
        ...classNames,
      }}
      {...props}
    />
  );
}
CalendarGregorian.displayName = 'CalendarGregorian';

export { CalendarGregorian };
