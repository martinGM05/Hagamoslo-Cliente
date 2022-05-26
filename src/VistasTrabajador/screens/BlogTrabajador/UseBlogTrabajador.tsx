import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'



import clienteAxios from '../../../config/clientAxios';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import { BlogsModel } from '../../../interfaces/BlogModel';

const UseBlogTrabajador= () => {
  
    const { Sesion } = useContext(SesionContext);

    const [blogs, setBlogs] = useState<BlogsModel[]>([]);
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
    }
  
  
    return {
        blogs,
        createBlog,
    }
}

export default UseBlogTrabajador