'use client';

import React from 'react';

import { CalendarJalali } from '@/components/calendar/calendar-jalali';
import { BookedPickerJalali } from '@/components/calendar/examples/booked-picker-jalali';
import { DropdownPickerJalali } from '@/components/calendar/examples/dropdown-picker-jalali';
import { MonthlyDropdownPickerJalali } from '@/components/calendar/examples/monthly-dropdown-picker-jalali';
import { MultiplePickerJalali } from '@/components/calendar/examples/multiple-picker-jalali';
import { RangePickerJalali } from '@/components/calendar/examples/range-picker-jalali';
import { DatePickerJalali } from '@/components/calendar/examples/single-picker-jalali';
import { YearlyDropdownPickerJalali } from '@/components/calendar/examples/yearly-dropdown-picker-jalali';
import LayoutWrapper from '@/components/LayoutWrapper';
import { jalaliFormatWeekdayName } from '@/lib/calendar';

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="flex flex-col gap-12 z-10 mb-36">
        <div className="space-y-5">
          <h3>تقویم های جلالی</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DatePickerJalali />
            <RangePickerJalali />
            <MultiplePickerJalali />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
            <CalendarJalali mode="single" />
            <div className="w-[400px]">
              <CalendarJalali formatters={{ formatWeekdayName: jalaliFormatWeekdayName }} mode="single" />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <h3>تقویم های پیشرفته</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DropdownPickerJalali />
            <BookedPickerJalali />
            <MonthlyDropdownPickerJalali />
            <YearlyDropdownPickerJalali />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
