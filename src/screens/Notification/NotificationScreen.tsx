import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>¿Desea aceptar el presupuesto?</Text>
      <View style={styles.containerData}>
        <Text style={styles.text1}>Nombre del trabajador:</Text>
        <Text style={styles.text2}>Martin</Text>
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.text1}>Total: </Text>
        <Text style={styles.text2}>$1.000</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.textButton}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginTop: 60,
  },
  containerData: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  containerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  text2: {
    fontSize: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})