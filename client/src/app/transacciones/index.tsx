import { type Transacciones } from "@/types/Interfaces"
import { URL_API_DATA } from "@/utils/constants"
import { useAuth } from "@/auth/AuthProvider"
import { Navigate } from "react-router"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

export default function Transacciones() {
  const { user } = useAuth()
  const [data, setData] = useState<Transacciones[]>([])

  if (user?.sub_process !== "Gerente") {
    return <Navigate to="/" replace />
  }

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
    <div>
      {
        data.map((item) => (
          <div key={item.IDTRANSACCION}>
            <p>{item.CONCEPTO}</p>
            <p>{item.ESTADO}</p>
            <p>{item.FECHA}</p>
            <p>{item.FECHACREATE}</p>
            <p>{item.FECHAUPDATE}</p>
            <p>{item.IDTRANSACCION}</p>
            <p>{item.LOGINAUTORIZA}</p>
            <p>{item.LOGINSOLICITUD}</p>
            <p>{item.NOTA}</p>
            <p>{item.SUCURSAL}</p>
            <p>{item.TERCERO}</p>
            <p>{item.VALOR}</p>
            <p>{item.VERSION}</p>
          </div>
        ))
      }
    </div>
  )
}