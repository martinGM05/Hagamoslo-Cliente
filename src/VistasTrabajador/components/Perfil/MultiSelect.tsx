import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import Icon1 from 'react-native-vector-icons/MaterialIcons'

const MultiSelect = () => {
    const ref = useRef<SectionedMultiSelect<any>>()
    const [selectedItems, setSelectedItems] = useState<number[]>([])
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

  return (
    <View>
       <SectionedMultiSelect
       items={items}
       IconRenderer={Icon1}
       uniqueKey="id"
       displayKey='title'
   
       
       onSelectedItemsChange={e=>{
           setSelectedItems(e)
           console.log(e)
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
              const select=items.find(i=>i.id===e)
              console.log('s '+select)
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
                  {select?.title}
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