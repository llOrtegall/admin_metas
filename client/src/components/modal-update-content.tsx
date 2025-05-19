import { DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { ReporteTransaccion } from '@/types/ProcessTransaccion';
import { URL_API_DATA } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from './ui/card';
import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import axios from 'axios';


interface PropsDialog {
  funClose: (openDialog: boolean) => void;
  idTrans: number;
}

function LazyDialogContent({ funClose, idTrans }: PropsDialog) {
  const [reporte, setReporte] = useState<ReporteTransaccion | null>(null)

  useEffect(() => {
    axios.get<ReporteTransaccion>(`${URL_API_DATA}/reporte/${idTrans}`)
      .then(res => {
        setReporte(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [idTrans])


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Procesar Transacción</DialogTitle>
        <DialogDescription>
          Verificación de datos para la transacción con ID: <Badge variant='default' className='px-4'>{idTrans}</Badge>
        </DialogDescription>
      </DialogHeader>
      <Card>
        
        <h1 className='text-center text-xl font-bold'>
          Información Premio Reportado
        </h1>

        <CardContent className='grid grid-cols-2 gap-2'>
          <p className='col-span-2'>Fecha | Hora Reporte: <span className='font-semibold'>{reporte?.FECHACREATE}</span> </p>
          <p>Concepto: {reporte?.CONCEPTO}</p>
          <p>Estado: {reporte?.ESTADO}</p>
          <p>Maquina: <Badge variant='default'>{reporte?.TERCERO}</Badge></p>
          <p>Valor Premio: <Badge variant='secondary'> $ {Intl.NumberFormat('es-CO').format(reporte?.VALOR || 0)}</Badge></p>
        </CardContent>
      </Card>
      <Card>

        <h1>Información Punto Vendedor</h1>

        <CardContent className='grid grid-cols-2 gap-2'>
          <p className='col-span-2'>Vendedora: <span className='underline font-semibold'>{reporte?.Vendedore.NOMBRES}</span></p>
          <p>Documento: {reporte?.Vendedore.DOCUMENTO}</p>
          <p>N° Sucursal: {reporte?.SUCURSAL}</p>
          <p className='col-span-2'>Nombre Sucursal: {reporte?.Sucursale.NOMBRE}</p>
          <p>Empresa: <Badge variant='secondary'>{reporte?.Sucursale.ZONA === '39627' ? 'Multired' : 'Servired'}</Badge></p>
        </CardContent>
      </Card>
      <section className='space-y-4'>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </section>
    </DialogContent>
  )
}

export default LazyDialogContent;