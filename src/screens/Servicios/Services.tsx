import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Callout, MapStyleElement, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { mapNightStyle } from './MapData';


const Services = () => {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    const getLocation = async () => {
      await Geolocation.getCurrentPosition(info => {
        setLatitude(info.coords.latitude)
        setLongitude(info.coords.longitude)
      })
    }
    getLocation()
  }, [])

  return (
    <View style={styles.container}>
      {
        latitude !== 0 && longitude !== 0 && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapNightStyle}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}

            zoomControlEnabled={true}
          >
            <Marker
              coordinate={{
                latitude: 19.860274433748714,
                longitude: -97.35911013599626,
              }}
              title="Mi ubicación"
              description='Mi ubicación'
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>Favourite Restaurant</Text>
                    {/* <Image 
                  style={styles.image}
                  source={require('../../img/Logo.png')}
                /> */}
                  </View>
                </View>
              </Callout>
            </Marker>

          </MapView>
        )
      }
    </View>
  )
}

export default Services

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    padding: 15,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#000',
  },
})