import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/clientAxios'
import { SesionContext } from '../../context/Sesion/SesionContext';
import { BlogsModel, ComentarioBlog } from '../../interfaces/BlogModel';



const useBlog = () => {
  
    const { Sesion } = useContext(SesionContext);

    const [blogs, setBlogs] = useState<BlogsModel[]>([]);
    const [comentarios, setComentarios]=useState<ComentarioBlog[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBlogByUser(Sesion.id);
    }, [])

    const getBlogByUser = async (id: number) => {
        const response = await clienteAxios.get(`/blog/${id}`)
        setBlogs(response.data);
    }

    const createBlog = async (blog: BlogsModel) => {
        const response = await clienteAxios.post(`/blog`, blog)
        setBlogs([...blogs, response.data]);
        if(response.data){
            
            Alert.alert('Mensaje', 'Blog creado')
            getBlogByUser(Sesion.id);
        }
    }
  
  const EliminarBlob=async(id?:number)=>{
      const response= await clienteAxios.delete('/blog/'+id)
      if(response.data){
          Alert.alert('Mensaje', 'Blog eliminado')
      }
  }

    const getComentarios=async(id?:number)=>{
        const response= await clienteAxios.get('/comentarioBlog/'+id)
       
        if(response.data){
        const comentario = response.data as ComentarioBlog
        setComentarios(e=>e.concat(comentario))
        }
    }
    return {
        blogs,
        createBlog,
        EliminarBlob,
        getBlogByUser,
        getComentarios,
        comentarios
        
    }
}

export default useBlog