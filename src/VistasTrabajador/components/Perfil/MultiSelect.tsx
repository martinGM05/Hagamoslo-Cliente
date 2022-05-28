import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import useTags from '../../../hooks/useTags'
import ActualizarPerfilTrabajador from '../../../hooks/ActualizarPerfilTrabajador'
import { SesionContext } from '../../../context/Sesion/SesionContext'

const MultiSelect = () => {
    const ref = useRef<SectionedMultiSelect<any>>()
    //const {selectedItems,setSelectedItems, }=ActualizarPerfilTrabajador()
    const {tags, getTags}=useTags();
    const{selectedItems,setSelectedItems}=useContext(SesionContext)
    const items = [
        {
          id: 1,
          title: 'Carpintero'
        },
        {
          id: 2,
          title: 'Programador'
        },
        {
          id: 3,
          title: 'Contratista'
        },
        {
          id: 4,
          title: 'Chef'
        }
      ]
 
      useEffect(()=>{
        getTags()
      },[])
      
  return (
    <View>
       <SectionedMultiSelect
       items={tags}
       IconRenderer={Icon1}
       uniqueKey="id"
       displayKey='nombre'
      
       
       onSelectedItemsChange={e=>{
           setSelectedItems(e)
           
       }}
       selectedItems={selectedItems}
       customChipsRenderer={(props)=>(
           <ScrollView
           horizontal
           style={{
             height: 58,
             width: '100%'
           }}
           contentContainerStyle={{
             alignItems: 'center',
             flexDirection: 'row',
             flexWrap: 'wrap',
             padding: 8
           }}
           >
               
               {selectedItems.map((e)=>{
              const select=tags.find(i=>i.id===e)
             
              return(
                <View
                style={{
                  marginRight: 10,
                  alignItems: 'center',
                  marginBottom: 6,
                  paddingVertical: 4,
                  backgroundColor: 'white',
                  borderRadius: 24,
                  flexDirection: 'row',
                  borderColor:'#000',
                  borderWidth: 1,
                  padding:15
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

const styles = StyleSheet.create({})