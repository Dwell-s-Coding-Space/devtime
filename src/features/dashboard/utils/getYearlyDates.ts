export const getYearlyDates = (year: number) => {
  const dates: string[] = [];
  const startDate = getFirstDayOfWeek(new Date(year, 0, 1));
  const endDate = getLastDayOfWeek(new Date(year, 11, 31));
  const date = startDate;

  while (date >= startDate && date <= endDate) {
    dates.push(date.toLocaleDateString('sv-SE'));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export function getFirstDayOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function getLastDayOfWeek(date: Date) {
  const lastDay = new Date(date);
  lastDay.setDate(date.getDate() + (6 - date.getDay()));
  return lastDay;
}
