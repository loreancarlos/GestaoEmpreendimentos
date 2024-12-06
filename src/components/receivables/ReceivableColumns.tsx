import { Receivable } from "../../types";
import {
  formatCurrency,
  formatDateDisplay,
  formatInterestRate,
} from "../../utils/format";

export const getReceivableColumns = (
  clients: Array<{ id: string; name: string }>,
  developments: Array<{ id: string; name: string }>
) => [
  {
    header: "Cliente",
    accessor: "clientId" as const,
    render: (clientId: string) =>
      clients.find((c) => c.id === clientId)?.name || clientId,
  },
  {
    header: "Empreendimento",
    accessor: "developmentId" as const,
    render: (developmentId: string) =>
      developments.find((d) => d.id === developmentId)?.name || developmentId,
  },
  { header: "Quadra", accessor: "blockNumber" as const },
  { header: "Lote", accessor: "lotNumber" as const },
  {
    header: "Data da Compra",
    accessor: "purchaseDate" as const,
    render: (value: string) => formatDateDisplay(value),
  },
  {
    header: "Valor Total",
    accessor: "totalValue" as const,
    render: (value: number) => formatCurrency(Number(value)),
  },
  //{
  //  header: "Valor de Entrada",
  //  accessor: "downPayment" as const,
  //  render: (value: number) => formatCurrency(Number(value)),
  //},
  { header: "Parcelas", accessor: "installments" as const },
  //{
  //  header: "Data da Primeira Parcela",
  //  accessor: "firstInstallmentDate" as const,
  //  render: (value: string) => formatDateDisplay(value),
  //},
  //{
  //  header: "Taxa de Juros",
  //  accessor: "interestRate" as const,
  //  render: (value: number) => formatInterestRate(value),
  //},
  {
    header: "Status",
    accessor: "status" as const,
    render: (value: Receivable["status"]) => {
      const statusMap = {
        active: "Ativo",
        completed: "Concluído",
        defaulted: "Inadimplente",
      };
      const colorMap = {
        active: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        defaulted: "bg-red-100 text-red-800",
      };
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[value]}`}>
          {statusMap[value]}
        </span>
      );
    },
  },
];
