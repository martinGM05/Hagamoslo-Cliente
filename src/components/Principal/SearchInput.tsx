import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';



interface Props {
    setTrade: Dispatch<SetStateAction<string>>;
    trade: string;
}

const SearchInput = ({ setTrade, trade }: Props) => {
    
    const [input, setInput] = useState('')


    return (
        <View style={styles.containerSearch}>
            <Icon name="search" size={23} color="#000" />
            <TextInput
                style={styles.inputSearch}
                placeholder="Buscar"
                placeholderTextColor="#000"
                onChangeText={(text) => setInput(text)}
                value={input}
            />
            {
                input != '' &&
                <Icon
                    style={styles.iconClose}
                    name="times"
                    size={23}
                    color="#000"
                    onPress={() => setInput('')}
                />
            }
            {/* <Icon name="close" size={23} color="#000" /> */}
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
        // width: '100%',
    },
    inputSearch: {
        width: '100%',
        padding: 5,
        fontSize: 20,
        marginLeft: 10,
        color: '#000'
    },
    iconClose: {
        position: 'absolute',
        right: 10,
        top: 10,
    }
})