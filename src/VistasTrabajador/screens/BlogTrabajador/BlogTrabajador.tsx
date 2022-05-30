import { Dimensions,Image,Pressable,ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RootStackParams } from '../../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import Comments from '../../../components/Trabajador/Comments';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UseBlogTrabajador from '../../../hooks/UseBlogTrabajador';
import { Actions, Composer, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import { _url } from '../../../global/Variables';
import { TextInput } from 'react-native-gesture-handler';
type Props = StackScreenProps<RootStackParams, 'BlogTrabajador'>;
const BlogTrabajador = ({ navigation, route }: Props) => {

    const {getComentariosTrabajador, comentariosTrabajador,CrearComentario} = UseBlogTrabajador()
    const [messages, setMessages] = useState<any>([]);
    const [textComentario, setTextComentario]=useState('')
    const { Sesion } = useContext(SesionContext);

    useEffect(()=>{
        getComentariosTrabajador(route.params?.id)
    },[])

  return (
   <View>
            <View style={styles.container}>
                <View key={route.params?.id} style={styles.containerBlog}>
                    <View style={styles.containerInfo}>
                        <Text style={styles.textTitle}>{route.params?.encabezado}</Text>
                        <Text style={styles.textDescription}>{route.params?.cuerpo}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.feedback}>
                <View style={styles.containerTitle}>
                    <View style={styles.containerCommentTitle}>
                        <FontAwesome5 name="eye" size={30} color="#ff762d" />
                        <Text style={styles.title}>Comentarios</Text>
                        <FontAwesome5 name="eye" size={30} color="#ff762d" />
                    </View>
                </View>

                <View style={styles.comments}>
                    <ScrollView>
                        {
                            comentariosTrabajador.map((c,index)=>(
                                <Comments
                                key={index}

                                    name={c.user.nombre}
                                    comment={c.comentario}
                                    photo={'https://hagamoslo.azurewebsites.net/api/upload/Users/'+c.idTrabajador}
                                    idEmploye={c.idTrabajador}
                                    tokenFCM={c.user.tokenFCM}
                                    
                                
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>

            <View style={styles.contenedorInput}>
                <TextInput style={{ borderColor:'#000', borderWidth:2, height:'50%', width:'100%'}} multiline={true} onChangeText={e=>setTextComentario(e)}></TextInput>
                <Pressable style={{ backgroundColor:'red', width:100}} onPress={()=>{
                    CrearComentario(textComentario,route.params?.id)
                }}>
                    <Text>Enviar</Text>
                </Pressable>
            </View>

            
        </View>
  )
}

export default BlogTrabajador

const styles = StyleSheet.create({
    container: {
        //position: 'absolute',
        marginTop: 20,



    },

    containerBlog: {
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
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
        borderWidth: 2,
        borderColor: '#8200D6'
    },
    containerInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    textDescription: {
        fontSize: 18,
        color: '#000',
    },
    containerComentario: {
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
        }
    },
    feedback: {
        marginLeft: 16,
        marginRight: 10,
        width: '90%',
        height: '50%',
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',

    },
    containerCommentTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    comments: {
        // borderWidth: 1,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        width: '100%',
        height: 400,
        // backgroundColor: '#516680',
        marginTop: 10,

    },
    containerProgress: {
        width: '100%',
        height: 160,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#000',
    },
    textProgress: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20,
    },
    image: {
        width: '70%',
        height: '100%',
    },
    contenedorInput:{
        position:'absolute',
        marginTop:630,
        
    }
})