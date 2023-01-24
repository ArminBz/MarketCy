import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, {useRef, useEffect,useState} from 'react';
import { observer } from "mobx-react";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from "react-native-paper";
import Button from "../../components/Button";
import Background from "../../components/Background";
import { useTranslation } from "react-i18next";


const {
  height, width,
} = Dimensions.get('window',)

const optionsPerPage = [2, 3, 4];

const ListOfProducts: () => Node = () =>{
  const { t, i18n } = useTranslation();

  const {
    authStore,
    productStore,
    categoryStore,
    basketStore,
  } = useStores()


  useEffect(()=>{
    basketStore.getBasket()
    productStore.setProduct([])
    productStore.setPage(1)
    productStore.getProducts(1)
  }, [],)


  const renderItemHeader = ({item}) => (
    <TouchableOpacity style={{borderWidth:6,borderColor: '#F2F2F2'}} onPress={async () => {
      // console.log('productStore.product',productStore.product[0]?.product[0]?.category?.id)

      // productStore.setSelectedProductByCat([])
      //
      // productStore.setSelectedCategories(item)
      // console.log('item',item)
      // console.log('productStore.product',productStore.product)
      productStore.setPage(1)
      productStore.setProduct([])
     await productStore.getProducts(1,item.id)

      // console.log('dasdas',productStore.selectedProducts)
      // if(productStore.product) {
      //   // let products = productStore.product.filter(p => (p.product.category.id.toString() === item.id.toString()))
      //
      //   // console.log('ee', products)
      //   // productStore.setSelectedProductByCat(products)
      // }

      // return productStore.product.filter(item => {
      //    category.some(category => {
      // let arr
      // for (const c of category) {
      //   if (c.id === productStore.selectedCategories.id) {
      //     console.log('ab', c.id === productStore.selectedCategories.id)
      //     arr=(productStore.product.filter(item => (item.product.category.id) === productStore.selectedCategories.id))
      //     arr.push(c.id)
      //
      //   }
      // }
      // if (arr)
      // productStore.setProduct(arr)
      // productStore.setProduct([{}])
      // console.log('qerr', arr)
    }
    }

        // });
      // })
    >
      <View style={{borderWidth:1,borderColor:'#C6C6C6',borderRadius:1,height:40,backgroundColor:'#F2F2F2'}}>
        <Text style={{fontSize: 13, fontWeight: 'bold',color:'#6200EE',borderWidth: 2,borderColor: '#F2F2F2',textAlign: 'center',height: 35,lineHeight: 35, justifyContent: 'center', alignItems: 'center',}} >{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    let name = item?.product?.name || null
    let price = item?.product?.price || null
    let thumb = item?.product?.thumb || null
    // console.log('sss',item)
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
        color: item.discount_price!==null && item.discount_price!==0 ? 'red' : '#6200EE',
        textDecorationLine: item.discount_price!==null && item.discount_price!==0 ? 'line-through' :'',
        textDecorationStyle: item.discount_price!==null && item.discount_price!==0 ? 'solid':''
      }}>{item.price} TL</Text>
      { item.discount_price!==null && item.discount_price!==0 ?
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
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          // console.log('mainStore.flatListOnReachEnd', woshHistoryStore.flatListOnReachEnd,)
          if (categoryStore.flatListOnReachEnd) {
            console.log('onEndReached',)
            categoryStore.setOnEndReachedLoading(true)
            categoryStore.setPage(categoryStore.page + 1,)
            categoryStore.getCategory()
          }
        }
        }
        ListFooterComponent={() => {
          if (categoryStore.onEndReachedLoading) {
            return (<View style={{
              flex: 1, justifyContent: 'center', alignItems: 'center',
            }}>
              <ActivityIndicator  color={'red'}/>
            </View>)
          } else {
            return (<View/>)
          }
        }}
        showsVerticalScrollIndicator={false}
      />
</View>
      {productStore.product.length!==0 ?

      <FlatList
        data={productStore.product.slice()}
        renderItem={renderItem}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
        onEndReachedThreshold={0.1}
        onEndReached={async () => {
          // console.log('mainStore.flatListOnReachEnd', woshHistoryStore.flatListOnReachEnd,)
          if (productStore.flatListOnReachEnd) {
            console.log('onEndReached',)
            productStore.onEndReachedLoading = true
            productStore.setPage(productStore.page + 1,)
          }
        }
        }
        ListFooterComponent={() => {
          if (productStore.onEndReachedLoading) {
            return (<View style={{
              flex: 1, justifyContent: 'center', alignItems: 'center',
            }}>
              <ActivityIndicator  color={'red'}/>
            </View>)
          } else {
            return (<View/>)
          }
        }}
        showsVerticalScrollIndicator={false}
      /> : <Background>
          <IconButton
            icon="database-lock"
            iconColor={'#6200EE'}
            size={120}
            onPress={() => NavigationService.navigate('Basket')}
            // animated={true}
            // style={{justifyItems:'center',justifyContent:'center'}}
          />

          <Text style={{fontSize: 14,fontWeight: 'bold',}}>
            {t('There is no product in this category!')}
          </Text>
          <Button
            onPress={() => NavigationService.navigate('ListOfProducts')}
            mode="outlined"
          >
            {t('Products')}
          </Button>
        </Background>
      }
      {productStore.loading ? (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
        }} >
          <ActivityIndicator
            size="large"
            color="#6200EE"

          />
        </View> ) :null}
    </View>

  );
}

export default observer(ListOfProducts)
