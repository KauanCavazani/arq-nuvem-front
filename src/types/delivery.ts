export type DeliveryStatus = 'Pendente' | 'Em Trânsito' | 'Entregue' | 'Cancelada';

export interface Delivery {
  id: string;
  numeroRastreamento: string;
  dataPrevisaoEntrega: string;
  status: DeliveryStatus;
}