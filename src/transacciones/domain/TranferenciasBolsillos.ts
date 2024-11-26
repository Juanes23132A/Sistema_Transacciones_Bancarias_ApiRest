export class TransferenciaBolsillos {
    transferencia_bolsillos_id?: number;
    usuario_id: number;
    cuenta_origen_id: number;
    bolsillo_destino_id: number;
    monto: number;
    fecha_transferencia?: Date;

    constructor(infoTransferenciaBolsillos: {
        transferencia_bolsillos_id?: number;
        usuario_id:number
        cuenta_origen_id: number;
        bolsillo_destino_id: number;
        monto: number;
        fecha_transferencia?: Date;
    }) {
        this.transferencia_bolsillos_id = infoTransferenciaBolsillos.transferencia_bolsillos_id;
        this.usuario_id = infoTransferenciaBolsillos.usuario_id;
        this.cuenta_origen_id = infoTransferenciaBolsillos.cuenta_origen_id;
        this.bolsillo_destino_id = infoTransferenciaBolsillos.bolsillo_destino_id;
        this.monto = infoTransferenciaBolsillos.monto;
        this.fecha_transferencia = infoTransferenciaBolsillos.fecha_transferencia;
    }
}