import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ButtonExportSugeridos } from '@/components/exports/ExportSugeridos';
import { ChevronRight, Delete } from 'lucide-react';
import { formatPriceCo } from '@/utils/funtions';
import { URL_API_DATA } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Sugeridos } from '@/types/Sugeridos';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SugeridosPage() {
  const [data, setData] = useState<Sugeridos[] | null>(null);
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    axios.get(`${URL_API_DATA}/sugeridos`, { params: { fecha: date, empresa: 'Multired' } })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [date]);

  return (
    <section>
      <Card className='px-4'>
        <h1 className='text-lg font-bold uppercase'>Sugeridos Vendedores</h1>
        <article className='flex items-center gap-4'>
          <Label className='text-sm font-bold'>
            Fecha
          </Label>
          <Input
            type='date'
            className='w-[150px]'
            placeholder='Fecha'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Label className='text-sm font-bold'>
            Filtros
          </Label>
          <Input
            type='text'
            className='w-[350px]'
            placeholder='39825  -  1118*****'

          />

          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Categoría' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'TODAS'}>Todas</SelectItem>
              <SelectItem value='DIAMANTE1A'>Diamante 1A</SelectItem>
              <SelectItem value='DIAMANTE2A'>Diamante 2A</SelectItem>
              <SelectItem value='DIAMANTE3A'>Diamante 3A</SelectItem>
              <SelectItem value='DIAMANTE4A'>Diamante 4A</SelectItem>
              <SelectItem value='DIAMANTE5A'>Diamante 5A</SelectItem>
              <SelectItem value='ZAFIRO'>Zafiro</SelectItem>
              <SelectItem value='ORO'>Oro</SelectItem>
              <SelectItem value='PLATA'>Plata</SelectItem>
              <SelectItem value='BRONCE'>Bronce</SelectItem>
            </SelectContent>
          </Select>

          <Button className='cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out'
          >
            <Delete size={14} className='mr-2' /> Limpiar Filtros
          </Button>

          <ButtonExportSugeridos datos={data!} />

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
                <TableHead className='text-center text-xs'
                >
                  Valor Sugerido
                  <ChevronRight
                    size={12}
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
                data && data.length > 0 ?
                  data.map((item, index) => (
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
                        title={item.NOMBRE_SUCURSAL}
                      >
                        {item.NOMBRE_SUCURSAL}
                      </TableCell>
                      <TableCell className='text-xs'>{item.CATEGORIA}</TableCell>
                      <TableCell className='text-xs'>{item.PRODUCTO}</TableCell>
                      <TableCell className='text-xs'>{formatPriceCo(item.VALOR_SUGERIDO)}</TableCell>
                      <TableCell className='text-xs'>{formatPriceCo(item.VALOR_META)}</TableCell>
                      <TableCell className='text-xs'>{formatPriceCo(item.VALOR_META - item.VALOR_SUGERIDO)}</TableCell>
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