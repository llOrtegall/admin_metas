interface Sucursal {
    ZONA: string;
    NOMBRE: string;
    DIRECCION: string;
}

interface Vendedor {
    DOCUMENTO: string;
    NOMBRES: string;
    NOMBRECARGO: string;
}

export interface ReporteTransaccion {
    IDTRANSACCION: number;
    FECHA: string;
    SUCURSAL: string;
    LOGINSOLICITUD: string;
    CONCEPTO: string;
    VALOR: number;
    TERCERO: string;
    LOGINAUTORIZA: string;
    ESTADO: string;
    NOTA: string;
    VERSION: number;
    FECHACREATE: string;
    FECHAUPDATE: string;
    Vendedore: Vendedor;
    Sucursale: Sucursal;
}