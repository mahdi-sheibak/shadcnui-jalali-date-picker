import { addYears, startOfYear, subYears } from 'date-fns';
import { addYears as addYearsJalali, startOfYear as startOfYearJalali, subYears as subYearsJalali } from 'date-fns-jalali';

export const START_YEAR_JALALI = subYearsJalali(startOfYearJalali(new Date()), 12);

export const END_YEAR_JALALI = addYearsJalali(startOfYearJalali(new Date()), 12);

export const START_YEAR_GREGORIAN = subYears(startOfYear(new Date()), 12);
export const END_YEAR_GREGORIAN = addYears(startOfYear(new Date()), 12);
