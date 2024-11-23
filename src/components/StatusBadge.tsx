import React from 'react';
import { DeliveryStatus } from '../types/delivery';

interface Props {
  status: DeliveryStatus;
}

export function StatusBadge({ status }: Props) {
  const statusConfig = {
    Pendente: {
      color: 'bg-yellow-100 text-yellow-800',
      label: 'Pendente'
    },
    'Em Trânsito': {
      color: 'bg-blue-100 text-blue-800',
      label: 'Em Trânsito'
    },
    Entregue: {
      color: 'bg-green-100 text-green-800',
      label: 'Entregue'
    },
    Cancelada: {
      color: 'bg-red-100 text-red-800',
      label: 'Cancelada'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}