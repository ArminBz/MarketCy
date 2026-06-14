import React, {useEffect} from 'react';
import Background from '../../components/Background';
import Button from '../../components/Button';
import {
  StyleSheet,
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
import {IconButton} from 'react-native-paper';
import {COLORS, discountedPriceStyle} from '../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';
import LoadingOverlay from '../../components/LoadingOverlay';
import type {BasketItem} from '../../types';

const {width} = Dimensions.get('window');

const Basket = () => {
  const {t} = useTranslation();

  const {productStore, basketStore} = useStores();

  useEffect(() => {
    basketStore.getBasket();
  }, [basketStore]);

  const renderItem = ({item}: {item: BasketItem}) => {
    const name = item?.store_product.product?.name || null;
    const price = item?.store_product?.price || null;
    const thumb = item?.store_product.product?.thumb;
    const quantity = item.quantity ?? 0;
    const id = item?.store_product?.id ?? 0;
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => {
            productStore.setSelectedProducts(item);
            NavigationService.navigate('ModalEachProductsFromBasket');
          }}>
          <Image
            style={styles.image}
            source={{
              uri: thumb,
            }}
            resizeMode="cover"
          />
          <View style={styles.view}>
            <Text style={styles.text}>{name}</Text>

            <Text
              style={[
                styles.priceText,
                discountedPriceStyle(
                  item.store_product.discount_price !== null &&
                    item.store_product.discount_price !== 0,
                ),
              ]}>
              {price}
            </Text>
            {item.store_product.discount_price !== null &&
            item.store_product.discount_price !== 0 ? (
              <Text style={styles.text2}>
                {item.store_product.discount_price} TL
              </Text>
            ) : null}
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={quantity.toString()}
              placeholderTextColor={COLORS.primary}
              editable={false}
              selectTextOnFocus={false}
              value={quantity.toString()}
            />
            <Button
              onPress={() => {
                basketStore.deleteBasketItem(1, id);
                basketStore.getBasket();
              }}>
              {' '}
              <Icon name={'trash'} size={25} color={COLORS.primary} />
            </Button>

            <View style={styles.view2}>
              <Text style={styles.text3}> {t('Edit')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  return (
    <View style={styles.view3}>
      {basketStore.basketItems.length > 0 ? (
        <View style={styles.view4}>
          <FlatList
            extraData={basketStore.loading}
            data={basketStore.basketItems}
            renderItem={renderItem}
            keyExtractor={item => (item.id ?? 0).toString()}
          />
          <View style={styles.view5}>
            <Text style={styles.text4}>Total: {basketStore.totalPrice} TL</Text>
          </View>
          <Pressable
            style={styles.pressable}
            onPress={() => NavigationService.navigate('ModalReceiveOrder')}>
            <Text style={styles.text5}>{t('Proceed to CheckOut')}</Text>
          </Pressable>
        </View>
      ) : (
        <Background>
          <IconButton
            icon="basket"
            iconColor={COLORS.primary}
            size={120}
            onPress={() => NavigationService.navigate('Basket')}
          />

          <Text style={styles.text6}>{t('Your Basket is Empty!')}</Text>
          <Button
            onPress={() => NavigationService.navigate('ListOfProducts')}
            mode="outlined">
            {t('Products')}
          </Button>
        </Background>
      )}
      <LoadingOverlay visible={basketStore.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  priceText: {flex: 0.2, fontSize: 15, fontWeight: 'bold'},
  touchableOpacity: {
    flex: 1,
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    width: width,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  image: {
    flex: 0.4,
    height: 130,
    borderWidth: 0.8,
    borderColor: COLORS.border,
    width: 60,
    padding: 6,
    marginRight: 10,
  },
  view: {flex: 0.6},
  text: {flex: 0.2, fontSize: 14, fontWeight: 'bold'},
  text2: {
    flex: 0.2,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  textInput: {
    margin: 12,
    borderColor: COLORS.borderInput,
    borderWidth: 2,
    padding: 10,
    color: COLORS.primaryDark,
    fontSize: 15,
    height: 40,
    width: 55,
    textAlign: 'center',
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 33,
    width: 33,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 80,
    top: 85,
  },
  text3: {fontWeight: 'bold', color: COLORS.white, fontSize: 12},
  view3: {flex: 1},
  view4: {flex: 1},
  view5: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text4: {
    marginBottom: 2,
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 46,
    borderRadius: 85,
    elevation: 3,
    backgroundColor: COLORS.primary,

    marginTop: 20,
  },
  text5: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  text6: {fontSize: 14, fontWeight: 'bold'},
});

export default observer(Basket);
