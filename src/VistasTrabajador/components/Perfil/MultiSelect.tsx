import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import useTags from '../../../hooks/useTags'
import ActualizarPerfilTrabajador from '../../../hooks/ActualizarPerfilTrabajador'
import { SesionContext } from '../../../context/Sesion/SesionContext'
import { _primaryColor, _secondaryColor } from '../../../global/Variables';

const MultiSelect = () => {

  const ref = useRef<SectionedMultiSelect<any>>()
  const { tags, getTags } = useTags();
  const { selectedItems, setSelectedItems } = useContext(SesionContext)

  useEffect(() => {
    getTags()
  }, [])

  return (
    <View>
      <SectionedMultiSelect
        items={tags}
        IconRenderer={Icon1}
        uniqueKey="id"
        displayKey='nombre'
        onSelectedItemsChange={e => setSelectedItems(e)}
        colors={{ primary: _primaryColor }}
        selectText='Seleccione un servicio'
        animateDropDowns={true}
        showCancelButton={true}
        selectedIconOnLeft={true}
        styles={{
          button: {
            backgroundColor: _primaryColor,
          },
          cancelButton: {
            backgroundColor: _secondaryColor,
          },
          chipText: {
            color: 'red',
          },
          selectToggle: {
            // backgroundColor: _secondaryColor,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          },
          selectToggleText: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
          },
          searchBar: {
            backgroundColor: _secondaryColor,
          },
          searchTextInput: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
          },
          subSeparator: {
            backgroundColor: '#000',
          }
        }}
        selectedItems={selectedItems}
        customChipsRenderer={(props) => (
          <ScrollView
            horizontal
            style={{
              height: 58,
              width: '100%',
              borderWidth: 2
            }}
            contentContainerStyle={{
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 8
            }}
          >
            {
              selectedItems.map((e) => {
                const select = tags.find(i => i.id === e)
                return (
                  <View
                    style={{
                      marginRight: 10,
                      alignItems: 'center',
                      marginBottom: 6,
                      paddingVertical: 4,
                      backgroundColor: 'white',
                      borderRadius: 24,
                      flexDirection: 'row',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 15
                    }}
                    key={select?.id}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',

                      }}
                    >
                      {select?.nombre}
                    </Text>
                  </View>
                )


              })}
          </ScrollView>
        )}
      >
      </SectionedMultiSelect>
    </View>
  )
}

export default MultiSelect

const styles = StyleSheet.create({
  multiselect: {
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 48,
  }
})