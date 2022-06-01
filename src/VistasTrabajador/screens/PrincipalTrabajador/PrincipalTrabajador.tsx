import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import CardTrades from '../../../components/Principal/CardTrades';
import Icon from 'react-native-vector-icons/Ionicons';

import LottieView from 'lottie-react-native';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import UseApi from '../../../hooks/UseApi';
import ButtonOpen from '../../../components/MenuDrawer/ButtonOpen';
import ButtonsCards from '../../../components/Buttons/ButtonsCards';
import useNotification from '../../../hooks/useNotification';

const PrincipalTrabajador= ({navigation}: any ) => {

    const { Sesion } = useContext(SesionContext)
    const [loading, setLoading] = useState(false)
    const [trade, setTrade] = useState('Principal')
    const { Oficio, GetOficios, GetTrabajadores, Trabajador } = UseApi()
    
    let Photo = ''



    let Trabajadoraux = ['']

    useEffect(() => {
        GetOficios()
        GetTrabajadores()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 2000)
    }, [Trabajadoraux, Trabajador])


    return (
        
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.welcome}>
                    <Text style={styles.text}>Hola, {Sesion.nombre}</Text>
                    <View style={styles.containerCards}>
                       <Text style={styles.text2}>Tenemos estas opciones para ti</Text>
                    </View>
                </View>
                <View style={styles.containerCardButton}>
                    <ButtonsCards 
                        icon='document' 
                        title='Blogs'
                        navigation={navigation}
                        screen={"Blogs"}
                        description='Entra para poder ver tus blogs.' />
                    <ButtonsCards 
                        icon='git-branch' 
                        title='Historial'
                        navigation={navigation}
                        screen={"Historial"} 
                        description='Entra para poder ver tu historial.' />
                    <ButtonsCards 
                        icon='hammer' 
                        title='En Curso'
                        navigation={navigation}
                        screen={"Curso"} 
                        description='Entra para poder ver tus servicios en curso.' />
                   
                </View>
            </ScrollView>

        </View>
    )
}

export default PrincipalTrabajador

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        marginLeft: 10,
        marginRight: 10,
    },
    containerTrades: {
        marginTop: 10,
        marginBottom: 100,
        width: '100%',
        height: 'auto',
    },
    loading: {
        // backgroundColor: '#000',
        width: '100%',
        height: 230,
        marginTop: 20,
        // borderWidth: 1,
    },
    welcome: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
        elevation: 10,
    },
    analytics: {
        borderWidth: 2,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#000'
    },
    containerCards: {
        flexDirection: 'row',
        marginTop: 10
    },
    cardBlog: {
        width: 100,
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    containerCardButton: {
        backgroundColor: '#f7f7f7',
        // borderWidth: 3,
        marginVertical: 10,
        padding: 8,
    },
    
    text: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10
    },
    text2: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    textNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    textCard: {
        fontSize: 15,
        color: '#000',
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 10
    },
    
   
})