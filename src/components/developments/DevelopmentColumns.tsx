import { Development } from "../../types";
import { formatDateDisplay } from "../../utils/format";

export const getDevelopmentColumns = () => [
  { header: "Nome", accessor: "name" as const },
  { header: "Localização", accessor: "location" as const },
  {
    header: "Total de Lotes",
    accessor: "totalLots" as const,
    render: (value: number) => value.toString(),
  },
  {
    header: "Data de Início", 
    accessor: "startDate" as const,
    render: (value: string) => formatDateDisplay(value),
  },
];