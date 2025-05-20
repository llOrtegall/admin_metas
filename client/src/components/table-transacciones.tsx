import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialogUpdateTransaccion } from "./update-transaccion";
import { type Transacciones } from "@/types/Interfaces";
import { getReports } from "@/services/reports.service";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CardHeader } from "./ui/card";
import { RefreshCw } from "lucide-react";
import { Separator } from "./ui/separator";

const fiveMinutes = 5 * 60 * 1000

export function TableTransacciones() {
  const [data, setData] = useState<Transacciones[]>([])
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [reload, setReload] = useState(false)

  const handleReload = () => {
    setLastUpdate(new Date().toLocaleString())
    setReload(!reload)
  }

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        const data = await getReports({ signal: controller.signal })
        setData(data)
        setLastUpdate(new Date().toLocaleString())
      } catch (error) {
        console.error(error)
      }
    }

    getData()

    const intervalId = setInterval(getData, fiveMinutes)

    return () => {
      clearInterval(intervalId)
      controller.abort()
    }
  }, [reload])

  return (
    <>
      <CardHeader className="flex justify-between pb-4">
        <h2>Ultima actualización información: {lastUpdate}</h2>
        <Button onClick={handleReload}>
          Recargar <RefreshCw className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <Separator />

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
    </>
  )
}
