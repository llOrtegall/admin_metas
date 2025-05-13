import { SucursalInfo } from '@/types/Sucursales';
import { utils, ColInfo, writeFile } from 'xlsx';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { JSX } from 'react';

const generateExcelData = (datos: SucursalInfo[]) => {
  const titulo = [{ A: 'Reporte Sucursales' }]
  const headers = [
    {
      A: 'ZONA',
      B: 'CCOSTO',
      C: 'CODIGO',
      D: 'NOMBRE',
      E: 'DIRECCION',
      F: 'TIPO DISPOSITIVO',
      G: 'SUPERVISOR',
      H: 'CANAL',
      I: 'CATEGORIA',
      J: 'HORA_ENTRADA',
      K: 'HORA_SALIDA',
      L: 'HORA_ENTRADA_FES',
      M: 'HORA_SALIDA_FES',
      N: 'SUBZONA',
      O: 'CELULA',
      P: 'HORAS_ORDINARIAS',
      Q: 'HORAS_FESTIVAS',
      R: 'ESTADO'
    }
  ]

  const rows = datos.map( sugerido => ({
    A: sugerido.ZONA,
    B: sugerido.CCOSTO,
    C: sugerido.CODIGO,
    D: sugerido.NOMBRE,
    E: sugerido.DIRECCION,
    F: sugerido.TIPO,
    G: sugerido.SUPERVISOR,
    H: sugerido.CANAL,
    I: sugerido.CATEGORIA,
    J: sugerido.HORA_ENTRADA,
    K: sugerido.HORA_SALIDA,
    L: sugerido.HORA_ENTRADA_FES,
    M: sugerido.HORA_SALIDA_FES,
    N: sugerido.SUBZONA,
    O: sugerido.CELULA,
    P: sugerido.HORAS_ORDINARIAS,
    Q: sugerido.HORAS_FESTIVAS,
    R: sugerido.ESTADO
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (datos: SucursalInfo[]) => {
  const Informacion = generateExcelData(datos)

  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(Informacion, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Sucursales')
  writeFile(libro, 'ReporteSucursales.xlsx')
}

export const ButtonExportSucursales = ({ datos }: { datos: SucursalInfo[] }): JSX.Element => {
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