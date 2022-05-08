import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ButtonContact from './ButtonContact';
import LottieView from 'lottie-react-native';


const Feedback = () => {

    const [loading, setLoading] = useState(false)
  
let customerList=['']

    return (
        <View style={styles.feedback}>
            <View style={styles.containerTitle}>
                <View style={styles.containerCommentTitle}>
                    <Icon name="shield-crown-outline" size={30} color="#ff762d" />
                    <Text style={styles.title}>Esto es lo que opinan mis clientes</Text>
                    <Icon name="shield-crown-outline" size={30} color="#ff762d" />
                </View>
            </View>
            <View style={styles.comments}>
                {
                    loading ? 
                    <ScrollView>
                        {
                          //  customerList.map((item, index) => (
                                // <Comments
                                //     key={index}
                                //     name={item.name}
                                //     comment={item.comment}
                                //     photo={item.photo}
                                //     idEmploye={item.idEmploye}
                                // />
                            //))

                        }
                    </ScrollView>
                    :
                    <View style={styles.containerProgress}>
                        {/* <ActivityIndicator size="large" color="#ff762d" />
                        <Text style={styles.textProgress}>Cargando...</Text> */}
                        {/* <Image source={{ uri: 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340'}} style={styles.image} />
                         */}
                        <LottieView 
                            source={require('../../animated/waiting-pigeon.json')}
                            autoPlay
                            loop
                        />
                    </View>
                }
            </View>
            <ButtonContact
                //navigation={navigation}
            />
        </View>
    )
}

export default Feedback

const styles = StyleSheet.create({
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
        height: '60%',
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