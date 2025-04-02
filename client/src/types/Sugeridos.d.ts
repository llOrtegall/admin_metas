export enum Estado {
  Enprogreso = "ENPROGRESO",
  Inicial = "INICIAL",
  Superado = "SUPERADO",
}

export enum Nombrecargo {
  CajeroComercial = "CAJERO_COMERCIAL",
  ColocadorIndependiente = "COLOCADOR_INDEPENDIENTE",
}

export enum Tipo {
  Movil = "MOVIL",
  Pf = "PF",
  Tat = "TAT",
}

export interface Sugeridos {
  ID:              number;
  DOCUMENTO:       string;
  FECHA:           string;
  NOMBRES:         string;
  NOMBRECARGO:     Nombrecargo;
  SUCURSAL:        string;
  NOMBRE_SUCURSAL: string;
  TIPO:            Tipo;
  CATEGORIA:       string;
  PRODUCTO:        string;
  VALOR_SUGERIDO:  number;
  VALOR_META:      number;
  ESTADO:          Estado;
}
