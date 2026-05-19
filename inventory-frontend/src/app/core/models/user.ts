export interface Rol {
  idRol: number;
  nombre: string;
}

export interface User {
  idUsuario: number;
  nombre: string;
  correo: string;
  contrasena?: string;
  estatus: boolean;
  rol: Rol;
}
