import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clientAxios'
import { ComentarioBlog } from '../interfaces/BlogModel'
import { SesionContext } from '../context/Sesion/SesionContext'

export interface blogsTrabajador {
    id: number,
    titulo: string,
    descripcion: string,
    idUsuario: number,
    user: {
        id: number,
        nombre: string,
        correo: string,
        tokenFCM: string
    }
}



const UseBlogTrabajador = () => {

    useEffect(() => {
        getBlogsTrabajador()
    }, [])
    
    const { Sesion } = useContext(SesionContext);
    const [blogs, setBlogs] = useState<blogsTrabajador[]>([])
    const [comentariosTrabajador, setComentariosTrabajador] = useState<ComentarioBlog[]>([])
    const getBlogsTrabajador = async () => {
        const result = await clienteAxios.get('/blog')
        if (result.data) {
            setBlogs(result.data)
        }
    }
    const getComentariosTrabajador = async (id?: number) => {
        const response = await clienteAxios.get('/comentarioBlog/' + id)

        if (response.data) {
            const comentario = response.data as ComentarioBlog[]
            // setComentariosTrabajador(e => e.concat(comentario))
            setComentariosTrabajador(comentario)
        }
    }

    const CrearComentario = async (comentario: string, idBlog?: number) => {

        if(comentario.length > 0){
            const response = await clienteAxios.post('/comentarioBlog', {
                comentario: comentario,
                idBlog: idBlog,
                idTrabajador: Sesion.id
            })
            if (response.data) {
                Alert.alert('Mensaje', 'Comentario enviado')
                getComentariosTrabajador(idBlog)
            }
        }else{
            Alert.alert('Mensaje', 'Comentario vacio')
        }

    }

    return {
        blogs,
        getBlogsTrabajador,
        comentariosTrabajador,
        getComentariosTrabajador,
        CrearComentario

    }
}

export default UseBlogTrabajador