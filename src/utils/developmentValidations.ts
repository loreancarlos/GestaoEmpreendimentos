import { useReceivableStore } from '../store/receivableStore';

export function hasDevelopmentReceivables(developmentId: string): boolean {
  const { receivables } = useReceivableStore.getState();
  return receivables.some(receivable => receivable.developmentId === developmentId);
}

export function getDeleteDevelopmentErrorMessage(developmentId: string): string | null {
  if (hasDevelopmentReceivables(developmentId)) {
    return 'Não é possível excluir este empreendimento pois existem recebíveis associados a ele.';
  }
  return null;
}