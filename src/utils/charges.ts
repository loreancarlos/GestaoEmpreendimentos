import { Receivable, Client, Development, CalendarCharge } from "../types";
import { addMonths } from "./dates";

export function getMonthlyCharges(
  receivables: Receivable[],
  clients: Client[],
  developments: Development[],
  currentDate: Date
): CalendarCharge[] {
  const charges: CalendarCharge[] = [];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  receivables.forEach((receivable) => {
    if (receivable.status !== "active") return;

    const client = clients.find((c) => c.id === receivable.clientId);
    const development = developments.find(
      (d) => d.id === receivable.developmentId
    );

    if (!client || !development) return;

    const firstInstallmentDate = new Date(receivable.firstInstallmentDate);
    firstInstallmentDate.setHours(firstInstallmentDate.getHours() + 3);
    const installmentValue =
      (receivable.totalValue - receivable.downPayment) /
      receivable.installments;

    // Calculate all installments for this receivable
    for (let i = 0; i < receivable.installments; i++) {
      const dueDate = addMonths(firstInstallmentDate, i);

      // Only include charges for the current month/year
      if (
        dueDate.getMonth() === currentMonth &&
        dueDate.getFullYear() === currentYear
      ) {
        charges.push({
          clientId: client.id,
          clientName: client.name,
          developmentId: development.id,
          developmentName: development.name,
          value: installmentValue,
          dueDate: dueDate,
          installmentNumber: i + 1,
          totalInstallments: receivable.installments,
        });
      }
    }
  });

  return charges;
}
