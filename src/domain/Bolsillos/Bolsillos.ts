export class Bolsillo {
    bolsillo_id?: number;
    usuario_id: number;
    nombre: string;
    saldo?: number;
    
    constructor(infoBolsillo: {
        bolsillo_id?: number;
        usuario_id: number;
        nombre: string;
        saldo?: number;
    }) {
        this.bolsillo_id = infoBolsillo.bolsillo_id;
        this.usuario_id = infoBolsillo.usuario_id;
        this.nombre = infoBolsillo.nombre;
        this.saldo = infoBolsillo.saldo;
    }
}