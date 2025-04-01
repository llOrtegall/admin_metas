import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { URL_API_DATA } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Logueados {
  SUCURSAL: number;
  DOCUMENTO: string;
  NOMBRES: string;
  NOMBRECARGO: string;
  FECHA_LOGIN: string;
  FECHACREATE: string;
  FECHAUPDATE: string;
}

export default function LogueadosPage() {
  const [data, setData] = useState<Logueados[] | null>(null);
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios.get(`${URL_API_DATA}/logueos`, { params: { fecha: date, empresa: 'Multired' } })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      }
      );
  }, [date]);

  return (
    <section>
      <Card className='px-4'>
        <h1 className='text-lg font-bold uppercase'>Usuarios Logueados</h1>
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

          <Button className='p-2 mb-2 cursor-pointer hover:bg-green-200 transition-all duration-300 ease-in-out mt-2'
            variant='secondary'>
            Exportar a Excel
          </Button>
        </article>

        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sucursal</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Hora Primer Login</TableHead>
                <TableHead>Hora Ultimo Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {
                data && data.length > 0 ?
                  data.map((item, index) => (
                    <TableRow key={index + 1}>
                      <TableCell>{item.SUCURSAL}</TableCell>
                      <TableCell>{item.DOCUMENTO}</TableCell>
                      <TableCell>{item.NOMBRES}</TableCell>
                      <TableCell>{item.NOMBRECARGO.split('_')[0] + ' ' + item.NOMBRECARGO.split('_')[1]}</TableCell>
                      <TableCell>
                        {item.FECHACREATE.split('T')[0].split('-').reverse().join('/')}
                        {' - '}
                        {item.FECHACREATE.split('T')[1].slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        {item.FECHAUPDATE.split('T')[0].split('-').reverse().join('/')}
                        {' - '}
                        {item.FECHAUPDATE.split('T')[1].slice(0, 8)}
                      </TableCell>
                    </TableRow>
                  ))
                  : null
              }
            </TableBody>
          </Table>
        </section>
      </Card>
    </section>
  );
}