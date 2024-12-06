import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  currentMonth: number;
  onMonthChange: (month: number) => void;
}

export function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onMonthChange(currentMonth - 1)}
        className="p-1 hover:bg-gray-100 rounded-full"
        aria-label="Mês anterior"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <span className="text-lg font-semibold text-gray-900 min-w-[100px] text-center">
        {months[currentMonth]}
      </span>
      <button
        onClick={() => onMonthChange(currentMonth + 1)}
        className="p-1 hover:bg-gray-100 rounded-full"
        aria-label="Próximo mês"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}