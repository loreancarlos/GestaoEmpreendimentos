export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  active: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Client {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
}

export interface Development {
  id: string;
  name: string;
  location: string;
  totalLots: number;
  startDate: string;
  description: string;
}

export interface Receivable {
  id: string;
  clientId: string;
  developmentId: string;
  blockNumber: string;
  lotNumber: string;
  totalValue: number;
  downPayment: number;
  installments: number;
  firstInstallmentDate: string;
  purchaseDate: string; // New field
  interestRate: number;
  status: 'active' | 'completed' | 'defaulted';
  installmentStatus?: InstallmentStatus[];
}

export interface InstallmentStatus {
  installmentNumber: number;
  dueDate: string;
  value: number;
  billIssued: boolean;
  billPaid: boolean;
}

export interface CalendarCharge {
  clientId: string;
  clientName: string;
  developmentId: string;
  developmentName: string;
  value: number;
  dueDate: Date;
  installmentNumber: number;
  totalInstallments: number;
}