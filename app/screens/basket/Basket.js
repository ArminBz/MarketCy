import React, {useRef, useEffect, useState} from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import NavigationService from '../../router/NavigationService';
import {Colors, IconButton} from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import {greenButton, purpleButton} from '../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';

const {height, width} = Dimensions.get('window');

const Basket = () => {
  const {t, i18n} = useTranslation();

  const {authStore, productStore, basketStore} = useStores();

  useEffect(() => {
    basketStore.getBasket();
    // authStore.getUser()
  }, [basketStore]);

  const deleteItemById = id => {
    // console.log('id=>',id)
    let index = productStore.addProducts.findIndex(product => product.id == id);
    // console.log('index=>',index)

    productStore.addProducts.splice(index, 1);
  };

  const renderItem = ({item}) => {
    let name = item?.store_product.product?.name || null;
    let price = item?.store_product?.price || null;
    let thumb = item?.store_product.product?.thumb || null;
    let quantity = item.quantity || null;
    let id = item?.store_product?.id || null;
    return (
      <ScrollView>
        <TouchableOpacity
          style={{
            flex: 1,
            marginBottom: 10,
            marginTop: 5,
            padding: 10,
            width: width,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#E2E2E2',
          }}
          onPress={() => {
            productStore.setSelectedProducts(item);
            NavigationService.navigate('ModalEachProductsFromBasket');
          }}>
          <Image
            style={{
              flex: 0.4,
              height: 130,
              borderWidth: 0.8,
              borderColor: '#C6C6C6',
              width: 60,
              padding: 6,
              marginRight: 10,
            }}
            source={{
              uri: thumb,
            }}
            resizeMode="cover"
          />
          <View style={{flex: 0.6}}>
            <Text style={{flex: 0.2, fontSize: 14, fontWeight: 'bold'}}>
              {name}
            </Text>

            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                color:
                  item.store_product.discount_price !== null &&
                  item.store_product.discount_price !== 0
                    ? 'red'
                    : '#6200EE',
                textDecorationLine:
                  item.store_product.discount_price !== null &&
                  item.store_product.discount_price !== 0
                    ? 'line-through'
                    : '',
                textDecorationStyle:
                  item.store_product.discount_price !== null &&
                  item.store_product.discount_price !== 0
                    ? 'solid'
                    : '',
              }}>
              {price}
            </Text>
            {item.store_product.discount_price !== null &&
            item.store_product.discount_price !== 0 ? (
              <Text
                style={{
                  flex: 0.2,
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#6200EE',
                  marginBottom: 5,
                }}>
                {item.store_product.discount_price} TL
              </Text>
            ) : null}
            {/*<Text style={{ flex: 0.2, fontSize: 12, }}>{item.amount}</Text>*/}
          </View>
          <View>
            <TextInput
              style={{
                margin: 12,
                borderColor: '#E9E9E9',
                borderWidth: 2,
                padding: 10,
                color: '#4700AE',
                fontSize: 15,
                height: 40,
                width: 55,
                textAlign: 'center',
              }}
              keyboardType="numeric"
              placeholder={quantity.toString()}
              placeholderTextColor="#6200EE"
              editable={false}
              selectTextOnFocus={false}
              value={quantity}
            />
            <Button
              onPress={() => {
                basketStore.deleteBasketItem(1, id);
                basketStore.getBasket();
              }}>
              {' '}
              <Icon name={'trash'} size={25} color={'#6200EE'} />
            </Button>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 33,
                width: 33,
                borderRadius: 8,
                elevation: 3,
                backgroundColor: '#6200EE',
                textAlign: 'center',
                position: 'absolute',
                right: 80,
                top: 85,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 12}}>
                {' '}
                {t('Edit')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <View style={{flex: 1}}>
      {basketStore.basketItems.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            extraData={basketStore.loading}
            data={basketStore.basketItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                marginBottom: 2,
                marginTop: 20,
                fontSize: 17,
                fontWeight: 'bold',
                color: '#6200EE',
              }}>
              Total: {basketStore.totalPrice} TL
            </Text>
          </View>
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
              paddingHorizontal: 46,
              borderRadius: 85,
              elevation: 3,
              backgroundColor: '#6200EE',

              marginTop: 20,
            }}
            onPress={() => NavigationService.navigate('ModalReceiveOrder')}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 21,
                fontWeight: 'bold',
                letterSpacing: 0.25,
                color: 'white',
              }}>
              {t('Proceed to CheckOut')}
            </Text>
          </Pressable>
        </View>
      ) : (
        <Background>
          <IconButton
            icon="basket"
            iconColor={'#6200EE'}
            size={120}
            onPress={() => NavigationService.navigate('Basket')}
          />

          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            {t('Your Basket is Empty!')}
          </Text>
          <Button
            onPress={() => NavigationService.navigate('ListOfProducts')}
            mode="outlined">
            {t('Products')}
          </Button>
        </Background>
      )}
      {basketStore.loading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
      ) : null}
    </View>
  );
};
export default observer(Basket);
