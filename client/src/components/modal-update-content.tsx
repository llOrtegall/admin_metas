import { DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { URL_API_DATA } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import axios from 'axios';

interface PropsDialog{
  funClose: (openDialog: boolean) => void;
  idTrans: number;
}

function LazyDialogContent({ funClose, idTrans }: PropsDialog) {

  useEffect(() => {
    axios.get(`${URL_API_DATA}/reporte/${idTrans}`)
    .then(res => {
      console.log(res.data)
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
          Verificación de datos
        </DialogDescription>
      </DialogHeader>
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