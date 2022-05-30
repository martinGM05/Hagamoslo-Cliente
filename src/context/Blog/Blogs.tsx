import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import clienteAxios from '../../config/clientAxios';
import { _url } from '../../global/Variables';
import { BlogsModel, ComentarioBlog } from '../../interfaces/BlogModel';
import { SesionContext } from '../Sesion/SesionContext';


export interface BlogsContextProps {
    comentarios: ComentarioBlog[];
    blogs: BlogsModel[];
    createBlog: (blog: BlogsModel) => void;
    EliminarBlob: (id?: number) => void;
    getBlogByUser: (id: number) => void;
    getComentarios: (id?: number) => void;
}

export const BlogContext = createContext({} as BlogsContextProps);

export const BlogProvider = ({ children }: { children: JSX.Element[] }) => {

    const { Sesion } = useContext(SesionContext);
    const [blogs, setBlogs] = useState<BlogsModel[]>([]);
    const [comentarios, setComentarios] = useState<ComentarioBlog[]>([])
    const [loading, setLoading] = useState(false);

    const getBlogByUser = async (id: number) => {
        const response = await clienteAxios.get(`/blog/${id}`)
        setBlogs(response.data);
    }

    const createBlog = async (blog: BlogsModel) => {
        const response = await clienteAxios.post(`/blog`, blog)
        setBlogs([...blogs, response.data]);
        if (response.data) {
            getBlogByUser(Sesion.id);
            Alert.alert('Mensaje', 'Blog creado')
        }
    }

    const EliminarBlob = async (id?: number) => {
        const response = await clienteAxios.delete('/blog/' + id)
        if (response.data) {
            Alert.alert('Mensaje', 'Blog eliminado')
        }
    }

    const getComentarios = async (id?: number) => {
        const response = await clienteAxios.get('/comentarioBlog/' + id)

        if (response.data) {
            const comentario = response.data as ComentarioBlog
            setComentarios(e => e.concat(comentario))
        }
    }

    return (
        <BlogContext.Provider value={{
            comentarios,
            blogs,
            createBlog,
            EliminarBlob,
            getBlogByUser,
            getComentarios,
        }}>
            {children}
        </BlogContext.Provider>
    )
}



