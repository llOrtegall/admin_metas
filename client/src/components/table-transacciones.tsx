import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type Transacciones } from "@/types/Interfaces"
import { URL_API_DATA } from "@/utils/constants"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import axios from "axios"
import { DialogUpdateTransaccion } from "./update-transaccion"

export function TableTransacciones() {
  const [data, setData] = useState<Transacciones[]>([])
  const [reload, setReload] = useState(false)

  const handleReload = () => {
    setReload(!reload)
  }

  useEffect(() => {
    axios.get(`${URL_API_DATA}/reportes`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [reload])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Fecha/Hora Creación</TableHead>
          <TableHead>Concepto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Opciones</TableHead>
          <TableHead>Fecha/Hora Actualización</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.IDTRANSACCION}>
            <TableCell className="font-medium">{item.IDTRANSACCION}</TableCell>
            <TableCell>{item.FECHACREATE}</TableCell>
            <TableCell>{item.CONCEPTO}</TableCell>
            <TableCell>
              <Badge variant={
                item.ESTADO === 'APROBADO'
                  ? 'success'
                  : item.ESTADO === 'RECHAZADO'
                    ? 'destructive'
                    : 'outline'
              }>
                {item.ESTADO}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant='default'>
                {`$ ${Intl.NumberFormat('es-CO').format(item.VALOR)}`}
              </Badge>
            </TableCell>
            <TableCell>
              {
                item.ESTADO === 'APROBADO' || item.ESTADO === 'RECHAZADO' ? null : (
                  <DialogUpdateTransaccion idTrans={item.IDTRANSACCION} funReload={handleReload} />
                )
              }
            </TableCell>
            <TableCell>{item.FECHAUPDATE}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
