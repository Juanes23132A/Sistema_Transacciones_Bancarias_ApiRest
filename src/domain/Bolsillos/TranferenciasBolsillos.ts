export class TransferenciaBolsillos {
    transferencia_bolsillos_id?: number;
    bolsillo_origen_id: number;
    bolsillo_destino_id: number;
    monto: number;
    fecha_transferencia?: Date;

    constructor(infoTransferenciaBolsillos: {
        transferencia_bolsillos_id?: number;
        bolsillo_origen_id: number;
        bolsillo_destino_id: number;
        monto: number;
        fecha_transferencia?: Date;
    }) {
        this.transferencia_bolsillos_id = infoTransferenciaBolsillos.transferencia_bolsillos_id;
        this.bolsillo_origen_id = infoTransferenciaBolsillos.bolsillo_origen_id;
        this.bolsillo_destino_id = infoTransferenciaBolsillos.bolsillo_destino_id;
        this.monto = infoTransferenciaBolsillos.monto;
        this.fecha_transferencia = infoTransferenciaBolsillos.fecha_transferencia;
    }
}