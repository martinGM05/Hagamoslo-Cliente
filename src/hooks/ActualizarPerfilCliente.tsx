import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SesionContext } from '../context/Sesion/SesionContext';
import axios from 'axios';
import { _url } from '../global/Variables';
import clienteAxios from '../config/clientAxios';

const ActualizarPerfilCliente = () => {
    const [modalVisibleC, setModalVisibleC] = useState(false);
    const { Sesion, dataPhoto } = useContext(SesionContext)

    const ActualizarDatosCliente=async(datos:any)=>{
        console.log(datos)
        console.log(dataPhoto) 
        const artTemp = new FormData();
        artTemp.append('archivo', {
            uri: dataPhoto,
            type: 'image/jpeg',
            name: 'Imagen.jpg'
        });

        if(dataPhoto!=''){
            axios.all([
                axios.put(_url+'/usuarios/'+Sesion.id,{
                    nombre:datos.Name,
                    numero:datos.Phone
                },{
                    headers:{
                        'Api-Key':Sesion.token
                    }
                }),
                axios.put(_url+'/upload/Users/'+Sesion.id,artTemp,{
                    headers:{
                        "content-type": "multipart/form-data"
                    }
                })
            ]).then(axios.spread((data1,data2)=>{
                //console.log(data1.data)
                if(data1.data){
                    if(data2.data){
                        setModalVisibleC(true)
                    }
                }
            }))
        }else{
            console.log('HOla')
            const result = await clienteAxios.put('/usuarios/'+Sesion.id,{
                nombre:datos.Name,
                numero:datos.Phone
            },{
                headers:{
                    'Api-Key':Sesion.token 
                }
            })
            if(result.data){
                
                console.log(result.data)
                setModalVisibleC(true)
            }
        }

    }
  return {
      ActualizarDatosCliente,
      modalVisibleC, setModalVisibleC
  }
}

export default ActualizarPerfilCliente

const styles = StyleSheet.create({})