import {  Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, {useRef, useEffect,useState} from 'react';
import { observer } from "mobx-react";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import Icon from "react-native-vector-icons/FontAwesome";


const {
  height, width,
} = Dimensions.get('window',)

const optionsPerPage = [2, 3, 4];

const ListOfProducts: () => Node = () =>{

  const {
    authStore,
    productStore,
    categoryStore,
    basketStore,
  } = useStores()


  useEffect(()=>{
    basketStore.getBasket()
  }, [],)


  const renderItemHeader = ({item}) => (
    <TouchableOpacity style={{borderWidth:6,borderColor: '#F2F2F2'}}>
      <View style={{borderWidth:1,borderColor:'#C6C6C6',borderRadius:1,height:40,backgroundColor:'#F2F2F2'}}>
        <Text style={{fontSize: 13, fontWeight: 'bold',color:'#6200EE',borderWidth: 2,borderColor: '#F2F2F2',textAlign: 'center',height: 35,lineHeight: 35, justifyContent: 'center', alignItems: 'center',}} >{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    let name = item?.product?.name || null
    let price = item?.product?.price || null
    let thumb = item?.product?.thumb || null
    return (
    <TouchableOpacity style={{
      flex: 1,
      marginBottom: 15,
      marginTop: 1,
      padding: 10,
      width: width,
      borderWidth: 0.8,
      borderColor: '#C6C6C6',
      backgroundColor: 'white'
    }} onPress={() => {
      productStore.setSelectedProducts(item)
      NavigationService.navigate('ModalEachProduct')
    }}>
      <Image
        style={{ height: 150, width: 150, marginBottom: 7, marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}
        source={{
          uri: thumb,
        }}
        resizeMode="cover"
      />

      <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>{name}</Text>
      <Text style={{
        flex: 0.2,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color: item.discount_price!==null ? 'red' : '#6200EE',
        textDecorationLine: item.discount_price!==null ? 'line-through' :'',
        textDecorationStyle: item.discount_price!==null ? 'solid':''
      }}>{price} TL</Text>
      { item.discount_price!==null ?
        <Text style={{
          flex: 0.2,
          fontSize: 15,
          fontWeight: 'bold',
          color: '#6200EE',
          marginBottom: 5
        }}>{item.discount_price} TL</Text>
        : null
      }

      {/*<Text style={{flex:0.2,fontSize: 12}}>{item.amount}</Text>*/}

      <View style={{
        borderRadius: 10,
        width: 30,
        height: 30,
        marginLeft: 'auto',
        marginRight: 0,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        <Icon style={{ textAlign: 'center' }} name='plus' size={15} color={'white'} />
      </View>

    </TouchableOpacity>
    )
  };
  // const renderHeader = (item) => (
  //   <View
  //     style={{flex:1,flexDirection:'row',marginBottom: 10,marginTop: 10,padding: 10,backgroundColor: '#6200EE'}}
  //
  //   >
  //     <Text style={{flex:0.2,color:'white'}}>Dessert</Text>
  //     <Text style={{flex:0.2,color:'white'}}>quantity</Text>
  //     <Text style={{flex:0.2,color:'white'}}>Image</Text>
  //
  //   </View>
  // );

  return (
    <View style={{flex:1}}>
<View style={{paddingBottom:1}}>
      <FlatList
        data={categoryStore.categories}
        renderItem={renderItemHeader}
        horizontal={true}
      />
</View>
      <FlatList
        data={productStore.product}
        renderItem={renderItem}
        horizontal={false}
        numColumns={2}

      />

    </View>

  );
}

export default observer(ListOfProducts)
