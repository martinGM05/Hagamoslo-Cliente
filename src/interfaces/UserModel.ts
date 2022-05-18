export interface UserModel {
    contrasena:string,
    correo:string,
    descripcion:string,
    id:number,
    idRol:number,
    localizacion:string,
    nombre:string,
    numero:string,
    urlFoto:string,
    valoracion:number,
    token:string,
    idSala?: string
}

export interface EditUserData {
    Name: string;
    Phone: string;
}
