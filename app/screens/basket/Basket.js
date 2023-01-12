import React, {useRef, useEffect,useState} from 'react';
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text, TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react";
import { useStores } from "../../store";
import NavigationService from "../../router/NavigationService";
import { Colors, IconButton } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import { greenButton, purpleButton } from "../../style";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from "react-i18next";


const {
  height, width,
} = Dimensions.get('window',)


const Basket: () => Node = () =>{
  const { t, i18n } = useTranslation();

  const {
    authStore,
    productStore,
    basketStore,
  } = useStores()


  useEffect(()=>{
    basketStore.getBasket()
  }, [],)


 const deleteItemById = (id) => {

   // console.log('id=>',id)
   let index = productStore.addProducts.findIndex((product)=>product.id == id)
   // console.log('index=>',index)

   productStore.addProducts.splice(index, 1)
  }

  const renderItem = ({item}) =>{
    let name = item?.store_product.product?.name || null
    let price = item?.store_product?.price || null
    let thumb = item?.store_product.product?.thumb || null
    let quantity = item.quantity || null
    let id = item?.store_product?.id || null
    return (
    <ScrollView>

      <TouchableOpacity style={{
        flex: 1,
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        width: width,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E2E2E2'
      }}
                        onPress={() => {
        productStore.setSelectedProducts(item)
        NavigationService.navigate('ModalEachProductsFromBasket')
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
                 uri: thumb,
               }}
               resizeMode="cover"
        />
        <View style={{ flex: 0.6 }}>
          <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold', }}>{name}</Text>

          <Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold', color: '#6200EE' }}>{price}</Text>
          {/*<Text style={{ flex: 0.2, fontSize: 12, }}>{item.amount}</Text>*/}
        </View>
        <View>
          {/*<TextInput*/}

          {/*  keyboardType = 'numeric'*/}
          {/*  onChange={(value:quantity) => quantity=value}*/}
          {/*  value = {quantity}*/}
          {/*/>*/}
          <NumericInput
            value={quantity}
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={70}
            totalHeight={30}
            iconSize={25}
            step={1}
            rounded
            textColor='#6200EE'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#6200EE'
            leftButtonBackgroundColor='#009588' />
          <Button onPress={() => {
            basketStore.deleteBasketItem(1,id)
            basketStore.getBasket()
          }}> <Icon name={'trash'} size={20}/></Button>
        </View>
      </TouchableOpacity>
    </ScrollView>
    )
  };
  return (

<View style={{flex:1}}>
  {basketStore.basketItems.length > 0 ?
    <View style={{flex:1}}>
      <FlatList
      extraData={basketStore.loading}
      data={basketStore.basketItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      >

    </FlatList>
<View style={{justifyContent:'center',alignItems:'center',alignContent:'center',}}>
        <Text style={{marginBottom:2,marginTop:20,fontSize: 17, fontWeight: 'bold', color: '#6200EE'}}>Total: {basketStore.totalPrice} TL</Text>
</View>
    <Pressable style={{ alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 46,
      borderRadius: 85,
      elevation: 3,
      backgroundColor: '#6200EE',

      marginTop:20}} onPress={() => NavigationService.navigate('ModalReceiveOrder')}>
      <Text style={{ fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white', }}>{t('Proceed to CheckOut')}</Text>
    </Pressable>

    </View>
    : <Background>
      <IconButton
        icon="basket"
        iconColor={'#6200EE'}
        size={120}
        onPress={() => NavigationService.navigate('Basket')}
        // animated={true}
        // style={{justifyItems:'center',justifyContent:'center'}}
      />

      <Text style={{fontSize: 14,fontWeight: 'bold',}}>
        {t('Your Basket is Empty!')}
      </Text>
      <Button
        onPress={() => NavigationService.navigate('ListOfProducts')}
        mode="outlined"
      >
        {t('Products')}
      </Button>
    </Background>
  }
  {basketStore.loading ? (
    <View style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
    }} >
      <ActivityIndicator
        size="large"
        color="#6200EE"

      />
    </View> ) :null}
    </View>

  )
}
export default observer(Basket)
