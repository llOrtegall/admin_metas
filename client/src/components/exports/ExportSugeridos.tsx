import { utils, ColInfo, writeFile } from 'xlsx'
import { Sugeridos } from '@/types/Sugeridos'
import { toast } from 'sonner'

const generateExcelData = (datos: Sugeridos[]) => {
  const titulo = [{ A: 'Reporte Sugeridos' }]
  const headers = [
    {
      A: 'ID',
      B: 'FECHA',
      C: 'Documento',
      D: 'Nombres',
      E: 'Sucursal',
      F: 'Nombre Sucursal',
      G: 'Categoría',
      H: 'Producto',
      I: 'Valor Sugerido',
      J: 'Valor Meta',
      K: 'Estado'
    }
  ]

  const rows = datos.map( sugerido => ({
    A: sugerido.ID,
    B: sugerido.FECHA,
    C: sugerido.DOCUMENTO,
    D: sugerido.NOMBRES,
    E: sugerido.SUCURSAL,
    F: sugerido.NOMBRE_SUCURSAL,
    G: sugerido.CATEGORIA,
    H: sugerido.PRODUCTO,
    I: sugerido.VALOR_SUGERIDO,
    J: sugerido.VALOR_META,
    K: sugerido.ESTADO
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (datos: Sugeridos[]) => {
  const Informacion = generateExcelData(datos)

  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(Informacion, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 30 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Sugeridos')
  writeFile(libro, 'ReporteSugeridos.xlsx')
}

export const ButtonExportSugeridos = ({ datos }: { datos: Sugeridos[] }) => {
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
    <button className='bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-500 text-xs 2xl:text-sm 3xl:text-base cursor-pointer transition ease-in-out' onClick={handleDownload}>
      Exportar a Excel
    </button>
  )
}