import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useReceivableStore } from '../store/receivableStore';
import { useClientStore } from '../store/clientStore';
import { useDevelopmentStore } from '../store/developmentStore';
import { Table } from '../components/common/Table';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ReceivableFilters } from '../components/receivables/ReceivableFilters';
import { InstallmentsModal } from '../components/receivables/InstallmentsModal';
import { ReceivableForm } from '../components/receivables/ReceivableForm';
import { getReceivableColumns } from '../components/receivables/ReceivableColumns';
import { Receivable } from '../types';

const initialFormData = {
  clientId: '',
  developmentId: '',
  blockNumber: '',
  lotNumber: '',
  totalValue: 0,
  downPayment: 0,
  installments: 0,
  firstInstallmentDate: '',
  purchaseDate: '',
  interestRate: 0,
  status: 'active' as const,
};

export function Receivables() {
  const { receivables, loading, error: storeError, fetchReceivables, addReceivable, updateReceivable, deleteReceivable, updateInstallmentStatus } = useReceivableStore();
  const { clients, loading: loadingClients, error: clientsError, fetchClients } = useClientStore();
  const { developments, loading: loadingDevelopments, error: developmentsError, fetchDevelopments } = useDevelopmentStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevelopment, setSelectedDevelopment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isInstallmentsModalOpen, setIsInstallmentsModalOpen] = useState(false);
  const [selectedReceivable, setSelectedReceivable] = useState<Receivable | null>(null);
  const [receivableToDelete, setReceivableToDelete] = useState<Receivable | null>(null);
  const [editingReceivable, setEditingReceivable] = useState<Receivable | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchReceivables();
    fetchClients();
    fetchDevelopments();
  }, [fetchReceivables, fetchClients, fetchDevelopments]);

  const columns = useMemo(() => getReceivableColumns(clients, developments), [clients, developments]);

  const filteredReceivables = useMemo(() => {
    return receivables.filter((receivable) => {
      const client = clients.find((c) => c.id === receivable.clientId);
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        client?.name.toLowerCase().includes(searchLower) ||
        receivable.blockNumber.toLowerCase().includes(searchLower) ||
        receivable.lotNumber.toLowerCase().includes(searchLower);

      const matchesDevelopment =
        !selectedDevelopment || receivable.developmentId === selectedDevelopment;

      const matchesStatus =
        !selectedStatus || receivable.status === selectedStatus;

      return matchesSearch && matchesDevelopment && matchesStatus;
    });
  }, [receivables, clients, searchTerm, selectedDevelopment, selectedStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOperationError(null);
    
    try {
      if (editingReceivable) {
        const updatedReceivable = await updateReceivable(editingReceivable.id, formData);
        if (updatedReceivable) {
          handleCloseModal();
        }
      } else {
        await addReceivable(formData);
        handleCloseModal();
      }
    } catch (error) {
      setOperationError(error instanceof Error ? error.message : 'Erro ao salvar recebível');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReceivable(null);
    setFormData(initialFormData);
    setOperationError(null);
  };

  const handleEdit = (receivable: Receivable) => {
    setEditingReceivable(receivable);
    setFormData(receivable);
    setIsModalOpen(true);
  };

  const handleDelete = (receivable: Receivable) => {
    setReceivableToDelete(receivable);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (receivableToDelete) {
      try {
        await deleteReceivable(receivableToDelete.id);
        setReceivableToDelete(null);
        setIsConfirmOpen(false);
      } catch (error) {
        setOperationError(error instanceof Error ? error.message : 'Erro ao excluir recebível');
      }
    }
  };

  const handleRowClick = (receivable: Receivable) => {
    setSelectedReceivable(receivable);
    setIsInstallmentsModalOpen(true);
  };

  const handleUpdateInstallmentStatus = async (
    receivableId: string,
    installmentNumber: number,
    updates: { billIssued?: boolean; billPaid?: boolean }
  ) => {
    try {
      await updateInstallmentStatus(receivableId, installmentNumber, updates);
    } catch (error) {
      setOperationError(error instanceof Error ? error.message : 'Erro ao atualizar status da parcela');
    }
  };

  const error = storeError || clientsError || developmentsError || operationError;

  if ((loading && !receivables.length) || loadingClients || loadingDevelopments) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recebíveis</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Recebível
        </button>
      </div>

      <ReceivableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDevelopment={selectedDevelopment}
        onDevelopmentChange={setSelectedDevelopment}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        developments={developments}
      />

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => {
            if (storeError) fetchReceivables();
            if (clientsError) fetchClients();
            if (developmentsError) fetchDevelopments();
            setOperationError(null);
          }}
        />
      )}

      <Table
        data={filteredReceivables}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingReceivable ? 'Editar Recebível' : 'Novo Recebível'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <ReceivableForm
            formData={formData}
            setFormData={setFormData}
            clients={clients}
            developments={developments}
            isEditing={!!editingReceivable}
          />

          {operationError && (
            <ErrorMessage message={operationError} />
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {editingReceivable ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir Recebível"
        message="Tem certeza que deseja excluir este recebível? Esta ação não pode ser desfeita."
      />

      {selectedReceivable && (
        <InstallmentsModal
          isOpen={isInstallmentsModalOpen}
          onClose={() => setIsInstallmentsModalOpen(false)}
          receivable={selectedReceivable}
          client={clients.find((c) => c.id === selectedReceivable.clientId)!}
          development={developments.find((d) => d.id === selectedReceivable.developmentId)!}
          onUpdateInstallmentStatus={handleUpdateInstallmentStatus}
        />
      )}
    </div>
  );
}