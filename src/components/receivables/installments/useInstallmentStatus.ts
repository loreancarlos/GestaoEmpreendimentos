import { useState, useEffect } from "react";
import { Receivable } from "../../../types";
import { calculateInstallmentWithInterest } from "../../../utils/interest";
import { addMonths } from "../../../utils/dates";
import { InstallmentStatus, InstallmentStatusMap } from "./types";

export function useInstallmentStatus(receivable: Receivable) {
  const [localInstallmentStatus, setLocalInstallmentStatus] =
    useState<InstallmentStatusMap>({});

  const baseInstallmentValue =
    (receivable.totalValue - receivable.downPayment) / receivable.installments;

  useEffect(() => {
    const statusMap: InstallmentStatusMap = {};
    receivable.installmentStatus?.forEach((status) => {
      statusMap[status.installmentNumber] = {
        billIssued: status.billIssued,
        billPaid: status.billPaid,
      };
    });
    setLocalInstallmentStatus(statusMap);
  }, [receivable.installmentStatus]);

  const calculateInstallmentValue = (installmentNumber: number): number => {
    return calculateInstallmentWithInterest(
      baseInstallmentValue,
      Number(receivable.interestRate) || 0,
      new Date(receivable.firstInstallmentDate),
      installmentNumber
    );
  };

  const getInstallmentStatus = (
    installmentNumber: number
  ): InstallmentStatus => {
    const localStatus = localInstallmentStatus[installmentNumber];
    const installmentValue = calculateInstallmentValue(installmentNumber);
    const firstInstallmentDate = new Date(receivable.firstInstallmentDate);
    const dueDate = addMonths(firstInstallmentDate, installmentNumber - 1);

    return {
      installmentNumber,
      dueDate,
      value: installmentValue,
      billIssued: localStatus?.billIssued || false,
      billPaid: localStatus?.billPaid || false,
    };
  };

  const calculateTotalWithInterest = (): number => {
    let total = Number(receivable.downPayment);
    for (let i = 1; i <= receivable.installments; i++) {
      total += calculateInstallmentValue(i);
    }
    return total;
  };

  const handleStatusChange = (
    installmentNumber: number,
    field: "billIssued" | "billPaid",
    value: boolean
  ) => {
    const currentStatus = localInstallmentStatus[installmentNumber] || {
      billIssued: false,
      billPaid: false,
    };

    const newStatus = {
      ...currentStatus,
      [field]: value,
      ...(field === "billIssued" && !value ? { billPaid: false } : {}),
    };

    setLocalInstallmentStatus((prev) => ({
      ...prev,
      [installmentNumber]: newStatus,
    }));

    return newStatus;
  };

  return {
    getInstallmentStatus,
    handleStatusChange,
    calculateTotalWithInterest,
  };
}
