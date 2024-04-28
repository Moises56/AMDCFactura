// interface para localidades
export interface Localidades {
    id: number;
    propietario: string;
    DNI: string;
    numero_local: number;
    nombre_local: string;
    tipo_local: string;
    estado_local: string;
    latitud: string;
    longitud: string;
    telefono: number;
    direccion: string;
    monto: number;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    mercado_id: string;
}

export interface marketLocals {
    nombre_mercado: string;
    propietario: string;
    DNI: string;
    nombre_local: number;
    tipo_local: string;
    estado_local: string;
    telefono: number;
    direccion: string;
    monto: number;
    fecha_creacion: Date;
}
