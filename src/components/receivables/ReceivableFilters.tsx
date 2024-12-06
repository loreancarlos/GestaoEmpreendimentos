import React from 'react';
import { Development, Receivable } from '../../types';
import { SearchInput } from '../common/SearchInput';

interface ReceivableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDevelopment: string;
  onDevelopmentChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  developments: Development[];
}

export function ReceivableFilters({
  searchTerm,
  onSearchChange,
  selectedDevelopment,
  onDevelopmentChange,
  selectedStatus,
  onStatusChange,
  developments,
}: ReceivableFiltersProps) {
  const statusOptions: { value: Receivable['status'] | ''; label: string }[] = [
    { value: '', label: 'Todos os status' },
    { value: 'active', label: 'Ativo' },
    { value: 'completed', label: 'Concluído' },
    { value: 'defaulted', label: 'Inadimplente' },
  ];

  return (
    <div className="space-y-4">
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Pesquisar por cliente, quadra ou lote..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}