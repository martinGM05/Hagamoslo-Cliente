export interface UserModel {
    id: number,
    idRol: number,
    nombre: string,
    correo: string,
    token: string,
    contrasena?: string,
    descripcion?: string,
    localizacion?: string,
    numero: string,
    urlFoto: string,
    valoracion?: number,
    idSala?: string,
    tokenFCM: string,
}

export interface EditUserData {
    Name: string;
    Phone: string;
}
