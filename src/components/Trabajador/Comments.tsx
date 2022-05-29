import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useWorkers from '../../hooks/useWorkers';




const Comments = ({name, comment, photo,idEmploye, tokenFCM}:any) => {
    const {alertChat}=useWorkers()
   
    return (
        <View style={styles.containerUserComment}>
            <View style={styles.userData}>
                {
                    photo ?
                    <Image
                        source={{ uri: photo }}
                        style={styles.userImage}
                    />:
                    <Image
                        source={require('../../img/jar-loading.gif')}
                        style={styles.userImage}
                    />

                }
                <Text numberOfLines={1} style={styles.textName}>{name}</Text>
            </View>
            <View style={styles.userComment}>
                <Text style={styles.textComment} numberOfLines={4}>
                    {comment}
                </Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#000'}}>Contactar</Text>
                <Pressable onPress={()=>{
                    //console.log(idEmploye)
                    //.log(tokenFCM)
                   alertChat(idEmploye, tokenFCM)
                }}>
                <FontAwesome5 name="sign-language" size={30} color="#ff762d" />
                </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Comments

const styles = StyleSheet.create({
    containerUserComment: {
        // backgroundColor: '#c7f1f3',
        backgroundColor: '#f0cfb0',
        height: 150,
        marginHorizontal: 10,
        marginVertical: 10,
        marginTop: 10,
        borderRadius: 10,

        
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 10,
        borderWidth: 1,
    },
    userData: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        // borderWidth: 1,
        width: 200,
        height: 35,
        marginTop: 4,
    },
    containerUser: {
        flexDirection: 'row',
    },
    userComment: {
        // borderWidth: 1,
        marginHorizontal: 10,
        height: 93,
        marginVertical: 5,
    },
    userImage: {
        width: 35,
        height: 35,
        borderRadius: 35,
        marginRight: 10,
    },
    textName: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
    },
    textComment: {
        fontSize: 15,
        color: '#000',
        marginLeft: 10,
        marginTop: 5,
    }
})