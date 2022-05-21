import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';

interface Props {
    icon: string
    title: string
    description: string
    navigation: any
    screen: string
}

type NavigationProps = StackScreenProps<RootStackParams, 'PrincipalCliente'>;



const handleGoTo = (screen: any, navigation: any) => {
    navigation.navigate(screen)
}

const ButtonsCards = ({ icon, title, description, navigation, screen }: Props) => {


    return (
        <View style={styles.cardButtonBlog}>
            <View style={styles.cardIconBlog}>
                <Icon name={icon} size={30} color="#000" />
            </View>
            <View style={styles.cardSection}>
                <Text style={styles.titleCard}>{title}</Text>
                <Text style={styles.descriptionCard}>{description}</Text>
            </View>
            <Pressable
                onPress={() => handleGoTo(screen, navigation)}
            >
                <Icon name="ios-arrow-forward" size={30} color="#000" />
            </Pressable>
        </View>
    )
}

export default ButtonsCards

const styles = StyleSheet.create({
    cardButtonBlog: {
        height: 80,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#f7f7f7',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    cardIconBlog: {
        width: 50,
        height: 50,
        borderRadius: 45,
        backgroundColor: '#d562b5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardSection: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        width: 190
    },
    
    titleCard: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Arial',
    },
    descriptionCard: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Arial',
    }
})