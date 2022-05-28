import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SesionContext } from '../context/Sesion/SesionContext'
import useTags, { Coordinates } from './useTags'
import axios from 'axios'
import { _url } from '../global/Variables'
import clienteAxios from '../config/clientAxios'

export interface editData{
    Name:string,
  
    Phone:number,

}

const ActualizarPerfilTrabajador = () => {

    const [PhotoLocal, setPhotoLocal]=useState('')
    const { Sesion, dataPhoto } = useContext(SesionContext)
    const [modalVisible, setModalVisible] = useState(false);
    const{selectedItems,setSelectedItems}=useContext(SesionContext)
    
    let aux:number[]=[]
    

    const ActualizarTrabajador=async({Name,Phone}:editData, bandera:boolean, latitud?:number, longitud?:number)=>{
        
        //console.log(tags)
        const artTemp = new FormData();
        artTemp.append('archivo', {
            uri: dataPhoto,
            type: 'image/jpeg',
            name: 'Imagen.jpg'
        });
        const data=new FormData();
        data.append("nombre",Name.toString())
        data.append("numero",Phone.toString())


        const dataw={
            idUsuario:Sesion.id,
            idsTag:selectedItems
        }
      console.log(dataw)
        //setModalVisible(true)
        
            try{
                axios.put(_url+'/usuarios/'+Sesion.id,{
                    nombre:Name,
                    numero:Phone,
                    latitud:latitud,
                    longitud:longitud
                },{
                    headers:{
                        
                        'Api-Key':Sesion.token
                    }
                   
                }).then((e)=>{
                    if(e.data){
                        axios.put(_url+'/upload/Users/'+Sesion.id,artTemp,{
                            headers:{
                                "content-type": "multipart/form-data",
                                "Api-Key": Sesion.token
                               }
                        }).then((e)=>{
                            if(e.data){
                                axios.post(_url+'/service',dataw
                                ,{
                                    headers:{
                                        
                                        "Api-Key": Sesion.token
                                       }
                    
                                }).then((e)=>{
                                    if(e.data){
                                        setModalVisible(true)
                                    }
                                })
                            }
                        })
                    }
                })

            }catch(e){
                console.log(e)
            }
            
           
            
        // .then(axios.spread((data1,data2, data3)=>{
        //     console.log('data1: ', data1.data)
        //     console.log('data2: ', data2.data)
        //     console.log('data3: ', data3.data)
        //     if(data1){
        //         if(data2){
        //             setModalVisible(true)
        //         }else{
        //             console.log('error')
        //         }
        //     }else{
        //         console.log('error')
        //     }
        // }))

   
    }
  return {
    ActualizarTrabajador,
      setPhotoLocal,
      modalVisible, setModalVisible,
      selectedItems, setSelectedItems
  }
}

export default ActualizarPerfilTrabajador

const styles = StyleSheet.create({})