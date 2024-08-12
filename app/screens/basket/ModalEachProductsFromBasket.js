import { Text, View, SafeAreaView, Pressable, Dimensions, Image } from "react-native";
import * as React from "react";
import { observer } from "mobx-react";
import { TextInput } from 'react-native-paper';
import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
import NavigationService from "../../router/NavigationService";
import { useTranslation } from "react-i18next";

const {
  height, width,
} = Dimensions.get('window',)


const ModalEachProductsFromBasket=(props) =>{
  const {
    authStore,
    productStore,
    basketStore
  } = useStores()
  const { t, i18n } = useTranslation();


  let name = productStore.selectedProducts?.store_product.product?.name || null
  let price = productStore.selectedProducts?.store_product?.price || null
  let thumb = productStore.selectedProducts?.store_product.product?.thumb || null
  let description = productStore.selectedProducts?.store_product.product?.description || null
  let id = productStore.selectedProducts?.store_product?.id || null
  console.log('manam',id)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{flex:0.4,height:200,borderWidth: 0.8,borderColor:'#C6C6C6',width:200,marginBottom:30}}
             source={{
               uri: thumb,
             }}
             resizeMode="cover"
      />

      <Text style={{flex:0.06,fontSize: 17,fontWeight: 'bold',}}>{name}</Text>
      <Text style={{flex:0.06,fontSize: 16}}>{description}</Text>
      {/*<Text style={{flex:0.06,fontSize: 17,}}>{productStore.selectedProducts.amount}</Text>*/}
      <View style={{flex:0.07,height:60,justifyContent:'center',alignItems:'center',marginBottom:10}}>
        <Text style={{fontSize: 17,fontWeight: 'bold',color:'#6200EE'}}>{price} TL</Text>
      </View>
      <NumericInput
        value={productStore.quantityOfProduct}
        onChange={productStore.setQuantityOfProduct}
        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
        totalWidth={240}
        totalHeight={50}
        iconSize={25}
        valueType='real'
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#6200EE'
        leftButtonBackgroundColor='#009588'/>
      {/*<Button  onPress={() => navigation.goBack()} title="Add" />*/}
      {/*<Button  onPress={() => navigation.goBack()} title="Close" />*/}
      <Pressable style={purpleButton}
                 onPress={() => {
                   basketStore.updateBasket(1,id,productStore.quantityOfProduct)
                   console.log('selectedp',productStore.selectedProducts.id,productStore.quantityOfProduct)
                   basketStore.getBasket()

                   NavigationService.goBack()
                 }}

      >
        <Text style={{ fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white', }}> {t('Add')}</Text>
      </Pressable>
      <Pressable style={greenButton} onPress={() => NavigationService.goBack()}>
        <Text style={{ fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white', }}>{t('Close')}</Text>
      </Pressable>
    </View>
  )
}
export default observer(ModalEachProductsFromBasket)
