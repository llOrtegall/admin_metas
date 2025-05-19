import { useAuth } from "@/auth/AuthProvider"
import { Navigate } from "react-router"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TableTransacciones } from "@/components/table-transacciones"

export default function Transacciones() {
  const { user } = useAuth()

  if (user?.sub_process !== "Gerente") {
    return <Navigate to="/" replace />
  }

  return (
    <Card>
      <CardHeader>
        <h1>Transacciones</h1>
      </CardHeader>

      <CardContent>
        <TableTransacciones />
      </CardContent>
    </Card>
  )
}