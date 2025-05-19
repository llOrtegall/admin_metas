import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type Transacciones } from "@/types/Interfaces"
import { URL_API_DATA } from "@/utils/constants"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import axios from "axios"
import { DialogUpdateTransaccion } from "./update-transaccion"

export function TableTransacciones() {
  const [data, setData] = useState<Transacciones[]>([])

  useEffect(() => {
    axios.get(`${URL_API_DATA}/reportes`)
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  } ,[])

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.IDTRANSACCION}>
            <TableCell className="font-medium">{item.IDTRANSACCION}</TableCell>
            <TableCell>{item.FECHACREATE.split('T')[0].split('-').reverse().join('/') + ' ' + item.FECHACREATE.split('T')[1].slice(0, 8)}</TableCell>
            <TableCell>{item.CONCEPTO}</TableCell>
            <TableCell>{item.ESTADO}</TableCell>
            <TableCell>
              <Badge variant='default'> 
                {`$ ${Intl.NumberFormat('es-CO').format(item.VALOR)}`}
              </Badge>
            </TableCell>
            <TableCell>
              <DialogUpdateTransaccion idTrans={item.IDTRANSACCION} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
