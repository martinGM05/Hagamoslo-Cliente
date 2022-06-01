import { Alert, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapView, { AnimatedRegion, Callout, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mapNightStyle } from '../../../screens/Servicios/MapData';
import useTags from '../../../hooks/useTags';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../routes/StackNavigator';
// import { getDirections } from '../../../Helper/getDirections';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

type Props = StackScreenProps<RootStackParams, 'MapaTrabajador'>;

const MapsTrabajador = ({ navigation, route }: Props) => {

    
    const { latCliente, lonCliente } = route.params
    const { coordinates } = useTags()
    const [coords, setCoords] = useState<[]>([]);

    const _map: any = useRef(null)

    // useEffect(() => {
    //     //fetch the coordinates and then store its value into the coords Hook.
    //     getDirections("52.5200066,13.404954", "50.1109221,8.6821267")
    //       .then(coords => setCoords(coords))
    //       .catch(err => console.log("Something went wrong"));
    //   }, []);

    return (
        <View style={styles.container}>
            {
                coordinates.latitude !== 0 && coordinates.longitude !== 0 && (
                    <MapView
                        ref={_map}
                        initialRegion={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={styles.container}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapNightStyle}
                    >
                        <Marker
                            coordinate={{
                                latitude: coordinates.latitude,
                                longitude: coordinates.longitude,
                            }}
                            title={'Mi ubicación'}
                            description={'Mi ubicación'}
                        >
                            <Ionicons name="ios-pin" size={40} color={'#000'} />
                        </Marker>
                        <Marker
                            coordinate={{
                                latitude: latCliente,
                                longitude: lonCliente,
                            }}
                            title={'Cliente'}
                            description={'Cliente'}
                        >
                            <Ionicons name="ios-pin" size={40} color={'#000'} />
                        </Marker>
                        <Polyline
                            coordinates={[
                                { latitude: coordinates.latitude, longitude: coordinates.longitude },
                                { latitude: latCliente, longitude: lonCliente },
                            ]}
                            strokeWidth={5}
                            strokeColor="red"
                            geodesic={true}
                            lineJoin="bevel"
                        />
                    </MapView>
                )
            }
        </View>
    )
}

export default MapsTrabajador


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
        marginTop: -5,
        fontWeight: "bold",
        color: "#000",
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
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff",
    },
    button: {
        alignItems: 'center',
        marginTop: 3
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
    },
    starts: {
        width: 120,
        height: 10,
        marginTop: 3,
    },
    bubble: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 15,
        width: 230,
        // height: 200,
        borderRadius: 20,
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000',
        alignSelf: 'center',
    },
    description: {
        fontSize: 12,
        color: '#000',
    },
    btnChat: {
        backgroundColor: '#e16c2d',
        padding: 10,
        borderRadius: 5
    },
    btnChatText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    tag: {
        fontSize: 12,
        color: '#000',
        marginRight: 5,
        marginBottom: 5,

    }
})