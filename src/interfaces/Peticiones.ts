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