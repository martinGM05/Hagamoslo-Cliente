export type IOficeIcon = {
    id:number
    nombre: string;
    icono: string;
}

export interface ITrabajador {
   id:number,
   nombre:string,
   correo:string,
   urlFoto:string,
   numero:string,
   localizacion:string,
   idRol:number,
   descripcion:string,
   valoracion:number

}

export interface IEnCurso{
    id:number,
    descripcion:string,
    fechaInicio:string,
    fechaFin:string,
    costo:number,
    trabajador:{
        idTrabajador:number,
        nombre:string,
        tokenFCM:string
    }
}

export interface IEnCursoHistorialTrabajador{
    id:number,
    descripcion:string,
    fechaInicio:string,
    fechaFin:string,
    costo:number,
    usuario:{
        idUsuario:number,
        nombre: string
    }
}