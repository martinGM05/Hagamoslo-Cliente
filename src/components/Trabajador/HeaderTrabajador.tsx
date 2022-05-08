import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';

interface Props {
    trades: string[];
    name: string;
    photo: string;
    rating: number;
}

const HeaderTrabajador = ({ trades, name, photo, rating }:Props) => {
    return (
        <View style={styles.dataUser}>
            <View style={styles.containerTitle}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="book" size={23} color="#9DD6EB" style={{ marginRight: 10 }} />
                    <Text style={styles.textTitle}>Trabajador</Text>
                </View>
                <Text style={styles.textUser}>{name}</Text>
                <View style={styles.trades}>
                    {
                        trades.length > 3 ? (
                            <>
                                <View style={styles.containerTrade}>
                                    <Text numberOfLines={1} style={styles.textTrade}>{trades[0]}</Text>
                                </View>
                                <View style={styles.containerTrade}>
                                    <Text numberOfLines={1} style={styles.textTrade}>{trades[1]}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert('Oficios', trades.join(', '))
                                    }}
                                >
                                    <Text style={styles.textMas}>Ver más</Text>
                                </TouchableOpacity>
                            </>

                        ) : (
                            trades.map((item, index) => (
                                <View key={index} style={styles.containerTrade}>
                                    <Text numberOfLines={1} style={styles.textTrade}>{item}</Text>
                                </View>
                            ))
                        )
                    }
                </View>
                <AirbnbRating
                    count={5}
                    defaultRating={rating}
                    showRating={false}
                    size={15}
                    starContainerStyle={styles.star}
                    isDisabled
                />
            </View>
            <View style={styles.containerImage}>
                {
                    photo ? (
                        <Image
                            source={{ uri: photo }}
                            style={styles.imageUser}
                        />
                    ) : (
                        <Image 
                            source={require('../../img/no-image.png')}
                            style={styles.imageUser}
                        />
                    )
                }
               
            </View>
        </View>
    )
}

export default HeaderTrabajador

const styles = StyleSheet.create({
    dataUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 5,
        marginRight: 20,
        padding: 10,
    },
    containerTitle: {
        marginTop: 3,
        // borderWidth: 2,
        width: 230,
        height: '100%',
    },
    textTitle: {
        fontSize: 20,
        color: '#000',
    },
    textUser: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    trades: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerTrade: {
        width: 70,
    },
    textTrade: {
        color: '#000',
        fontSize: 15,
    },
    textMas: {
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#000',
        fontSize: 15,
    },
    star: {
        left: 0,
        top: 2,
        position: 'absolute',
    },
    containerImages: {
        marginRight: 9,
        width: 350,
        height: '100%',
    },
    containerImage: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.56,
        shadowRadius: 13.98,
        elevation: 5,
        // borderWidth: 2,
        borderRadius: 50,
    },
    imageUser: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },

})