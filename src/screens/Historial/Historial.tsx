import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CardTrades from '../../components/Principal/CardTrades';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';

import LottieView from 'lottie-react-native';


type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;


const Historial = ({ navigation }: Props) => {


  let TrabajadorHistorial=['']
  let HistorialList = ['']

    return (
        <View style={styles.containerGlobal}>
            <LinearGradient
                colors={['#00C9FF', '#92FE9D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
                style={styles.containerTitle}
            >
                <View style={styles.containerText}>
                    <Icon name="book" size={30} color="#000" />
                    <Text style={styles.title}>Historial</Text>
                    <Icon name="history" size={35} color="#000" />
                </View>
            </LinearGradient>
            <View style={styles.containerScroll}>
                {
                    TrabajadorHistorial.length > 0 ? (
                        <ScrollView>
                            {
                                // TrabajadorHistorial.map((item, index) => (
                                //     HistorialList.map((e) => (
                                //         e.idTrabajador === item.Id ?
                                //             <CardTrades
                                //                 key={index}
                                //                 trade={item.Oficios.toString()}
                                //                 user={item.nombre}
                                //                 fecha={e.fecha}
                                //                 idTrabajador={item.Id}
                                //                 photoUser={item.fotoUser}
                                //                 navigation={navigation}
                                //                 from={4}
                                //             />
                                //             : null
                                //     ))
                                // ))
                            }
                        </ScrollView>
                    ) : (
                        <LottieView
                            source={require('../../animated/10000-empty-box.json')}
                            autoPlay
                            loop
                        />
                    )
                }
            </View>
        </View>
    )
}

export default Historial

const styles = StyleSheet.create({
    containerGlobal: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
        marginRight: 10,
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 9,
    },
    containerText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 30,
    },
    containerScroll: {
        height: '70%',
        padding: 10,
    }
})