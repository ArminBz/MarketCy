import { Text, View, SafeAreaView, Pressable, Dimensions, Image } from "react-native";
import * as React from "react";
import { observer } from "mobx-react";
import { TextInput } from 'react-native-paper';
import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
// import subheading from "react-native-paper/src/components/Typography/Subheading";
import NavigationService from "../../router/NavigationService";
import { useTranslation } from "react-i18next";
const {
  height, width,
} = Dimensions.get('window',)


const ModalEachProduct=(props) =>{
  const {
    authStore,
    productStore,
    basketStore
  } = useStores()
  const { t, i18n } = useTranslation();

  let name = props?.route?.params?.name || null
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{flex:0.4,height:200,borderWidth: 0.8,borderColor:'#C6C6C6',width:200,marginBottom:30}}
             source={{
               uri: productStore.selectedProducts.product.thumb,
             }}
             resizeMode="cover"
      />

      <Text style={{flex:0.06,fontSize: 17,fontWeight: 'bold',}}>{productStore.selectedProducts.product.name}</Text>
      <Text style={{flex:0.06,fontSize: 16}}>{productStore.selectedProducts.product.description}</Text>
      {/*<Text style={{flex:0.06,fontSize: 17,}}>{productStore.selectedProducts.amount}</Text>*/}
      <View style={{flex:0.07,height:60,justifyContent:'center',alignItems:'center',marginBottom:10}}>

      <Text style={{fontSize: 17,fontWeight: 'bold',color: productStore.selectedProducts.discount_price!==null && productStore.selectedProducts.discount_price!==0  ? 'red' : '#6200EE',
        textDecorationLine: productStore.selectedProducts.discount_price!==null && productStore.selectedProducts.discount_price!==0 ? 'line-through' :'',
        textDecorationStyle: productStore.selectedProducts.discount_price!==null && productStore.selectedProducts.discount_price!==0 ? 'solid':''}}>{productStore.selectedProducts.price} TL</Text>
        { productStore.selectedProducts.discount_price!==null && productStore.selectedProducts.discount_price!==0 ?
        <Text style={{fontSize: 17,fontWeight: 'bold',color:'#6200EE'}}>{productStore.selectedProducts.discount_price} TL</Text>
          : null }
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
                   productStore.setAddProducts({...productStore.selectedProducts,quantityOfProduct:productStore.quantityOfProduct})
                   // console.log('selectedp',productStore.selectedProducts)
                   basketStore.updateBasket(1,productStore.selectedProducts.id,productStore.quantityOfProduct)
                   // console.log('selectedp',productStore.selectedProducts.id,productStore.quantityOfProduct)
                   // basketStore.getBasket()

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
export default observer(ModalEachProduct)
