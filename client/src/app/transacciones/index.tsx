import { useAuth } from "@/auth/AuthProvider"
import { Navigate } from "react-router"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TableTransacciones } from "@/components/table-transacciones"

export default function Transacciones() {
  const { user } = useAuth()

  if (user?.sub_process !== "Monitoreo") {
    return <Navigate to="/" replace />
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="font-semibold text-2xl">Transacciones</h1>
        <p className="text-sm text-muted-foreground">Transacciones se actualizan automaticamente cada 5 minutos o puedes recargar manualmente presionando la opción "Recargar"</p>
      </CardHeader>

      <CardContent className="flex flex-col">
        <TableTransacciones />
      </CardContent>
    </Card>
  )
}