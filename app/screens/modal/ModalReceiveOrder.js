import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, {
  useEffect, useState,useRef,
} from 'react'
import { observer } from "mobx-react";

import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
import subheading from "react-native-paper/src/components/Typography/Subheading";
import NavigationService from "../../router/NavigationService";
import { List } from "react-native-paper";
import qs from 'qs';
import { Linking,Platform  } from "react-native";




export async function sendMessage(to, subject, body, options = {}) {
  const url = (Platform.OS === 'android')
    ? 'sms:919999999999?body=your message'
    : 'sms:919999999999'
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Unsupported url: ' + url)
    } else {
      return Linking.openURL(url)
    }
  }).catch(err => console.error('An error occurred', err))
}


const {
  height, width,
} = Dimensions.get('window',)

// const showAddressList = () => {
//   return (
//
//
//   )
// }

const ModalReceiveOrder=(props) =>{


  const {
    authStore,
    productStore,
    userAddressStore,
  } = useStores()


  const renderItem = ({item}) =>(

                  <View style={{
                    flex: 1,
                    marginBottom: 10,
                    marginTop: 5,
                    padding: 10,
                    width: width,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#E2E2E2',

                  }} >
                    <View style={{ flex: 1 }}>
                      <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold', }}>{item.name}</Text>

                      <Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold', color: '#6200EE' }}>{item.price}</Text>
                      <Text style={{ flex: 0.2, fontSize: 12, }}>{item.amount}</Text>
                    </View>
                    <View style={{ marginTop: 17 }}>
                      <NumericInput
                        value={item.quantityOfProduct}
                        onChange={item.setQuantityOfProduct}
                        // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={70}
                        totalHeight={30}
                        iconSize={25}
                        valueType='real'
                        rounded
                        textColor='#6200EE'
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor='#6200EE'
                        leftButtonBackgroundColor='#009588' />
                    </View>
                  </View>
  );

  const [showAddress, setShowAddress, ] = useState(false)

  let name = props?.route?.params?.name || null
  return (

    <View style={{ flex: 1}}>
      <List.Section>

        <List.Subheader>Your Address</List.Subheader>
        <View style={{flex:0.5,paddingTop:15,paddingBottom:50}}>
          <TextInput
            placeholder="Your Address"
            maxLength={40}
            style={{borderWidth: 1,
              padding: 20,
              borderRadius: 50,
              borderColor: '#888888',
              fontSize: 18
            }}
            value={userAddressStore.userAddress}
            onChangeText={userAddressStore.setUserAddress}
          />

        </View>

      </List.Section>

      <FlatList
        extraData={productStore.addProducts}
        data={productStore.addProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      >

      </FlatList>

      <View style={{position: 'absolute',
        bottom:40,
        left:60,right:60}}>
        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',}}>
          <Text style={{marginBottom:2,marginTop:20,fontSize: 17, fontWeight: 'bold', color: '#6200EE'}}>Total: {productStore.sumOfBasket()}$</Text>
        </View>
        <Pressable style={purpleButton}
                   onPress={() => {
                     // NavigationService.navigate('UserAddress')
                     // setShowAddress(true)
                     sendMessage().then(() => {
                       console.log('Your message was successfully sent!');
                     });
                   }}

        >
          <Text style={{ fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white', }}> Order</Text>
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
export default observer(ModalReceiveOrder)
