import { useReceivableStore } from '../store/receivableStore';

export function hasUserReceivables(userId: string): boolean {
  const { receivables } = useReceivableStore.getState();
  return receivables.some(receivable => receivable.clientId === userId);
}

export function getDeleteUserErrorMessage(userId: string): string | null {
  if (hasUserReceivables(userId)) {
    return 'Não é possível excluir este cliente pois existem recebíveis associados a ele.';
  }
  return null;
}