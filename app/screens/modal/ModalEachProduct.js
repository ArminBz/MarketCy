import { Text, View, SafeAreaView, Pressable, Dimensions, Image } from "react-native";
import * as React from "react";
import { observer } from "mobx-react";
import { TextInput } from 'react-native-paper';
import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
import subheading from "react-native-paper/src/components/Typography/Subheading";
import NavigationService from "../../router/NavigationService";
const {
  height, width,
} = Dimensions.get('window',)


const ModalEachProduct=(props) =>{
  const {

    authStore,
  } = useStores()
  // console.log('props',props.route.params.name)
  // console.log('slaam',authStore.products.map((product)=>product.description))
  let name = props?.route?.params?.name || null
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{flex:0.4,height:200,borderWidth: 0.8,borderColor:'#C6C6C6',width:200,marginBottom:30}}
             source={{
               uri: authStore.selectedProducts.image,
             }}
             resizeMode="cover"
      />

      <Text style={{flex:0.06,fontSize: 17,fontWeight: 'bold',}}>{authStore.selectedProducts.name}</Text>
      <Text style={{flex:0.06,fontSize: 16}}>{authStore.selectedProducts.description}</Text>
      <Text style={{flex:0.06,fontSize: 17,}}>{authStore.selectedProducts.amount}</Text>
      <View style={{flex:0.07,height:60,width:40,justifyContent:'center',alignItems:'center',marginBottom:10}}>
      <Text style={{fontSize: 17,fontWeight: 'bold',color:'#6200EE'}}>{authStore.selectedProducts.price}</Text>
      </View>
      <NumericInput
        value={authStore.quantityOfProduct}
        onChange={authStore.setQuantityOfProduct}
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
                   authStore.setAddProducts({...authStore.selectedProducts,quantityOfProduct:authStore.quantityOfProduct})

                   NavigationService.goBack()
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
  )
}
export default observer(ModalEachProduct)
