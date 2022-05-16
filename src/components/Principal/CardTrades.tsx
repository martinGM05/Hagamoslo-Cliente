import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import { AirbnbRating } from 'react-native-ratings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParams } from '../../routes/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { Rating } from 'react-native-elements';



interface Props {
    trade: string;
    user: string;
    fecha?: string;
    photoUser: string;
    rating:number;
    navigation?: StackNavigationProp<RootStackParams, 'PrincipalCliente'>;
    
    from: number;
    idTrabajador: string;
}


const CardTrades = ({ trade, user, fecha, photoUser, navigation, idTrabajador, rating, from }: Props) => {


    const [loading, setLoading] = useState(true)

 let foto=['']


    const handleTrabajador = (id: string) => {
        navigation?.navigate('Trabajador', { id: id });
    }

    const CalificarTrabajador = (photo: string, nameEmploye: string, office: string, idEmploye: string) => {
        navigation?.navigate('Valorar', { photo: photo, nameEmploye: nameEmploye, office: office, idEmploye: idEmploye });

    }

    return (
        <View style={styles.cardTrade}>
            <View style={styles.imageTrade}>
                {
                    loading ?
                        <Image
                            source={require('../../img/jar-loading.gif')}
                            style={styles.image}
                        />
                        :
                        (
                            foto[0] ? (
                                <Image
                                    source={{ uri: foto[0] }}
                                    style={styles.image}
                                />
                            ) : (
                                <Image
                                    source={require('../../img/no-image.png')}
                                    style={styles.image}
                                />
                            )
                        )
                }

            </View>
            <View style={styles.cardWorker}>
                <View style={styles.cardWorkerInfo}>
                    <View style={styles.cardInfoUser}>
                    {from === 4 ? (
                                <Text style={styles.date}>Concluido el {fecha}</Text>
                            ) : null}
                            
                        <View style={styles.user}>
                            <Text style={styles.trade}>
                                {
                                    trade.replace(/,/g, ', ')
                                }
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    photoUser ? (
                                        <Image
                                            source={{ uri: `${photoUser}` }}
                                            style={styles.userImage}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../../img/no-image.png')}
                                            style={styles.userImage}
                                        />
                                    )
                                }

                                <Text style={styles.userName}>{user}</Text>
                                

                            </View>
                            
                            <AirbnbRating
                                count={5}
                                defaultRating={rating}
                                showRating={false}
                                size={15}
                                starContainerStyle={styles.star}
                                isDisabled={true}
                            />
                           

                        </View>
                        {
                            from === 1 ? (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleTrabajador(idTrabajador)}
                                >
                                    <Icon name="info-circle" size={35} color="#000" />
                                </TouchableOpacity>
                            ) : (
                                from === 3 ? (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleTrabajador(idTrabajador)}
                                    >
                                        <Icon name="info-circle" style={styles.moreInfo} />
                                    </TouchableOpacity>
                                ) : (from===2 ? (
                                    <View style={styles.containerIcons}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => handleTrabajador(idTrabajador)}
                                        >
                                            <Icon name="info-circle" style={styles.moreInfo} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => CalificarTrabajador(photoUser, user, trade, idTrabajador)}
                                        >
                                            <Icon name="handshake-o" style={styles.moreInfo} />
                                        </TouchableOpacity>
                                    </View>
                                ):
                                <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleTrabajador(idTrabajador)}
                            >
                                <Icon name="info-circle" size={35} color="#000" />
                            </TouchableOpacity>)
                            )
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CardTrades

const styles = StyleSheet.create({
    cardTrade: {
        width: '100%',
        height: 320,
        marginBottom: 20,
        marginTop: 5,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 5,

    },
    imageTrade: {
        flex: 2,
        // backgroundColor: 'yellow',
        borderRadius: 30,
        position: 'relative',
        zIndex: 0,
    },
    cardWorker: {
        backgroundColor: '#f6f6f6',
        borderRadius: 30,
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: 130,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 20.22,

        elevation: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        resizeMode: 'cover',
    },
    cardWorkerInfo: {
        // borderWidth: 1,
        marginLeft: 5,
        marginRight: 13,
        marginTop: 13,
        // marginBottom: 10,
        width: '90%',
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardInfoUser: {
        // backgroundColor: '#bfeb27',
        width: '100%',
        height: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    user: {
        flexDirection: 'column',
        marginTop: 5,
        // borderWidth: 1,
    },
    userImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    userName: {
        marginLeft: 8,
        fontSize: 18,
        color: '#383838',
        marginTop: 9,
        fontWeight: 'bold',
    },
    trade: {
        fontSize: 23,
        color: '#000',
        fontWeight: 'bold',
        marginTop: -15,
        marginBottom: 10,
    },
    star: {
        left: 60,
        position: 'absolute',

    },
    button: {
        // marginLeft: 90,
        marginTop: 25,
    },
    moreInfo: {
        fontSize: 30,
        color: '#000',
    },
    containerIcons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: -30,
    },
    date:{ 
        color: '#000', 
        marginLeft: 190, 
        marginTop: 95, 
        fontWeight: 'bold' , 
        position:'absolute',
        
    }
})