import { Alert, Dimensions, Pressable, StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useBlog from './useBlog';
import FormBlog from '../../components/Helper/FormBlog';

const BlogsScreen = () => {

  const { blogs, createBlog } = useBlog();
  const [modalVisible, setModalVisible] = useState(false);


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
                    Alert.alert("Id del blog: " + blog.id)
                   }}
                >
                  <FontAwesome5 name="ellipsis-v" size={15} color="#000" />
                </Pressable>
            </View>
          </View>
        ))
      }
      <Pressable
        style={styles.btnAdd}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#000" />
      </Pressable>
      <FormBlog modalVisible={modalVisible} setModalVisible={setModalVisible} />
      
    </View>
  )
}

export default BlogsScreen

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