"use client";
import React from "react";
import { DatePickerJalali } from "@/components/ui/date-picker-jalali";

export default function Home() {
  return (
    <div className="flex justify-center flex-col gap-5 items-center z-10">
      <h2>App</h2>

      <DatePickerJalali />
    </div>
  );
}
