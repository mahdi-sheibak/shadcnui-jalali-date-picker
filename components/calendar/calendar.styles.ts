import type { ClassNames } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { CalendarProps } from './calendar-gregorian';

export const getClassNames = (props: CalendarProps): Partial<ClassNames> => {
  return {
    root: 'border rounded-md',
    months: 'flex flex-col items-center space-y-4 sm:space-x-4 sm:space-y-0 relative',
    month: 'space-y-4 !m-0 w-full',
    month_caption: 'flex justify-center pt-1 relative items-center',
    caption_label: 'text-sm font-medium',
    dropdown: 'w-fit h-full border border-primary p-2',
    dropdowns: 'flex items-center justify-center gap-3',
    dropdown_root: ' h-full',
    months_dropdown: 'bg-background text-foreground py-1 px-2 rounded-md border-input cursor-pointer',
    years_dropdown: 'bg-background text-foreground py-1 px-2 rounded-md border-input cursor-pointer',
    nav: 'space-x-1 flex items-center justify-between',
    button_next: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50',
      "[&[aria-disabled='true']]:hover:opacity-40 [&[aria-disabled='true']]:hover:bg-transparent [&[aria-disabled='true']]:hover:cursor-default",
      'hover:opacity-100',
      'absolute top-0 left-0 z-10 !m-0',
    ),
    button_previous: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50',
      "[&[aria-disabled='true']]:hover:opacity-40 [&[aria-disabled='true']]:hover:bg-transparent [&[aria-disabled='true']]:hover:cursor-default",
      'hover:opacity-100',
      'absolute top-0 right-0 z-10 !m-0',
    ),
    month_grid: 'w-full border-collapse space-y-1',
    weekdays: 'flex justify-between',
    weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
    week: 'flex w-full mt-2 justify-between',
    day: cn(
      'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
      props.mode === 'range'
        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        : '[&:has([aria-selected])]:rounded-md',
      'group',
    ),
    day_button: cn(
      buttonVariants({ variant: 'ghost' }),
      'h-8 w-8 p-0 font-normal group-[[aria-selected]]:opacity-100',
      'group-hover:group-[[aria-selected]]:bg-primary group-hover:group-[[aria-selected]]:text-primary-foreground',
    ),
    range_start: 'day-range-start',
    range_end: 'day-range-end',
    selected:
      'bg-primary rounded-md text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    today: cn(
      '[&:not([aria-selected])]:bg-primary/10 text-accent-foreground rounded-md',
      props.mode === 'range' ? 'aria-selected:text-chart-4' : 'aria-selected:bg-primary aria-selected:text-chart-4',
    ),
    outside: 'day-outside text-muted-foreground opacity-50 aria-selected:bg-primary/60',
    disabled: 'text-muted-foreground opacity-50',
    range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    hidden: 'invisible w-8',
  };
};
