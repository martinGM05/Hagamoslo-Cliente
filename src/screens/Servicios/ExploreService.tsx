import { Alert, Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import MapView, { AnimatedRegion, Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { markers, mapNightStyle } from './MapData';
import useTags from '../../hooks/useTags';
import useWorkers, { Workers } from '../../hooks/useWorkers';
import { _url } from '../../global/Variables';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreService = () => {

    const { tags, coordinates } = useTags();
    const { workersState, searchTag, filtro, alertChat } = useWorkers();

    const _map: any = useRef(null)

    return (
        <>
            {
                workersState !== null && (
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
                                    {filtro.map((worker) => {
                                        return (
                                            <Marker
                                                key={worker.id}
                                                coordinate={{
                                                    latitude: worker?.latitud,
                                                    longitude: worker?.longitud,
                                                }}
                                                onPress={() => { }}
                                                title={worker.nombre}
                                                description={worker.descripcion}
                                            >
                                                <View style={[styles.markerWrap]}>
                                                    <Image
                                                        source={{ uri: `${_url}/upload/Users/${worker.id}` }}
                                                        style={[styles.marker]}
                                                        resizeMode="cover"
                                                    />
                                                </View>
                                                <Callout tooltip
                                                    onPress={() => alertChat(worker.id, worker.tokenFCM)}
                                                >
                                                    <View style={styles.bubble}>
                                                        <Text style={styles.name}>{worker.nombre}</Text>
                                                        <Text style={styles.description}>{worker.descripcion}</Text>
                                                        {
                                                            worker.tags !== null && worker.tags.map((tag, i) => {
                                                                return (
                                                                    <Text key={i} style={styles.tag}>{tag.title}</Text>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </Callout>
                                            </Marker>
                                        )
                                    })}
                                </MapView>
                            )
                        }
        
                        <View style={styles.searchBox}>
                            <TextInput
                                placeholder='Busca aquí'
                                placeholderTextColor={'#000'}
                                autoCapitalize="none"
                                style={{ flex: 1, padding: 0 }}
                                onChangeText={(text) => searchTag(text)}
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
                            {
                                tags.map((service, index) => (
                                    <TouchableOpacity key={service.id} style={styles.chipsItem}
                                        onPress={() => searchTag(service.nombre)}
                                    >
                                        <Ionicons name={service.icono} size={20} color="#000" />
                                        <Text style={{ color: '#000' }}>{service.nombre}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                    )
            }
        </>
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