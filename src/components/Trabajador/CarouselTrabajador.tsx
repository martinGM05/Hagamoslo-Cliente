import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Swiper from 'react-native-swiper'


interface Props {
    carousel: string[],
}

const dimensions = Dimensions.get('window')

const CarouselTrabajador = ({ carousel }: Props) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 1000)
    }, [carousel])


    return (
        <>
            {
                loading ? (
                    <View style={styles.containerCarousel}>
                        <Swiper style={styles.wrapper} showsButtons={true}
                            autoplay={true} autoplayTimeout={90} loop={true}
                            nextButton={<Text style={styles.buttonText}>›</Text>}
                            prevButton={<Text style={styles.buttonText}>‹</Text>}
                        >
                            {
                                carousel ?
                                    carousel.map((item, index) => (
                                        <View style={styles.slide1} key={index}>
                                            <Image source={{ uri: item }} style={styles.image} />
                                        </View>
                                    )) : (
                                        <View style={styles.slide1}>
                                            <Image source={require('../../img/jar-loading.gif')} style={styles.image} />
                                        </View>
                                    )
                            }
                        </Swiper>
                    </View>
                ) : (
                    <View style={styles.containerCarousel}>
                        <Image source={require('../../img/jar-loading.gif')} style={styles.image} />
                    </View>
                )
            }
        </>
    )
}

export default CarouselTrabajador

const styles = StyleSheet.create({
    containerCarousel: {
        // marginTop: 20,
        paddingBottom: 50,
        // backgroundColor: 'red',
        padding: 0,
        top: 0,
        left: 0,
        height: '45%',
        width: dimensions.width,
    },
    wrapper: {
    },
    buttonText: {
        fontSize: 80,
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        resizeMode: 'cover'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    loadingImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})