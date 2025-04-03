export interface Sucursales {
  ZONA:       string;
  CCOSTO:     string;
  CODIGO:     string;
  NOMBRE:     string;
  DIRECCION:  string;
  SUPERVISOR: Supervisor;
  ESTADO:     Estado;
}

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
