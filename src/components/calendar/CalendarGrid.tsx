import React from "react";
import { CalendarDay } from "./CalendarDay";
import { CalendarCharge } from "../../types";
import { getDaysInMonth, getFirstDayOfMonth } from "../../utils/dates";

interface CalendarGridProps {
  currentDate: Date;
  charges: CalendarCharge[];
}

export function CalendarGrid({ currentDate, charges }: CalendarGridProps) {
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  // Get days from previous month to fill the calendar
  const daysFromPreviousMonth = firstDayOfMonth;
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1
  );
  const daysInPreviousMonth = getDaysInMonth(previousMonth);

  // Get days from next month to fill the calendar
  const totalDays = daysFromPreviousMonth + daysInMonth;
  const daysFromNextMonth = Math.ceil(totalDays / 7) * 7 - totalDays;

  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = [];

  // Add days from previous month
  for (
    let i = daysInPreviousMonth - daysFromPreviousMonth + 1;
    i <= daysInPreviousMonth;
    i++
  ) {
    calendarDays.push({
      date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), i),
      isCurrentMonth: false,
    });
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
      isCurrentMonth: true,
    });
  }

  // Add days from next month
  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );
  for (let i = 1; i <= daysFromNextMonth; i++) {
    calendarDays.push({
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
      isCurrentMonth: false,
    });
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-7 gap-px border-b">
        {weekDays.map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-sm font-medium text-gray-700 bg-gray-50">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const dayCharges = charges.filter(
            (charge) =>
              charge.dueDate.getDate() === date.getDate() &&
              charge.dueDate.getMonth() === date.getMonth() &&
              charge.dueDate.getFullYear() === date.getFullYear()
          );

          return (
            <CalendarDay
              key={index}
              date={date}
              isCurrentMonth={isCurrentMonth}
              charges={dayCharges}
            />
          );
        })}
      </div>
    </div>
  );
}
