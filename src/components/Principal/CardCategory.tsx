import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
    name: string;
    icon: string;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setTrade: Dispatch<SetStateAction<string>>;
    trade: string;
}

const CardCategories = ({ name, icon, setLoading, setTrade, trade }: Props) => {

  


    return (
        <TouchableOpacity
            style={
                trade.toLocaleLowerCase() === name ? 
                    ( styles.containerCardActive ) : ( styles.containerCategory ) 
            }
            //onPress={ () => }
            activeOpacity={0.5}
        >
            <Icon 
                name={icon} 
                size={30} 
                color="#fff" 
            />
            <Text 
                style={styles.textCategory} 
                numberOfLines={1}>
                    {
                        name.substring(0,1).toUpperCase() + name.substring(1)
                    }
            </Text>
        </TouchableOpacity>
    )
}

export default CardCategories

const styles = StyleSheet.create({
    containerCategories: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 500,
        height: 100,
    },
    containerCategory: {
        marginRight: 10,
        width: 100,
        height: '100%',
        backgroundColor: '#000',
        // backgroundColor: '#68cf45',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        borderRadius: 10,
    },
    containerCardActive:{
        marginRight: 10,
        width: 100,
        height: '110%',
        // backgroundColor: '#46D0D9',
        backgroundColor: '#68cf45',
        alignItems: 'center',
        justifyContent: 'center',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        borderRadius: 10,
    },
    textCategory: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
})