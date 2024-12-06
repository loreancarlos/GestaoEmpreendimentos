import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface YearSelectorProps {
  currentYear: number;
  onYearChange: (year: number) => void;
}

export function YearSelector({ currentYear, onYearChange }: YearSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onYearChange(currentYear - 1)}
        className="p-1 hover:bg-gray-100 rounded-full"
        aria-label="Ano anterior"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <span className="text-lg font-semibold text-gray-900">{currentYear}</span>
      <button
        onClick={() => onYearChange(currentYear + 1)}
        className="p-1 hover:bg-gray-100 rounded-full"
        aria-label="Próximo ano"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}