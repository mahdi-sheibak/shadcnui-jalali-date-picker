'use client';

import React from 'react';

import { MainLayout } from '@/app/main-layout';
import { CalendarGregorian } from '@/components/calendar/calendar-gregorian';
import { BookedPickerGregorian } from '@/components/calendar/examples/booked-picker-gregorian';
import { DropdownPickerGregorian } from '@/components/calendar/examples/dropdown-picker-gregorian';
import { MultiplePickerGregorian } from '@/components/calendar/examples/multiple-picker-gregorian';
import { RangePickerGregorian } from '@/components/calendar/examples/range-picker-gregorian';
import { DatePickerGregorian } from '@/components/calendar/examples/single-picker-gregorian';
import { gregorianFormatWeekdayName } from '@/lib/calendar';

export default function GregorianCalendarPage() {
  return (
    <MainLayout dir="lrt" lang="en">
      <div className="z-10 mb-36 flex flex-col gap-12">
        <div className="space-y-5">
          <h3>Gregorian Calendars</h3>
          <div
            className={`
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            `}
          >
            <DatePickerGregorian />
            <RangePickerGregorian />
            <MultiplePickerGregorian />
          </div>
          <div
            className={`
              my-5 grid grid-cols-1 gap-4
              lg:grid-cols-2
            `}
          >
            <CalendarGregorian mode="single" />
            <div className="w-[400px]">
              <CalendarGregorian formatters={{ formatWeekdayName: gregorianFormatWeekdayName }} mode="single" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3>Advanced Calenders</h3>
          <div
            className={`
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            `}
          >
            <DropdownPickerGregorian />
            <BookedPickerGregorian />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
