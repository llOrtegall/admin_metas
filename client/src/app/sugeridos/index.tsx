import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { URL_API_DATA } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Sugeridos } from '@/types/Sugeridos';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SugeridosPage() {
  const [data, setData] = useState<Sugeridos[] | null>(null);
  const [filteredData, setFilteredData] = useState<Sugeridos[] | null>(null);
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('');

  const [category, setCategory] = useState(''); // Filtro por categoría
  const [sortField, setSortField] = useState<'VALOR_SUGERIDO' | 'VALOR_META' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  useEffect(() => {
    axios.get(`${URL_API_DATA}/sugeridos`, { params: { fecha: date, empresa: 'Multired' } })
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [date]);

  // Filtrar por categoría
  useEffect(() => {
    if (data) {
      const filtered = data.filter(item =>
        (!category || item.CATEGORIA === category) && // Filtrar por categoría si está seleccionada
        (!filter || item.DOCUMENTO.includes(filter)) // Filtrar por documento si hay texto
      );
      setFilteredData(filtered);
    }
  }, [category, filter, data]);

  // Ordenar los datos
  const handleSort = (field: 'VALOR_SUGERIDO' | 'VALOR_META') => {
    if (filteredData) {
      const sorted = [...filteredData].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];
        if (sortOrder === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
      setFilteredData(sorted);
      setSortField(field);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Alternar entre ascendente y descendente
    }
  };

  return (
    <section>
      <Card className='px-4'>
        <h1 className='text-lg font-bold uppercase'>Sugeridos Vendedores</h1>
        <article className='flex items-center gap-4'>
          <Label className='text-sm font-bold'>
            Filtros
          </Label>
          <Input
            type='text'
            className='w-[350px]'
            placeholder='39825  -  1118*****'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Label className='text-sm font-bold'>
            Fecha
          </Label>
          <Input
            type='date'
            className='w-[212px]'
            placeholder='Fecha'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className='w-[212px] border rounded p-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Todas</option>
            <option value='DIAMANTE1A'>Diamante 1A</option>
            <option value='DIAMANTE2A'>Diamante 2A</option>
            <option value='DIAMANTE3A'>Diamante 3A</option>
            <option value='DIAMANTE4A'>Diamante 4A</option>
            <option value='DIAMANTE5A'>Diamante 5A</option>
            <option value='ZAFIRO'>Zafiro</option>
            <option value='ORO'>Oro</option>
            <option value='PLATA'>Plata</option>
            <option value='BRONCE'>Bronce</option>
          </select>

          <Button className='p-2 mb-2 cursor-pointer hover:bg-green-200 transition-all duration-300 ease-in-out mt-2'
            variant='secondary'>
            Exportar a Excel
          </Button>

        </article>

        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-center text-xs'>ID</TableHead>
                <TableHead className='text-center text-xs'>Fecha</TableHead>
                <TableHead className='text-center text-xs'>Documento</TableHead>
                <TableHead className='text-center text-xs'>Nombres</TableHead>
                <TableHead className='text-center text-xs'>Sucursal</TableHead>
                <TableHead className='text-center text-xs'>Nombre Sucursal</TableHead>
                <TableHead className='text-center text-xs'>Categoria</TableHead>
                <TableHead className='text-center text-xs'>Producto</TableHead>
                <TableHead
                  className={`flex items-center text-xs cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out ${sortField === 'VALOR_SUGERIDO' ? 'bg-blue-100 font-bold' : ''
                    }`}
                  onClick={() => handleSort('VALOR_SUGERIDO')}
                >
                  Valor Sugerido
                  <ChevronRight
                    size={12}
                    className={`transition-transform ${sortField === 'VALOR_SUGERIDO' && sortOrder === 'asc' ? 'rotate-90' : sortField === 'VALOR_SUGERIDO' && sortOrder === 'desc' ? '-rotate-90' : ''
                      }`}
                  />
                </TableHead>
                <TableHead className='text-xs'>
                  Valor Meta
                </TableHead>
                <TableHead className='text-center text-xs'>Diferencia</TableHead>
                <TableHead className='text-center text-xs'>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {
                filteredData && filteredData.length > 0 ?
                  filteredData.map((item, index) => (
                    <TableRow key={index + 1}>
                      <TableCell className='text-xs'>{item.ID}</TableCell>
                      <TableCell className='text-xs'>{item.FECHA}</TableCell>
                      <TableCell className='text-xs'>{item.DOCUMENTO}</TableCell>
                      <TableCell
                        className='text-xs truncate max-w-[150px] overflow-hidden'
                        title={item.NOMBRES}
                      >
                        {item.NOMBRES}
                      </TableCell>
                      <TableCell>{item.SUCURSAL}</TableCell>
                      <TableCell
                        className='text-xs truncate max-w-[100px] overflow-hidden'
                        title={item.NOMBRES}
                      >
                        {item.NOMBRE_SUCURSAL}
                      </TableCell>
                      <TableCell className='text-xs'>{item.CATEGORIA}</TableCell>
                      <TableCell className='text-xs'>{item.PRODUCTO}</TableCell>
                      <TableCell className='text-xs'>{item.VALOR_SUGERIDO}</TableCell>
                      <TableCell className='text-xs'>{item.VALOR_META}</TableCell>
                      <TableCell className='text-xs'>{item.VALOR_META - item.VALOR_SUGERIDO}</TableCell>
                      <TableCell className='text-xs'>{item.ESTADO}</TableCell>
                    </TableRow>
                  ))
                  : null
              }
            </TableBody>
          </Table>
        </section>
      </Card>
    </section>
  )
}