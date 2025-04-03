import { useEffect, useState, useMemo } from 'react';
import { URL_API_DATA } from '@/utils/constants';
import { Sugeridos } from '@/types/Sugeridos';
import axios from 'axios';

export function useSugeridos(initialDate: string = '', initialEmpresa: string = 'Multired') {
  const [data, setData] = useState<Sugeridos[]>([]);
  const [date, setDate] = useState<string>(initialDate);
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Obtener datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia la carga
      setError(null); // Resetea el error
      try {
        const response = await axios.get(`${URL_API_DATA}/sugeridos`, {
          params: { fecha: date, empresa: initialEmpresa },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchData();
  }, [date, initialEmpresa]);

  // Memorizar los datos filtrados
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Convertir valores a lowercase para evitar problemas de comparación
      const categoryLower = category.toLowerCase();
      const filterLower = filter.toLowerCase();

      const matchesCategory =
        categoryLower === 'todas' || !category || item.CATEGORIA.toLowerCase() === categoryLower;
      const matchesDocument = !filter || item.DOCUMENTO.toLowerCase().includes(filterLower);
      const matchesSucursal = !filter || item.SUCURSAL.toLowerCase().includes(filterLower);
      const matchesNombre = !filter || item.NOMBRES.toLowerCase().includes(filterLower);

      // Si la categoría es 'TODAS', solo considera los filtros de documento, sucursal o nombre
      return matchesCategory && (matchesDocument || matchesSucursal || matchesNombre);
    });
  }, [data, category, filter]);

  return {
    data,
    filteredData,
    date,
    setDate,
    filter,
    setFilter,
    category,
    setCategory,
    loading,
    error
  };
}