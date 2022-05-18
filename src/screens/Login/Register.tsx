import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import FormRegister from '../../components/Login/FormRegister';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../../components/Buttons/BackButton';

type Props = StackScreenProps<RootStackParams, 'Register'>;

const Register = ({ navigation }: Props) => {

    return (
        <LinearGradient
            colors={['#00C9FF', '#fff']}
            start={{ x: 2, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.1, 0.9]}
            style={styles.container}
        >
            <BackButton navigation={navigation} />
            <ScrollView>
                <View style={styles.containerHeader}>
                    <Text style={styles.textRegistro}>Registro</Text>
                </View>
                <View style={styles.containerForm}>
                    <FormRegister navigation={navigation}/>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'purple'
    },
    containerHeader: {
        height: 'auto',
        // backgroundColor: 'red',
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    textRegistro: {
        fontSize: 30,
        color: '#095397',
        fontWeight: 'bold'
    },

    containerForm: {
        marginTop: 20,
        height: 560,
        // backgroundColor: 'red',
        marginLeft: 30,
        marginRight: 30,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
    }
})