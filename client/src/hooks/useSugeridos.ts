import { useEffect, useState, useMemo } from 'react';
import { URL_API_DATA } from '@/utils/constants';
import { Sugeridos } from '@/types/Sugeridos';
import axios from 'axios';

export function useSugeridos(initialEmpresa: string = 'Multired') {
  const [data, setData] = useState<Sugeridos[]>([]);
  const [date1, setDate1] = useState<string>('');
  const [date2, setDate2] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetFilters = () => {
    setFilter('');
    setCategory('');
    setFilterEstado('');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${URL_API_DATA}/sugeridos`, {
          params: { fecha1: date1, fecha2: date2, empresa: initialEmpresa },
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los datos. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date1, date2, initialEmpresa]);

  // Optimización del filtrado
  const filteredData = useMemo(() => {
    const categoryLower = category.toLowerCase();
    const filterLower = filter.toLowerCase();
    const filterEstadoLower = filterEstado.toLowerCase();

    return data.filter((item) => {
      // Filtro por categoría
      const matchesCategory =
        categoryLower === 'todas' || !category || item.CATEGORIA.toLowerCase() === categoryLower;

      // Filtro general (documento, sucursal, nombres)
      const matchesGeneral =
        !filter ||
        item.DOCUMENTO.toLowerCase().includes(filterLower) ||
        item.SUCURSAL.toLowerCase().includes(filterLower) ||
        item.NOMBRES.toLowerCase().includes(filterLower);

      // Filtro por estado
      const matchesEstado =
        !filterEstado || item.ESTADO.toLowerCase().includes(filterEstadoLower);

      // Todos los filtros deben cumplirse
      return matchesCategory && matchesGeneral && matchesEstado;
    });
  }, [data, category, filter, filterEstado]);

  return {
    data,
    filteredData,
    date1,
    setDate1,
    date2,
    setDate2,
    filter,
    setFilter,
    category,
    setCategory,
    filterEstado,
    setFilterEstado,
    resetFilters,
    loading,
    error
  };
}