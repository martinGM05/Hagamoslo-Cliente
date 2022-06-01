import React, { useContext, useEffect, useState } from 'react'
import { SesionContext } from '../context/Sesion/SesionContext'
import axios from 'axios'
import { _url } from '../global/Variables'

export interface editData {
    Name: string,

    Phone: number,

}

const ActualizarPerfilTrabajador = () => {

    const [PhotoLocal, setPhotoLocal] = useState('')
    const { Sesion, dataPhoto } = useContext(SesionContext)
    const [modalVisible, setModalVisible] = useState(false);
    const { selectedItems, setSelectedItems } = useContext(SesionContext)

    let aux: number[] = []

    const ActualizarTrabajador = async ({ Name, Phone }: editData, bandera: boolean, latitud?: number, longitud?: number) => {
        const artTemp = new FormData();
        artTemp.append('archivo', {
            uri: dataPhoto,
            type: 'image/jpeg',
            name: 'Imagen.jpg'
        });
        const data = new FormData();
        data.append("nombre", Name.toString())
        data.append("numero", Phone.toString())

        const dataw = {
            idUsuario: Sesion.id,
            idsTag: selectedItems
        }
        console.log(dataw)

        if (dataPhoto != '') {
            axios.all([
                axios.put(_url + '/usuarios/' + Sesion.id, {
                    nombre: Name,
                    numero: Phone,
                    latitud: latitud,
                    longitud: longitud
                }, {
                    headers: {
                        'Api-Key': Sesion.token
                    }
                }),
                axios.put(_url + '/upload/Users/' + Sesion.id, artTemp, {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Api-Key": Sesion.token
                    }
                }),
                axios.post(_url + '/service', dataw
                    , {
                        headers: {

                            "Api-Key": Sesion.token
                        }

                    })
                    ]).then(axios.spread((data1, data2, data3) => {
                        if (data1.data) {
                            if (data2.data) {
                                if (data3.data) {
                                    setModalVisible(true)
                                }
                            }
                        }
                    }
                )
            )
        } else {
            axios.all([
                axios.put(_url + '/usuarios/' + Sesion.id, {
                    nombre: Name,
                    numero: Phone,
                    latitud: latitud,
                    longitud: longitud
                }, {
                    headers: { 'Api-Key': Sesion.token }
                }),
                axios.post(_url + '/service', dataw,
                    {
                        headers: { "Api-Key": Sesion.token }
                    })
            ]).then(axios.spread((data1, data2) => {
                if (data1.data) {
                    if (data2.data) {

                        setModalVisible(true)

                    }
                }
            }))
        }
    }
    return {
        ActualizarTrabajador,
        setPhotoLocal,
        modalVisible, setModalVisible,
        selectedItems, setSelectedItems
    }
}

export default ActualizarPerfilTrabajador