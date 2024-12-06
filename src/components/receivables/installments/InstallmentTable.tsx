import React from "react";
import { formatCurrency, formatDateDisplay } from "../../../utils/format";
import { InstallmentStatus } from "./types";

interface InstallmentTableProps {
  installments: number;
  getInstallmentStatus: (installmentNumber: number) => InstallmentStatus;
  onStatusChange: (
    installmentNumber: number,
    field: "billIssued" | "billPaid",
    value: boolean
  ) => void;
}

export function InstallmentTable({
  installments,
  getInstallmentStatus,
  onStatusChange,
}: InstallmentTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Parcela
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Vencimento
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Valor
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Boleto Emitido
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Boleto Pago
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: installments }).map((_, index) => {
              const installmentNumber = index + 1;
              const status = getInstallmentStatus(installmentNumber);

              return (
                <tr key={installmentNumber} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {installmentNumber}/{installments}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {formatDateDisplay(status.dueDate.toString())}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {formatCurrency(status.value)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={status.billIssued}
                        onChange={(e) =>
                          onStatusChange(
                            installmentNumber,
                            "billIssued",
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={status.billPaid}
                        onChange={(e) =>
                          onStatusChange(
                            installmentNumber,
                            "billPaid",
                            e.target.checked
                          )
                        }
                        disabled={!status.billIssued}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
