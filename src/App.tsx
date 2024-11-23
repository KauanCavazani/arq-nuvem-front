import React, { useState, useEffect } from 'react'; 
import { Package } from 'lucide-react';
import { DeliveryCard } from './components/DeliveryCard';
import { SearchBar } from './components/SearchBar';
import { Delivery } from './types/delivery';

function App() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);  // Mantenha o estado de loading
  const [error, setError] = useState<string | null>(null);

  const [searchTrackingNumber, setSearchTrackingNumber] = useState(''); // Para buscar pelo número de rastreamento
  const [searchCustomerName, setSearchCustomerName] = useState(''); // Para buscar pelo nome do cliente

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // Função para realizar a busca de todas as entregas
  const fetchDeliveries = async () => {
    try {
      setLoading(true);  // Ativa o loading
      const response = await fetch(`${apiBaseUrl}/entregas`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      const data = await response.json();
      setDeliveries(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar as entregas.');
    } finally {
      setLoading(false);  // Desativa o loading
    }
  };

  // Função para buscar entregas filtradas por cliente
  const fetchDeliveriesByCustomer = async () => {
    if (searchCustomerName === '') return; // Se o nome do cliente estiver vazio, não faz nada.
    try {
      setLoading(true);  // Ativa o loading
      const response = await fetch(`${apiBaseUrl}/entregas/cliente/${searchCustomerName}`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      const data = await response.json();
      setDeliveries(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar entregas do cliente.');
    } finally {
      setLoading(false);  // Desativa o loading
    }
  };

  // Função para buscar entrega filtrada pelo número de rastreamento
  const fetchDeliveryByTrackingNumber = async () => {
    if (searchTrackingNumber === '') return; // Se o número de rastreamento estiver vazio, não faz nada.
    try {
      setLoading(true);  // Ativa o loading
      const response = await fetch(`${apiBaseUrl}/entregas/${searchTrackingNumber}`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      const data = await response.json();
      setDeliveries(data); // Apenas uma entrega retornada, por isso colocamos em um array
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar a entrega.');
    } finally {
      setLoading(false);  // Desativa o loading
    }
  };

  // Effect que será executado toda vez que o número de rastreamento ou nome do cliente mudar
  useEffect(() => {
    if (searchCustomerName) {
      fetchDeliveriesByCustomer(); // Faz a busca pelo nome do cliente
    } else if (searchTrackingNumber) {
      fetchDeliveryByTrackingNumber(); // Faz a busca pelo número de rastreamento
    } else {
      fetchDeliveries(); // Caso não tenha filtro, carrega todas as entregas
    }
  }, [searchTrackingNumber, searchCustomerName, apiBaseUrl]);  // Dependências para disparar o effect

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar entregas</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Track Your Delivery</h1>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Campo de Pesquisa por número de rastreamento */}
          <SearchBar 
            searchTerm={searchTrackingNumber} 
            onSearchChange={setSearchTrackingNumber} 
            type='Número de Rastreamento'
          />
          
          {/* Campo de Pesquisa por nome do cliente */}
          <SearchBar 
            searchTerm={searchCustomerName} 
            onSearchChange={setSearchCustomerName} 
            type='Nome do Cliente'
          />
        </div>

        {/* Deliveries Grid */}
        {loading ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Carregando entregas...</h3>
            <p className="text-gray-500">Por favor, aguarde.</p>
          </div>
        ) : deliveries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveries.map(delivery => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma entrega encontrada</h3>
            <p className="text-gray-500">Ajuste os filtros e tente novamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
