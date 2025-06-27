'use client';

import React from 'react';

import { MainLayout } from '@/app/main-layout';
import { CalendarJalali } from '@/components/calendar/calendar-jalali';
import { BookedPickerJalali } from '@/components/calendar/examples/booked-picker-jalali';
import { DropdownPickerJalali } from '@/components/calendar/examples/dropdown-picker-jalali';
import { MonthPickerJalali } from '@/components/calendar/examples/month-picker-jalali';
import { MultiplePickerJalali } from '@/components/calendar/examples/multiple-picker-jalali';
import { RangePickerJalali } from '@/components/calendar/examples/range-picker-jalali';
import { DatePickerJalali } from '@/components/calendar/examples/single-picker-jalali';
import { YearNavigationJalali } from '@/components/calendar/examples/year-navigation-jalali';
import { YearPickerJalali } from '@/components/calendar/examples/year-picker-jalali';
import { jalaliFormatWeekdayName } from '@/lib/calendar';

export default function Home() {
  return (
    <MainLayout dir="rtl" lang="fa">
      <div className="z-10 mb-36 flex flex-col gap-12">
        <div className="space-y-5">
          <h3>تقویم های جلالی</h3>
          <div
            className={`
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            `}
          >
            <DatePickerJalali />
            <RangePickerJalali />
            <MultiplePickerJalali />
          </div>
          <div
            className={`
              my-5 grid grid-cols-1 gap-4
              lg:grid-cols-2
            `}
          >
            <CalendarJalali mode="single" />
            <div className="w-[400px]">
              <CalendarJalali formatters={{ formatWeekdayName: jalaliFormatWeekdayName }} mode="single" />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <h3>تقویم های پیشرفته</h3>
          <div
            className={`
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            `}
          >
            <DropdownPickerJalali />
            <BookedPickerJalali />
            <MonthPickerJalali />
            <YearPickerJalali />
            <YearNavigationJalali />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
