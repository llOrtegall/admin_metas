import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { URL_API_DATA } from '@/utils/constants';
import { Sucursales } from '@/types/Sucursales';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Info, Pencil } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router';

export default function SucursalesPage() {
  const [data, setData] = useState<Sucursales[]>([])

  useEffect(() => {
    axios.get(`${URL_API_DATA}/sucursales`)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <section>
      <Card className='px-4'>

        <h1 className='text-lg font-bold uppercase'>Información Sucursales</h1>

        <article className='flex items-center gap-4'>
          <Label className='text-sm font-bold flex items-center gap-2' 
          title='Se puede buscar por N° Sucursal o Nombres de la Sucursal'>
            Filtros
            <Info className='inline-block mr-1' size={16} />
          </Label>
          <Input
            type='text'
            className='w-[350px]'
            placeholder='39825  -  Andre Carr*** **** '
          />

        </article>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-xs'>Zona</TableHead>
              <TableHead className='text-xs'>C. Costo</TableHead>
              <TableHead className='text-xs'>N° Sucursal</TableHead>
              <TableHead className='text-xs'>Nombres</TableHead>
              <TableHead className='text-xs'>Dirección</TableHead>
              <TableHead className='text-xs'>Supervisor</TableHead>
              <TableHead className='text-xs'>Estado</TableHead>
              <TableHead className='text-xs'>Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, index) => (
                <TableRow key={index + 1}>
                  <TableCell className='text-xs'>
                    {
                      item.ZONA === '39627' ? 'Multired' : item.ZONA === '39628' ? 'Servired' : 'No Asignado'
                    }
                  </TableCell>
                  <TableCell className='text-xs'>{item.CCOSTO}</TableCell>
                  <TableCell className='text-xs'>{item.CODIGO}</TableCell>
                  <TableCell className='text-xs'>{item.NOMBRE}</TableCell>
                  <TableCell className='text-xs'>{item.DIRECCION}</TableCell>
                  <TableCell className='text-xs'>{item.SUPERVISOR}</TableCell>
                  <TableCell className='text-xs'>
                    {
                      item.ESTADO === 'A' ? 'Activo' : item.ESTADO === 'I' ? 'Inactivo' : 'No Asignado'
                    }
                  </TableCell>
                  <TableCell className='text-xs'>
                    <Link to={`/sucursales/${item.CODIGO}`}>
                      <Button icon={Pencil} variant={'outline'} className='cursor-pointer hover:bg-yellow-100 transition ease-in-out duration-200'/>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
    </section>
  )
}