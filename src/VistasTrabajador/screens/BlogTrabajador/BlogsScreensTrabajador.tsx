import { Alert, Dimensions, Pressable, StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UseBlogTrabajador from '../../../hooks/UseBlogTrabajador';
import { RootStackParams } from '../../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';



type Props = StackScreenProps<RootStackParams, 'BlogsScreenTrabajador'>;
const BlogsScreensTrabajador = ({ navigation }: Props) => {


  const [modalVisible, setModalVisible] = useState(false);
  const {blogs}=UseBlogTrabajador()


  return (
    <View style={styles.container}>
      {
        blogs.map((blog, index) => (
          <View key={index} style={styles.containerBlog}>
            <View style={styles.containerInfo}>
              <Text style={styles.textTitle}>{blog.titulo}</Text>
              <Text style={styles.textDescription}>{blog.descripcion}</Text>
            </View>
            <View>
                <Pressable
                  onPress={() => {
                    navigation.navigate('BlogTrabajador',{id:blog.id,encabezado:blog.titulo,cuerpo:blog.descripcion})
                   }}
                >
                  <FontAwesome5 name="external-link-alt" size={15} color="#000" />
                </Pressable>
            </View>
          </View>
        ))
      }
     
      
    </View>
  )
}

export default BlogsScreensTrabajador

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnAdd: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6f0e8b',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerBlog: {
    width: Dimensions.get('window').width - 20,
    marginLeft: 10,
    marginTop: 10,
    height: 100,
    padding: 10,
    backgroundColor: '#edebe9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  containerInfo: {
    flex: 1,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textDescription: {
    fontSize: 15,
    color: '#000',
  }
})