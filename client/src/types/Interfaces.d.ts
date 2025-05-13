import { Dispatch, SetStateAction } from "react"

export interface IAuthContext {
  isAuthenticated: boolean
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  empresa: string
  setEmpresa: Dispatch<SetStateAction<string>>
}

export interface Logueados {
  SUCURSAL: number;
  DOCUMENTO: string;
  NOMBRES: string;
  NOMBRECARGO: string;
  FECHA_LOGIN: string;
  FECHACREATE: string;
  FECHAUPDATE: string;
}