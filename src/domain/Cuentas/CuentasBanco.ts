export class CuentasBanco {
    usuario_id: number;
    cuenta_id: number;

    constructor(infoCuentasBanco: {
        usuario_id: number;
        cuenta_id: number;
    }) {
        this.usuario_id = infoCuentasBanco.usuario_id;
        this.cuenta_id = infoCuentasBanco.cuenta_id;
    }
}