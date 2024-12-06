import React from "react";
import { formatDate } from "../../utils/format";

interface DevelopmentFormProps {
  formData: {
    name: string;
    location: string;
    totalLots: string;
    startDate: string;
    description: string;
  };
  setFormData: (data: any) => void;
  isEditing: boolean;
}

export function DevelopmentForm({
  formData,
  setFormData,
  isEditing,
}: DevelopmentFormProps) {
  const handleTotalLotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === "" || parseInt(value, 10) >= 0) {
      setFormData({
        ...formData,
        totalLots: value,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Localização
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Total de Lotes
        </label>
        <input
          type="number"
          min="0"
          value={formData.totalLots}
          onChange={handleTotalLotsChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data de Início
        </label>
        <input
          type="date"
          value={formatDate(formData.startDate)}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
    </div>
  );
}