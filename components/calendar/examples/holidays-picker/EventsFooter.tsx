import { format } from 'date-fns-jalali';

import type { Events } from '@/types';

import { Button } from '@/components/ui/button';

interface EventsFooter {
  selectedDate?: Date;
  setDisplayedMonth: React.Dispatch<React.SetStateAction<Date>>;
  holidaysDates: Events[] | undefined;
  eventsDates: Events[] | undefined;
}

export function EventsFooter({ selectedDate, setDisplayedMonth, holidaysDates, eventsDates }: EventsFooter) {
  const dayStr = selectedDate ? format(selectedDate, 'd') : '';
  const monthStr = selectedDate ? format(selectedDate, 'M') : '';
  function filterEvents(events: Events[] | undefined) {
    return events?.filter(e => selectedDate && e.day.toString() === dayStr && e.month.toString() === monthStr) ?? [];
  }
  const holidaysEvents = filterEvents(holidaysDates);
  const regularEvents = filterEvents(eventsDates);

  return (
    <div className="py-1 space-y-2">
      <div className="w-full flex justify-between items-center">
        {selectedDate && (regularEvents.length > 0 || holidaysEvents.length > 0) ? (
          <span className="text-sm">رویداد های {format(selectedDate, 'd MMMMMM')}</span>
        ) : (
          <span className="text-xs">رویدادی موجود نیست</span>
        )}
        <Button
          size="sm"
          className="text-chart-5 hover:bg-transparent p-0 hover:text-chart-4"
          variant="ghost"
          onClick={() => setDisplayedMonth(new Date())}
        >
          برو به امروز
        </Button>
      </div>
      <div className="max-h-11 w-full overflow-y-auto flex flex-col">
        {holidaysEvents.length > 0 &&
          holidaysEvents.map(event => (
            <span className="w-full text-chart-1 text-xs" key={event.title}>
              {event.title}
            </span>
          ))}
        {regularEvents.length > 0 &&
          regularEvents.map(event => (
            <span className="w-full text-gray-400 text-xs" key={event.title}>
              {event.title}
            </span>
          ))}
      </div>
    </div>
  );
}
