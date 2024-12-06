import React from "react";
import { Receivable } from "../../types";
import { formatDate } from "../../utils/format";

interface ReceivableFormProps {
  formData: {
    clientId: string;
    developmentId: string;
    blockNumber: string;
    lotNumber: string;
    totalValue: number;
    downPayment: number;
    installments: number;
    firstInstallmentDate: string;
    purchaseDate: string;
    interestRate: number;
    status: Receivable["status"];
  };
  setFormData: (data: any) => void;
  clients: Array<{ id: string; name: string }>;
  developments: Array<{ id: string; name: string }>;
  isEditing: boolean;
}

export function ReceivableForm({
  formData,
  setFormData,
  clients,
  developments,
  isEditing,
}: ReceivableFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cliente
        </label>
        <select
          value={formData.clientId}
          onChange={(e) =>
            setFormData({ ...formData, clientId: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required>
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Empreendimento
        </label>
        <select
          value={formData.developmentId}
          onChange={(e) =>
            setFormData({ ...formData, developmentId: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required>
          <option value="">Selecione um empreendimento</option>
          {developments.map((development) => (
            <option key={development.id} value={development.id}>
              {development.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número da Quadra
        </label>
        <input
          type="text"
          value={formData.blockNumber}
          onChange={(e) =>
            setFormData({ ...formData, blockNumber: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número do Lote
        </label>
        <input
          type="text"
          value={formData.lotNumber}
          onChange={(e) =>
            setFormData({ ...formData, lotNumber: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data da Compra
        </label>
        <input
          type="date"
          value={formatDate(formData.purchaseDate)}
          onChange={(e) =>
            setFormData({ ...formData, purchaseDate: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Valor Total
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.totalValue}
          onChange={(e) =>
            setFormData({
              ...formData,
              totalValue: parseFloat(e.target.value) || 0,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Valor de Entrada
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.downPayment}
          onChange={(e) =>
            setFormData({
              ...formData,
              downPayment: parseFloat(e.target.value) || 0,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número de Parcelas
        </label>
        <input
          type="number"
          min="1"
          value={formData.installments}
          onChange={(e) =>
            setFormData({
              ...formData,
              installments: parseInt(e.target.value, 10) || 0,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data da Primeira Parcela
        </label>
        <input
          type="date"
          value={formatDate(formData.firstInstallmentDate)}
          onChange={(e) =>
            setFormData({ ...formData, firstInstallmentDate: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Taxa de Juros (% a.a.)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.interestRate}
          onChange={(e) =>
            setFormData({
              ...formData,
              interestRate: parseFloat(e.target.value) || 0,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as Receivable["status"],
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required>
          <option value="active">Ativo</option>
          <option value="completed">Concluído</option>
          <option value="defaulted">Inadimplente</option>
        </select>
      </div>
    </div>
  );
}