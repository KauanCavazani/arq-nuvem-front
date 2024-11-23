import React from 'react';
import { Package, Calendar } from 'lucide-react';
import { Delivery } from '../types/delivery';
import { StatusBadge } from './StatusBadge';

interface Props {
  delivery: Delivery;
}

export function DeliveryCard({ delivery }: Props) {
  const formattedDate = new Date(delivery.dataPrevisaoEntrega).toLocaleDateString();

  console.log(delivery);
  
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">{delivery.numeroRastreamento}</span>
        </div>
        <StatusBadge status={delivery.status} />
      </div>
      
      <div className="flex items-center space-x-2 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>Previsão de Entrega: {formattedDate}</span>
      </div>
    </div>
  );
}