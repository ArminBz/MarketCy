import { Text, View, SafeAreaView, Pressable, Dimensions, Image, TextInput, FlatList } from "react-native";
import React, {
   useEffect, useState,useRef,
} from 'react'
import { observer } from "mobx-react";

import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
// import subheading from "react-native-paper/src/components/Typography/Subheading";
import NavigationService from "../../router/NavigationService";
import { List } from "react-native-paper";
const {
  height, width,
} = Dimensions.get('window',)

// const showAddressList = () => {
//   return (
//
//
//   )
// }

const ModalUserAddress=(props) =>{
  const {
    userAddressStore,
  } = useStores()

  const [showAddress, setShowAddress, ] = useState(false)

  const renderItem = ({item}) =>(

    <View>

    </View>
  );


  let name = props?.route?.params?.name || null
  return (

    <View style={{ flex: 1}}>
      <List.Section>

        <List.Subheader>Add Address</List.Subheader>
<View style={{paddingTop:15}}>
      <TextInput
        placeholder="Add Address"
        maxLength={40}
        style={{borderWidth: 1,
        padding: 20,
        borderRadius: 50,
        borderColor: '#888888',
        fontSize: 18,

        }}
        value={userAddressStore.userAddress}
        onChangeText={userAddressStore.setUserAddress}
      />
</View>
      </List.Section>
      <View>
        <FlatList

          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        >
        </FlatList>
      </View>
<View style={{position: 'absolute',
  bottom:40,
  left:60,right:60}}>
      <Pressable style={purpleButton}
                 onPress={() => {
                   alert('you have Entered successfully')
                   NavigationService.goBack()
                   setShowAddress(true)
                 }}

      >
        <Text style={{ fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white', }}> Add</Text>
      </Pressable>
      <Pressable style={greenButton} onPress={() => NavigationService.goBack()}>
        <Text style={{ fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white', }}>Close</Text>
      </Pressable>
</View>
    </View>

  )
}
export default observer(ModalUserAddress)
