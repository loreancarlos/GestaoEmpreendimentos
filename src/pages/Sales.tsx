import React, { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useSaleStore } from "../store/saleStore";
import { useClientStore } from "../store/clientStore";
import { useDevelopmentStore } from "../store/developmentStore";
import { useUserStore } from "../store/userStore";
import { Table } from "../components/common/Table";
import { Modal } from "../components/common/Modal";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { SaleFilters } from "../components/sales/SaleFilters";
import { SaleForm } from "../components/sales/SaleForm";
import { SaleDetailsModal } from "../components/sales/SaleDetailsModal";
import { getSaleColumns } from "../components/sales/SaleColumns";
import { Sale } from "../types";

const initialFormData = {
  clientId: "",
  secondBuyerId: null,
  developmentId: "",
  brokerId: "",
  blockNumber: "",
  lotNumber: "",
  totalValue: 0,
  downPaymentInstallments: "1" as const,
  purchaseDate: "",
  commissionValue: 0,
  status: "waiting_contract" as const,
};

export function Sales() {
  const {
    sales,
    loading: salesLoading,
    error: salesError,
    fetchSales,
    addSale,
    updateSale,
    deleteSale,
  } = useSaleStore();
  const { clients, loading: clientsLoading, fetchClients } = useClientStore();
  const {
    developments,
    loading: developmentsLoading,
    fetchDevelopments,
  } = useDevelopmentStore();
  const { users, loading: usersLoading, fetchUsers } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevelopment, setSelectedDevelopment] = useState("");
  const [selectedBroker, setSelectedBroker] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchSales();
    fetchClients();
    fetchDevelopments();
    fetchUsers();
  }, [fetchSales, fetchClients, fetchDevelopments, fetchUsers]);

  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const client = clients.find((c) => c.id === sale.clientId);
      const matchesSearch =
        client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.blockNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDevelopment =
        !selectedDevelopment || sale.developmentId === selectedDevelopment;
      const matchesBroker = !selectedBroker || sale.brokerId === selectedBroker;
      const matchesStatus = !selectedStatus || sale.status === selectedStatus;

      return (
        matchesSearch && matchesDevelopment && matchesBroker && matchesStatus
      );
    });
  }, [
    sales,
    clients,
    searchTerm,
    selectedDevelopment,
    selectedBroker,
    selectedStatus,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSale) {
        await updateSale(editingSale.id, formData);
      } else {
        await addSale(formData);
      }
      handleCloseModal();
      fetchSales();
    } catch (error) {
      setOperationError(
        error instanceof Error ? error.message : "Erro ao salvar venda"
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSale(null);
    setFormData(initialFormData);
    setOperationError(null);
  };

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale);
    setFormData(sale);
    setIsModalOpen(true);
  };

  const handleDelete = (sale: Sale) => {
    setSaleToDelete(sale);
    setIsConfirmOpen(true);
  };

  const handleRowClick = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDetailsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (saleToDelete) {
      try {
        await deleteSale(saleToDelete.id);
        setSaleToDelete(null);
        setIsConfirmOpen(false);
        fetchSales();
      } catch (error) {
        setOperationError(
          error instanceof Error ? error.message : "Erro ao excluir venda"
        );
      }
    }
  };

  const renderActions = (sale: Sale) => (
    <div className="flex items-center justify-end space-x-3">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(sale);
        }}
        className="text-indigo-600 hover:text-indigo-900"
        title="Editar venda">
        <Edit2 className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(sale);
        }}
        className="text-red-600 hover:text-red-900"
        title="Excluir venda">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );

  if (salesLoading || clientsLoading || developmentsLoading || usersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vendas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Venda
        </button>
      </div>

      <SaleFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDevelopment={selectedDevelopment}
        onDevelopmentChange={setSelectedDevelopment}
        selectedBroker={selectedBroker}
        onBrokerChange={setSelectedBroker}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        developments={developments}
        brokers={users}
      />

      {(salesError || operationError) && (
        <ErrorMessage
          message={salesError || operationError || ""}
          onDismiss={() => {
            if (salesError) fetchSales();
            setOperationError(null);
          }}
        />
      )}

      <Table
        data={filteredSales}
        columns={getSaleColumns(clients, developments, users)}
        renderActions={renderActions}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingSale ? "Editar Venda" : "Nova Venda"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SaleForm
            formData={formData}
            setFormData={setFormData}
            clients={clients}
            developments={developments}
            brokers={users}
            isEditing={!!editingSale}
          />

          {operationError && <ErrorMessage message={operationError} />}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              {editingSale ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </Modal>

      <SaleDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        sale={selectedSale}
        clients={clients}
        developments={developments}
        users={users}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir Venda"
        message="Tem certeza que deseja excluir esta venda? Esta ação não pode ser desfeita."
      />
    </div>
  );
}