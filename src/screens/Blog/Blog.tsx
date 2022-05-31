import { Alert, Dimensions, Pressable, StyleSheet, Text, View, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useBlog from './useBlog';
import FormBlog from '../../components/Helper/FormBlog';
import { SesionContext } from '../../context/Sesion/SesionContext';
import { RootStackParams } from '../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import BackButton from '../../components/Buttons/BackButton';
import { ScrollView } from 'react-native-gesture-handler';
import Comments from '../../components/Trabajador/Comments';
import { _url } from '../../global/Variables';

type Props = StackScreenProps<RootStackParams, 'Blog'>;

const Blog = ({ navigation, route }: Props) => {

    const { getComentarios, comentarios } = useBlog();
    const { Sesion } = useContext(SesionContext);

    useEffect(() => {
        getComentarios(route.params?.id)
        // console.log(comentarios)
    }, [])

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
                            comentarios.map((c,index)=>(
                                <Comments
                                key={index}
                                    name={c.user.nombre}
                                    comment={c.comentario}
                                    photo={`${_url}/upload/Users/${c.idTrabajador}`}
                                    idEmploye={c.idTrabajador}
                                    tokenFCM={c.user.tokenFCM}
                                    navigation={navigation}/>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default Blog

const styles = StyleSheet.create({
    container: {
        //position: 'absolute',
        marginTop: 20,
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
        marginTop: 20,
        marginLeft: 16,
        marginRight: 10,
        marginBottom: 20,
        // borderWidth: 1,
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
        height: 550,
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
    }
})