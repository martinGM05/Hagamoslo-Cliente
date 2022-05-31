import { Alert, Dimensions, Pressable, StyleSheet, Text, View, Modal, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UseBlogTrabajador from '../../../hooks/UseBlogTrabajador';
import { RootStackParams } from '../../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { _secondaryColor, _url } from '../../../global/Variables';



type Props = StackScreenProps<RootStackParams, 'BlogsScreenTrabajador'>;
const BlogsScreensTrabajador = ({ navigation }: Props) => {


  const [modalVisible, setModalVisible] = useState(false);
  const { blogs, getBlogsTrabajador } = UseBlogTrabajador()

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity 
        style={{ marginRight: 20 }}
        onPress={() => getBlogsTrabajador()}
      >
        <Ionicons name="md-refresh" size={30} color={'black'} />
      </TouchableOpacity>
    )
  })


  return (
    <ScrollView style={styles.container}>
      {
        blogs.map((blog, index) => (
          <View key={index} style={styles.containerBlog}>
            <View style={styles.containerInfo}>
              <Text style={styles.nombreUser}>{blog.user.nombre}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ borderWidth: 1.5, borderRadius: 50 }}>
                  <Image style={styles.avatar} source={{ uri: `${_url}/upload/Users/${blog.user.id}` }} />
                </View>
                <View style={{ marginLeft: 20, width: 250, height: 43}}>
                  <Text style={styles.textTitle}>{blog.titulo}</Text>
                  <Text style={styles.textDescription}>{blog.descripcion}</Text>
                </View>
              </View>
            </View>
            <View>
              <Pressable
                onPress={() => navigation.navigate('BlogTrabajador', { data: blog })}
              >
                <FontAwesome5 name="external-link-alt" size={20} color="#000" />
              </Pressable>
            </View>
          </View>
        ))
      }
    </ScrollView>
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
    marginBottom: 10
  },
  containerInfo: {
    flex: 1,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: `${_secondaryColor}`,
  },
  textDescription: {
    fontSize: 15,
    color: '#000',
    width: '100%',
  },
  nombreUser: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
  }
})