export interface InstallmentStatus {
  installmentNumber: number;
  dueDate: Date;
  value: number;
  billIssued: boolean;
  billPaid: boolean;
}

export interface InstallmentStatusMap {
  [key: number]: {
    billIssued: boolean;
    billPaid: boolean;
  };
}