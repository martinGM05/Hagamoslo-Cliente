import { Alert, Dimensions, Pressable, StyleSheet, Text, View, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useBlog from './useBlog';
import FormBlog from '../../components/Helper/FormBlog';
import { SesionContext } from '../../context/Sesion/SesionContext';
import { RootStackParams } from '../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParams, 'BlogsScreen'>;

const BlogsScreen = ({ navigation }: Props) => {

  const { blogs, createBlog,EliminarBlob,getBlogByUser } = useBlog();
  const [modalVisible, setModalVisible] = useState(false);
  const { Sesion } = useContext(SesionContext);


  return (
    <View style={styles.container}>
      {
        blogs.map((blog, index) => (
          <View key={index} style={styles.containerBlog}>
            <View style={styles.containerInfo}>
              <Text style={styles.textTitle}>{blog.titulo}</Text>
              <Text style={styles.textDescription}>{blog.descripcion}</Text>
            </View>
            <View style={{justifyContent:'space-between'}}>
                <Pressable
                  onPress={() => {
                   
                    navigation.navigate('Blog',{id:blog.id,encabezado:blog.titulo,cuerpo:blog.descripcion})
                   }}
                >
                  <FontAwesome5 name="external-link-alt" size={15} color="#000" />
                  
                </Pressable>
                <Pressable onPress={()=>{
                  Alert.alert('Advertencia','¿Esta seguro de eliminar este blog?',[{
                    text:'Si',
                    onPress:()=>{
                      EliminarBlob(blog.id)
                      getBlogByUser(Sesion.id)
                     
                    }
                  },{
                    text:'No',
                    style:'cancel'
                  }])
                }}>
                <FontAwesome5 name="trash-alt" size={15} color="red" />
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