import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Callout, MapStyleElement, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { markers, mapNightStyle } from './MapData';
import Animated from 'react-native-reanimated';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreService = () => {

    const initialMapState = {
        markers,
        categories: [
            {
                name: 'Fastfood center',
                icon: <MaterialCommunityIcons name="food-fork-drink" size={30} color="#000" />,
            },
            {
                name: 'Restaurant',
                icon: <Ionicons name="ios-restaurant" size={30} color="#000" />,
            },
            {
                name: 'Dineouts',
                icon: <Ionicons name="md-restaurant" size={30} color="#000" />,
            },
            {
                name: 'Snacks Corner',
                icon: <MaterialCommunityIcons name="food" size={30} color="#000" />,
            },
            {
                name: 'Hotel',
                icon: <FontAwesome5 name="hotel" size={30} color="#000" />,
            }
        ],
        region: {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          },
    }

    const [mapState, setMapState] = useState(initialMapState)

    const _map = useRef(null)
    const _scrollView = useRef(null)


    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={mapState.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapNightStyle}
            >
                {mapState.markers.map((marker, index) => {
                    return (
                        <Marker key={index} coordinate={marker.coordinate} onPress={() => { }}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../../img/no-image.png')}
                                    style={[styles.marker]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput 
                    placeholder='Search here'
                    placeholderTextColor={'#000'}
                    autoCapitalize="none"
                    style={{flex: 1, padding: 0}}
                />
                <Ionicons name="ios-search" size={20} color="#000" />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.chipsScrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0,
                }}
            >
                {mapState.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text style={{color: '#000'}}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default ExploreService

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})