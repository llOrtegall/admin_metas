import { utils, ColInfo, writeFile } from 'xlsx';
import { Button } from '@/components/ui/button';
import { Logueados } from '@/types/Interfaces';
import { toast } from 'sonner';
import { JSX } from 'react';

const generateExcelData = (datos: Logueados[]) => {
  const titulo = [{ A: 'Reporte Logueados' }]
  const headers = [
    {
      A: 'SUCURSAL',
      B: 'DOCUMENTO',
      C: 'NOMBRES',
      D: 'NOMBRECARGO',
      E: 'FECHA_LOGIN',
      F: 'FECHACREATE',
      G: 'FECHAUPDATE'
    }
  ]

  const rows = datos.map( sugerido => ({
    A: sugerido.SUCURSAL,
    B: sugerido.DOCUMENTO,
    C: sugerido.NOMBRES,
    D: sugerido.NOMBRECARGO,
    E: sugerido.FECHA_LOGIN,
    F: sugerido.FECHACREATE,
    G: sugerido.FECHAUPDATE,
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (datos: Logueados[]) => {
  const Informacion = generateExcelData(datos)

  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(Informacion, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 },
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Logueados')
  writeFile(libro, 'ReporteLogueados.xlsx')
}

export const ButtonExportLogueados = ({ datos }: { datos: Logueados[] }): JSX.Element => {
  const handleDownload = (): void => {

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#fcd34d' },
      success: () => {
        createExcelFile(datos)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <Button variant={'success'} onClick={handleDownload}>
      Export Excel
    </Button>
  )
}