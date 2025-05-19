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

export interface Transacciones {
  CONCEPTO: string;
  ESTADO: string;
  FECHA: string;
  FECHACREATE: string;
  FECHAUPDATE: string;
  IDTRANSACCION: number;
  LOGINAUTORIZA: string | null;
  LOGINSOLICITUD: string;
  NOTA: string | null;
  SUCURSAL: string;
  TERCERO: string;
  VALOR: number;
  VERSION: string | null;
}
  