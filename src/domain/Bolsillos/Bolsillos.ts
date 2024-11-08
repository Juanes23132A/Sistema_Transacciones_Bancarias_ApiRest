export class Bolsillo {
    bolsillo_id?: number;
    usuario_id: number;
    nombre: string;
    saldo: number;
    fecha_creacion_bolsillo: Date;

    constructor(infoBolsillo: {
        bolsillo_id?: number;
        usuario_id: number;
        nombre: string;
        saldo: number;
        fecha_creacion_bolsillo: Date;
    }) {
        this.bolsillo_id = infoBolsillo.bolsillo_id;
        this.usuario_id = infoBolsillo.usuario_id;
        this.nombre = infoBolsillo.nombre;
        this.saldo = infoBolsillo.saldo;
        this.fecha_creacion_bolsillo = infoBolsillo.fecha_creacion_bolsillo;
    }
}