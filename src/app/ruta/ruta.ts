export interface Ruta {
    id: number;
    codigo_carro:string;
    nombre_ruta: string;
    latitud_inicio:number;
    longitud_inicio:number;
    latitud_fin:number;
    longitud_fin:number;
    tiene_saltos:boolean;
    fecha_modificacion:Date;
    idKmlRuta:number;
}
