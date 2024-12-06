import React from "react";
import { ModalLarge } from "../common/ModalLarge";
import { Receivable, Client, Development } from "../../types";
import { InstallmentHeader } from "./installments/InstallmentHeader";
import { InstallmentTable } from "./installments/InstallmentTable";
import { useInstallmentStatus } from "./installments/useInstallmentStatus";

interface InstallmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  receivable: Receivable;
  client: Client;
  development: Development;
  onUpdateInstallmentStatus: (
    receivableId: string,
    installmentNumber: number,
    updates: { billIssued?: boolean; billPaid?: boolean }
  ) => void;
}

export function InstallmentsModal({
  isOpen,
  onClose,
  receivable,
  client,
  development,
  onUpdateInstallmentStatus,
}: InstallmentsModalProps) {
  const { getInstallmentStatus, handleStatusChange, calculateTotalWithInterest } = 
    useInstallmentStatus(receivable);

  const handleStatusUpdate = (
    installmentNumber: number,
    field: "billIssued" | "billPaid",
    value: boolean
  ) => {
    const newStatus = handleStatusChange(installmentNumber, field, value);
    onUpdateInstallmentStatus(receivable.id, installmentNumber, {
      [field]: value,
    });
  };

  return (
    <ModalLarge isOpen={isOpen} onClose={onClose} title="Detalhes das Parcelas">
      <div className="space-y-6">
        <InstallmentHeader
          client={client}
          development={development}
          receivable={receivable}
          totalWithInterest={calculateTotalWithInterest()}
        />
        <InstallmentTable
          installments={receivable.installments}
          getInstallmentStatus={getInstallmentStatus}
          onStatusChange={handleStatusUpdate}
        />
      </div>
    </ModalLarge>
  );
}