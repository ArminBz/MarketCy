import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity, ScrollView,
} from "react-native";
import React, {
  useEffect, useState,useRef,
} from 'react'
import { observer } from "mobx-react";

import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
import Icon from 'react-native-vector-icons/FontAwesome'
// import subheading from "react-native-paper/src/components/Typography/Subheading";
import NavigationService from "../../router/NavigationService";
import { List } from "react-native-paper";
import qs from 'qs';
import { Linking,Platform,StyleSheet  } from "react-native";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import { useTranslation } from "react-i18next";
import workerStore from "./workerStore";
import { Button } from 'react-native-paper';

const _iconStyle = (borderColor: string) => ({
  height: 50,
  width: 50,
  borderRadius: 25,
  borderColor: borderColor,
});

const styles = {
  container: { marginTop: 24 },
  verticalStyle: { marginTop: 16 },
  textStyle: { textDecorationLine: "none" },
  iconImageStyle: { height: 20, width: 20 },
};

const {
  height, width,
} = Dimensions.get('window',)

const ModalOrderProducts=(props) =>{
  const { t, i18n } = useTranslation();

  const {
    authStore,
    productStore,
    userAddressStore,
   workerStore
  } = useStores()

  useEffect(()=>{
    authStore.getUser()
  }, [],)


  let items = workerStore.selectedOrderProducts?.items || null

  // console.log('aa',workerStore.selectedOrderProducts.id)
  // let name = props?.route?.params?.name || null
  return (
<View style={{ flex: 1,}}>
    <ScrollView >
      {/*<List.Subheader>Your Address</List.Subheader>*/}
      {items.map((item,index) => {
        // console.log('item',item.quantity)
        return (

          <TouchableOpacity key={index}  style={{

            marginBottom: 10,
            marginTop: 5,
            padding: 10,
            width: width,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#E2E2E2',

          }}
          >
            <Image style={{
              flex: 0.4,
              height: 100,
              borderWidth: 0.8,
              borderColor: '#C6C6C6',
              width: 60,
              padding: 6,
              marginRight: 10
            }}
                   source={{
                     uri: item.product.product.thumb,
                   }}
                   resizeMode="cover"
            />
            <View style={{ flex: 0.6 }}>
              <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold', }}>{item.product.product.name}</Text>

              <Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold',}}>{item.product.product.price} TL</Text>
              {item.product.product.discount_price !== null && item.product.product.discount_price!==0 ?
                <Text style={{
                  flex: 0.2,
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#6200EE',
                  marginBottom: 5
                }}>{item.product.product.discount_price} TL</Text>
                : null
              }
            </View>
            <View>
              <TextInput
                style={{
                  margin: 12,
                  borderColor:'#E9E9E9',
                  borderWidth: 2,
                  padding: 10,
                  color:'#4700AE',
                  fontSize:15,
                  height:35,width:55,textAlign:'center'}}
                keyboardType = 'numeric'
                placeholder={item.quantity.toString()}
                placeholderTextColor="#6200EE"
                editable={false}
                selectTextOnFocus={false}
                value = {item.quantity}
              />
            </View>
          </TouchableOpacity>

        );
      })
      }
    </ScrollView>
  <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',marginBottom:20}}>
    <Text style={{marginBottom:2,marginTop:20,fontSize: 17, fontWeight: 'bold', color: '#6200EE'}}>Total: {workerStore.selectedOrderProducts.total} TL</Text>
  </View>
  <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',height:80}}>
  <Button onPress={() => {
    workerStore.adminUpdateOrderStatus(workerStore.selectedOrderProducts.id,'accepted')
    // NavigationService.navigate('ModalOrderProducts')
  }} style={{position:'absolute',left:20,top:-10,backgroundColor:'green'}} icon="check" mode="contained" >
    Accept
  </Button>
  <Button style={{position:'absolute',left:155,top:-10,backgroundColor:'red'}} icon="circle" mode="contained" onPress={() => console.log('Pressed')}>
    Reject
  </Button>
  <Button style={{position:'absolute',left:290,top:-10}} icon="truck-delivery" mode="contained" onPress={() => console.log('Pressed')}>
    Deliver
  </Button>
  </View>
</View>
  );
}
export default observer(ModalOrderProducts)
