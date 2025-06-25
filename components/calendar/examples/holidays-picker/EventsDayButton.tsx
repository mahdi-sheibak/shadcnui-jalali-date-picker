import type { CalendarDay, Modifiers } from 'react-day-picker';

import { format } from 'date-fns-jalali';

import { cn } from '@/lib/utils';

export const DayButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    day: CalendarDay;
    modifiers: Modifiers;
  },
) => {
  const {
    modifiers: { holidays, events },
    day,
  } = props;

  return (
    <button
      type="button"
      className={cn(
        'relative h-[var(--cell-size)] w-[var(--cell-size)] p-0 font-normal',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-sm">{format(day.date, 'd')}</span>
        <div className="flex gap-1">
          {(holidays || events) && (
            <span
              className={cn('inline-block w-1 h-1 border-2 border-chart-1 rounded-full', holidays ? 'border-chart-1' : 'border-gray-400')}
            />
          )}
        </div>
      </div>
    </button>
  );
};
