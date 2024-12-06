import React from 'react';
import { Development } from '../../types';

interface CalendarFiltersProps {
  selectedDevelopment: string;
  onDevelopmentChange: (value: string) => void;
  developments: Development[];
}

export function CalendarFilters({
  selectedDevelopment,
  onDevelopmentChange,
  developments,
}: CalendarFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-64">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empreendimento
        </label>
        <select
          value={selectedDevelopment}
          onChange={(e) => onDevelopmentChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Todos os empreendimentos</option>
          {developments.map((development) => (
            <option key={development.id} value={development.id}>
              {development.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}