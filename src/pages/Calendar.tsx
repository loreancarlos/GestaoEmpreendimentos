import React, { useState, useMemo } from 'react';
import { CalendarFilters } from '../components/calendar/CalendarFilters';
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { useReceivableStore } from '../store/receivableStore';
import { useClientStore } from '../store/clientStore';
import { useDevelopmentStore } from '../store/developmentStore';
import { getMonthlyCharges } from '../utils/charges';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDevelopment, setSelectedDevelopment] = useState('');
  
  const { receivables } = useReceivableStore();
  const { clients } = useClientStore();
  const { developments } = useDevelopmentStore();

  const charges = useMemo(() => {
    const allCharges = getMonthlyCharges(receivables, clients, developments, currentDate);
    return selectedDevelopment
      ? allCharges.filter((charge) => charge.developmentId === selectedDevelopment)
      : allCharges;
  }, [receivables, clients, developments, currentDate, selectedDevelopment]);

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate);
    if (month < 0) {
      newDate.setFullYear(newDate.getFullYear() - 1);
      month = 11;
    } else if (month > 11) {
      newDate.setFullYear(newDate.getFullYear() + 1);
      month = 0;
    }
    newDate.setMonth(month);
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendário de Cobranças</h1>
        <CalendarFilters
          selectedDevelopment={selectedDevelopment}
          onDevelopmentChange={setSelectedDevelopment}
          developments={developments}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <CalendarHeader
          currentDate={currentDate}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onPreviousMonth={() => handleMonthChange(currentDate.getMonth() - 1)}
          onNextMonth={() => handleMonthChange(currentDate.getMonth() + 1)}
        />
        <CalendarGrid
          currentDate={currentDate}
          charges={charges}
        />
      </div>
    </div>
  );
}