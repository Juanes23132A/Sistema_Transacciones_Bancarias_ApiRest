tablas base de datos

<!-- USUARIO

id: clave primaria, autoincremental, entero
nombre completo: varchar
email: varhcar
teléfono: int
fecha de la creación de el usuario:Date
estado de cuenta de usuario: enum
contrseña: varchar

CUENTAS

cuenta_id: clave primaria, autoincremental, entero
usuario_id: clave foránea, entero
tipo_cuenta: enum
saldo: decimal
fecha_apertura: Date
estado: enum -->

<!-- TRANSACCIONES

transaccion_id: clave primaria, autoincremental, entero
cuenta_origen_id: clave foránea, entero
cuenta_destino_id: clave foránea, entero
monto: decimal
tipo_transaccion: enum
fecha_transaccion: Date
estado: enum -->

<!-- BOLSILLOS

bolsillo_id: clave primaria, autoincremental, entero
usuario_id: clave foránea, entero
nombre: varchar
saldo: decimal
fecha_creaccion: Date -->

<!-- TRANSFERENCIAS ENTRE BOLSILLOS

transferencia_bolsillo_id: clave primaria, autoincremental, entero
bolsillo_origen_id: clave foránea, entero
bolsillo_destino_id: clave foránea, entero
monto: decimal
fecha_transferencia -->

<!-- SESIONES

sesion_id: autoincremental, entero
usuario_id: calve foránea, entero
fecha_ingreso: Date
fecha_expiracion: Date -->