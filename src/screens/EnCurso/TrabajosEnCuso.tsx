import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CardTrades from '../../components/Principal/CardTrades';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import LottieView from 'lottie-react-native';
import ButtonOpen from '../../components/MenuDrawer/ButtonOpen';

type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;

const TrabajosEnCuso = ({ navigation }: Props) => {

  let TrabajadorEnCurso = ['']



  return (
    <View style={styles.containerGlobal}>
      <View style={styles.containerScroll}>
        {
          TrabajadorEnCurso.length > 0 ? (
            <ScrollView>
              {
                // TrabajadorEnCurso.map((trade, index) => (
                //   <CardTrades
                //     key={index}
                //     idTrabajador={'1'}
                //     trade={'1'}
                //     user={'1'}
                //     fecha={''}
                //     photoUser={'1'}
                //     navigation={navigation}
                //     from={2}
                //   />
                // ))
              }
            </ScrollView>
          ) : (
            <LottieView
              source={require('../../animated/empty-box.json')}
              autoPlay
              loop
            />
          )
        }
      </View>
    </View>
  )
}

export default TrabajosEnCuso

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
    height: 80,
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
  },
  containerScroll: {
    height: '70%',
    padding: 10,
  }
})