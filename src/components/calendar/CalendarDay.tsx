import React from 'react';
import { CalendarCharge } from '../../types';
import { formatCurrency } from '../../utils/format';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  charges: CalendarCharge[];
}

export function CalendarDay({ date, isCurrentMonth, charges }: CalendarDayProps) {
  const dayClasses = `min-h-[120px] p-2 border border-gray-200 ${
    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
  }`;
  const dayNumberClasses = `text-sm font-medium ${
    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
  }`;

  const totalValue = charges.reduce((sum, charge) => sum + charge.value, 0);

  return (
    <div className={dayClasses}>
      <div className="flex justify-between items-start">
        <span className={dayNumberClasses}>{date.getDate()}</span>
        {charges.length > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {charges.length}
          </span>
        )}
      </div>
      {charges.length > 0 && (
        <div className="mt-2">
          <div className="text-xs font-medium text-gray-900">
            Total: {formatCurrency(totalValue)}
          </div>
          <div className="mt-1 space-y-1">
            {charges.map((charge, index) => (
              <div
                key={index}
                className="text-xs text-gray-600 truncate"
                title={`${charge.clientName} - ${charge.developmentName}`}
              >
                {charge.clientName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}