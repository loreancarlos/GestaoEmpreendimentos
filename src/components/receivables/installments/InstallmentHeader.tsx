import React from "react";
import { Client, Development, Receivable } from "../../../types";
import {
  formatCurrency,
  formatDateDisplay,
  formatInterestRate,
} from "../../../utils/format";

interface InstallmentHeaderProps {
  client: Client;
  development: Development;
  receivable: Receivable;
  totalWithInterest: number;
}

export function InstallmentHeader({
  client,
  development,
  receivable,
  totalWithInterest,
}: InstallmentHeaderProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-3">
        Informações do Recebível
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Cliente</dt>
          <dd className="mt-1 text-sm text-gray-900">{client.name}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Empreendimento</dt>
          <dd className="mt-1 text-sm text-gray-900">{development.name}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Quadra/Lote</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {receivable.blockNumber}/{receivable.lotNumber}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Data da Compra</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {formatDateDisplay(receivable.purchaseDate)}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Valor da Unidade
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            {formatCurrency(Number(receivable.totalValue))}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Valor da Entrada
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            {formatCurrency(Number(receivable.downPayment))}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Total (Juros Projetados)
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            {formatCurrency(totalWithInterest)}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Taxa de Juros (a.a.)
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            {formatInterestRate(Number(receivable.interestRate))}
          </dd>
        </div>
      </div>
    </div>
  );
}
