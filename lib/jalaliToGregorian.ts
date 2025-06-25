export const JalaliDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as number[],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29] as number[],

  jalaliToGregorian(jalaliYear: number, jalaliMonth: number, jalaliDay: number): [string, string, string] {
    const jy = jalaliYear - 979;
    const jm = jalaliMonth - 1;
    const jd = jalaliDay - 1;

    let jalaliDayN = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);

    for (let i = 0; i < jm; ++i) {
      jalaliDayN += JalaliDate.j_days_in_month[i];
    }

    jalaliDayN += jd;

    let gregorianDayN = jalaliDayN + 79;

    let gy = 1600 + 400 * Math.floor(gregorianDayN / 146097);
    gregorianDayN %= 146097;

    let leap = true;
    if (gregorianDayN >= 36525) {
      gregorianDayN--;
      gy += 100 * Math.floor(gregorianDayN / 36524);
      gregorianDayN %= 36524;

      if (gregorianDayN >= 365) {
        gregorianDayN++;
      } else {
        leap = false;
      }
    }

    gy += 4 * Math.floor(gregorianDayN / 1461);
    gregorianDayN %= 1461;

    if (gregorianDayN >= 366) {
      leap = false;
      gregorianDayN--;
      gy += Math.floor(gregorianDayN / 365);
      gregorianDayN %= 365;
    }

    let i = 0;
    while (gregorianDayN >= JalaliDate.g_days_in_month[i] + (i === 1 && leap ? 1 : 0)) {
      gregorianDayN -= JalaliDate.g_days_in_month[i] + (i === 1 && leap ? 1 : 0);
      i++;
    }

    const gm = i + 1;
    const gd = gregorianDayN + 1;

    const gmStr = gm < 10 ? `0${gm}` : gm.toString();
    const gdStr = gd < 10 ? `0${gd}` : gd.toString();

    return [gy.toString(), gmStr, gdStr];
  },

  jalaliToJSDate(jalaliYear: number, jalaliMonth: number, jalaliDay: number): Date {
    const [gy, gm, gd] = JalaliDate.jalaliToGregorian(jalaliYear, jalaliMonth, jalaliDay);
    return new Date(Number(gy), Number(gm) - 1, Number(gd));
  },
};
