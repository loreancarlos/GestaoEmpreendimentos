import { API_URL } from "../config";

class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_URL;
    this.token = localStorage.getItem("token");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "An error occurred");
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    this.setToken(response.token);
    return response;
  }

  // Users
  async getUsers() {
    return this.request<any[]>("/users");
  }

  async createUser(data: any) {
    return this.request<any>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: string, data: any) {
    return this.request<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request<void>(`/users/${id}`, {
      method: "DELETE",
    });
  }

  async toggleUserStatus(id: string) {
    return this.request<any>(`/users/${id}/toggle-status`, {
      method: "PATCH",
    });
  }

  // Clients
  async getClients() {
    return this.request<any[]>("/clients");
  }

  async createClient(data: any) {
    return this.request<any>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateClient(id: string, data: any) {
    return this.request<any>(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: string) {
    return this.request<void>(`/clients/${id}`, {
      method: "DELETE",
    });
  }

  // Developments
  async getDevelopments() {
    return this.request<any[]>("/developments");
  }

  async createDevelopment(data: any) {
    return this.request<any>("/developments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateDevelopment(id: string, data: any) {
    return this.request<any>(`/developments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteDevelopment(id: string) {
    return this.request<void>(`/developments/${id}`, {
      method: "DELETE",
    });
  }

  // Receivables
  async getReceivables() {
    return this.request<any[]>("/receivables");
  }

  async createReceivable(data: any) {
    return this.request<any>("/receivables", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateReceivable(id: string, data: any) {
    return this.request<any>(`/receivables/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteReceivable(id: string) {
    return this.request<void>(`/receivables/${id}`, {
      method: "DELETE",
    });
  }

  async updateInstallmentStatus(
    receivableId: string,
    installmentNumber: number,
    data: { billIssued: boolean; billPaid: boolean }
  ) {
    return this.request<any>(
      `/receivables/${receivableId}/installments/${installmentNumber}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
  }
}

export const api = new ApiClient();
