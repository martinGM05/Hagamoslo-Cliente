import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { Avatar } from 'react-native-elements';
import { RootStackParams } from '../../routes/StackNavigator';

import LogOut from '../../components/Buttons/LogOut';
import SearchInput from '../../components/Principal/SearchInput';
import CardCategories from '../../components/Principal/CardCategory';
import CardTrades from '../../components/Principal/CardTrades';

import LottieView from 'lottie-react-native';
import ContainerModal from '../../components/Helper/ContainerModal';
import { SesionContext } from '../../context/Sesion/SesionContext';
import UseApi from '../../hooks/UseApi';


type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;

const PrincipalClient = ({ navigation }: Props) => {

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
                <View style={styles.containerUser}>
                    
                    <LogOut navigation={navigation} />
                </View>
                <View style={styles.containerGreetings}>
                    <Text style={styles.textName}> Hola {Sesion.nombre}!!</Text>
                    <Text style={styles.textWelcome}>Mira lo que tenemos para ti.</Text>
                </View>
                <View style={styles.searchWork}>
                    <SearchInput setTrade={setTrade} trade={trade} />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.containerCategories}>
                        <CardCategories
                            name={'principal'}
                            icon='star'
                            setLoading={setLoading}
                            setTrade={setTrade}
                            trade={trade}
                        />
                        {
                            Oficio.map((e, index) => (
                                <CardCategories
                                    name={e.nombre}
                                    key={index}
                                    icon={"music"}
                                    setLoading={setLoading}
                                    setTrade={setTrade}
                                    trade={trade}
                                />
                            ))

                        }
                    </View>
                </ScrollView>
                {
                    loading ? (
                        <View style={styles.containerTrades}>

                            {

                                Trabajador.map((trade, index) => (
                                    <CardTrades
                                        key={index}
                                        idTrabajador={trade.id.toString()}
                                        trade={"beta"}
                                        user={trade.nombre}
                                        rating={trade.valoracion}
                                        photoUser={'https://hagamoslo.azurewebsites.net/api/upload/Users/4'}
                                        navigation={navigation}
                                        from={1}
                                    />
                                ))}

                        </View>
                    ) : (
                        <View style={styles.loading}>
                            <LottieView
                                source={require('../../animated/bouncing-ball.json')}
                                autoPlay
                                loop
                            />
                        </View>
                    )
                }
            </ScrollView>

        </View>
    )
}

export default PrincipalClient

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        marginLeft: 10,
        marginRight: 10,
    },
    containerUser: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    containerGreetings: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        width: '100%',
    },
    textName: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
    },
    textWelcome: {
        fontSize: 18,
        color: '#000',
        marginLeft: 7,
    },
    searchWork: {
        marginTop: 3,
        padding: 10,
        borderWidth: 1,
        borderColor: '#3f3f3f',
        width: '100%',
        height: 60,
        borderRadius: 10,
    },
    containerCategories: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 100,
        width: 'auto',
        height: 100,
    },
    containerTrades: {
        marginTop: 10,
        marginBottom: 100,
        width: '100%',
        height: 'auto',
    },
    avatar: {
        width: 80,
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 1,
    },
    loading: {
        // backgroundColor: '#000',
        width: '100%',
        height: 230,
        marginTop: 20,
        // borderWidth: 1,
    }
})