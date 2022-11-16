import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { Dimensions, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { observer } from "mobx-react";
import { useStores } from "../../store";
import NavigationService from "../../router/NavigationService";
import { Colors, IconButton } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import { greenButton, purpleButton } from "../../style";
import Icon from 'react-native-vector-icons/FontAwesome'
// import Swipeable from 'react-native-gesture-handler/Swipeable';

const {
  height, width,
} = Dimensions.get('window',)


const Basket: () => Node = () =>{

  const {
    authStore,
  } = useStores()





 const deleteItemById = (id) => {

   // console.log('id=>',id)
   let index = authStore.addProducts.findIndex((product)=>product.id == id)
   // console.log('index=>',index)

   authStore.addProducts.splice(index, 1)
  }

  const renderItem = ({item}) =>(
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
      }} onPress={() => {
        authStore.setSelectedProducts(item)
        NavigationService.navigate('ModalEachProduct')
      }}>

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
                 uri: item.image,
               }}
               resizeMode="cover"
        />
        <View style={{ flex: 0.6 }}>
          <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold', }}>{item.name}</Text>

          <Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold', color: '#6200EE' }}>{item.price}</Text>
          <Text style={{ flex: 0.2, fontSize: 12, }}>{item.amount}</Text>
        </View>
        <View style={{  }}>
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
          <Button onPress={() => {deleteItemById(item.id)}}> <Icon name={'trash'} size={20}/></Button>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  // console.log('authStore.addProducts',authStore.addProducts)
  // let quantity
  // let sum=0
  // for (const value of authStore.addProducts)
  // {
  //    quantity=value.quantityOfProduct
  //   sum += value.price*quantity;
  //
  // }
  // console.log('ann',quantity)
  // let sum = authStore.addProducts.price.reduce((partialSum, a) => partialSum + a, 0);
  // console.log('salam',sum)

  return (

<View style={{flex:1}}>
  {authStore.addProducts.length > 0 ?
    <View style={{flex:1}}>
      <FlatList
      extraData={authStore.addProducts}
      data={authStore.addProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      >

    </FlatList>
<View style={{justifyContent:'center',alignItems:'center',alignContent:'center',}}>
        <Text style={{marginBottom:2,marginTop:20,fontSize: 17, fontWeight: 'bold', color: '#6200EE'}}>Total: {authStore.sumOfBasket()}$</Text>
</View>
    <Pressable style={purpleButton} onPress={() => NavigationService.navigate('ReceiveOrder')}>
      <Text style={{ fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white', }}>Proceed to CheckOut</Text>
    </Pressable>

    </View>
    : <Background>
      <IconButton
        icon="basket"
        color={'#6200EE'}
        size={120}
        onPress={() => NavigationService.navigate('Basket')}
        // animated={true}
        // style={{justifyItems:'center',justifyContent:'center'}}
      />

      <Text style={{fontSize: 14,fontWeight: 'bold',}}>
        Your Basket is Empty!
      </Text>
      <Button
        onPress={() => NavigationService.navigate('ListOfProducts')}
        mode="outlined"
      >
        Products
      </Button>
    </Background>
  }
    </View>

  )
}
export default observer(Basket)
