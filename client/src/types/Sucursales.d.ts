export enum Estado {
  Activo = "A",
  Inactivo = "I",
}

export enum Supervisor {
  Zona1 = "ZONA 1",
  Zona2 = "ZONA 2",
  ZonaCumbre = "ZONA CUMBRE",
  ZonaVijes = "ZONA VIJES",
}

export interface Sucursales {
  ZONA:       string;
  CCOSTO:     string;
  CODIGO:     string;
  NOMBRE:     string;
  DIRECCION:  string;
  SUPERVISOR: Supervisor;
  ESTADO:     Estado;
}


export interface SucursalInfo extends Sucursales {
  TIPO: string;
  DISPOSITIVO: string;
  CANAL: string;
  HORA_ENTRADA: string;
  HORA_SALIDA: string;
  HORA_ENTRADA_FES: string;
  HORA_SALIDA_FES: string;
  SUBZONA: string;
  CELULA: string;
  HORAS_ORDINARIAS: string;
  HORAS_FESTIVAS: string;
  ESTADO: Estado;
}