export interface BlogsModel {
    id?: number;
    titulo: string;
    descripcion: string;
    idUsuario: number;
}

export interface ComentarioBlog{
    id:number,
    comentario:string,
    idBlog:number,
    idTrabajador:number,
    user:{
        correo:string,
        id:number,
        nombre:string
    }
}