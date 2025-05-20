import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Loading } from '@/components/ui/loading';
import { lazy, Suspense, useState } from 'react';
import { Settings } from 'lucide-react';

const LazyDialogContent = lazy(() => import('@/components/modal-update-content'));

export const DialogUpdateTransaccion = ({ idTrans, funReload }: { idTrans: number, funReload: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (openDialog: boolean) => {
    setIsOpen(openDialog)
    funReload()
  }

  return (
    <Dialog onOpenChange={v => handleOpenChange(v)} open={isOpen}>
      <DialogTrigger className='cursor-pointer bg-yellow-200 hover:bg-yellow-300 text-black px-2 py-2 rounded-md flex items-center gap-2'>
        <Settings className="size-5" />
        Procesar
      </DialogTrigger>
      {isOpen && (
        <Suspense fallback={<Loading />}>
          <LazyDialogContent funClose={handleOpenChange} idTrans={idTrans} funReload={funReload} />
        </Suspense>
      )}
    </Dialog>
  );
};