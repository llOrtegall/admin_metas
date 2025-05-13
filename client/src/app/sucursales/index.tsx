import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ButtonExportSucursales } from '@/components/exports/ExportSucursales';
import { URL_API_DATA } from '@/utils/constants';
import { SucursalInfo } from '@/types/Sucursales';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/auth/AuthProvider';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Info, Pencil } from 'lucide-react';
import { Link } from 'react-router';
import axios from 'axios';

export default function SucursalesPage() {
  const [data, setData] = useState<SucursalInfo[]>([])
  const [filter, setFilter] = useState('')
  const { empresa } = useAuth()

  useEffect(() => {
    axios.get(`${URL_API_DATA}/sucursales`, { params: { empresa } })
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [empresa])

  const dataFiltered = data.filter(item => filter ? item.NOMBRE.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || item.CODIGO.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : data)


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
            onChange={(e) => setFilter(e.target.value)}
          />

          <ButtonExportSucursales datos={dataFiltered} />
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
              dataFiltered.map((item, index) => (
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
                      item.ESTADO === 'A' ? <Badge variant={'success'}>Activo</Badge> : item.ESTADO === 'I' ? <Badge variant={'destructive'}>Inactivo</Badge> : 'No Asignado'
                    }
                  </TableCell>
                  <TableCell className='text-xs'>
                    <Link to={`/sucursales/${item.CODIGO}`}>
                      <Button variant={'outline'} className='cursor-pointer hover:bg-yellow-100 transition ease-in-out duration-200'>
                        <Pencil className='mr-2' size={16} /> Editar
                      </Button>
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