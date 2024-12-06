import React from 'react';
import { YearSelector } from './YearSelector';
import { MonthSelector } from './MonthSelector';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export function CalendarHeader({
  currentDate,
  onYearChange,
  onMonthChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <MonthSelector
        currentMonth={currentDate.getMonth()}
        onMonthChange={onMonthChange}
      />
      <YearSelector
        currentYear={currentDate.getFullYear()}
        onYearChange={onYearChange}
      />
    </div>
  );
}