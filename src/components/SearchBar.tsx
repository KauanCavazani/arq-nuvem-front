import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  searchTerm: string;
  type: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange, type }: Props) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={`Pesquisar por ${type}`}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}