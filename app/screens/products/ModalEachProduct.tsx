import {Text, View, Pressable, Image} from 'react-native';
import * as React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {
  COLORS,
  purpleButton,
  greenButton,
  discountedPriceStyle,
} from '../../style';
import NumericInput from 'react-native-numeric-input';
import NavigationService from '../../router/NavigationService';
import {useTranslation} from 'react-i18next';
import type {StoreProduct} from '../../types';

const ModalEachProduct = () => {
  const {productStore, basketStore} = useStores();
  const {t} = useTranslation();

  const selected = productStore.selectedProducts as StoreProduct;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{
          flex: 0.5,
          height: 200,
          borderWidth: 0.8,
          borderColor: COLORS.border,
          width: 200,
          marginBottom: 30,
        }}
        source={{
          uri: selected.product.thumb,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          padding: 2,
          fontSize: 15,
          fontWeight: 'bold',
          flexShrink: 1,
          paddingBottom: 10,
        }}>
        {selected.product.name}
      </Text>
      {selected.product.description &&
      selected.product.description !== 'No description found.' &&
      selected.product.description !== 'No description found' ? (
        <View style={{padding: 5, flex: 0.3}}>
          <Text style={{fontSize: 16}}>{selected.product.description}</Text>
        </View>
      ) : null}
      <View
        style={{
          flex: 0.07,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            ...discountedPriceStyle(
              selected.discount_price !== null && selected.discount_price !== 0,
            ),
          }}>
          {selected.price} TL
        </Text>
        {selected.discount_price !== null && selected.discount_price !== 0 ? (
          <Text
            style={{fontSize: 17, fontWeight: 'bold', color: COLORS.primary}}>
            {selected.discount_price} TL
          </Text>
        ) : null}
      </View>
      <NumericInput
        value={productStore.quantityOfProduct}
        onChange={productStore.setQuantityOfProduct}
        totalWidth={240}
        totalHeight={50}
        iconSize={25}
        valueType="real"
        rounded
        textColor={COLORS.pink}
        rightButtonBackgroundColor={COLORS.primary}
        leftButtonBackgroundColor={COLORS.green}
      />
      <Pressable
        style={purpleButton}
        onPress={() => {
          productStore.setAddProducts({
            ...selected,
            quantityOfProduct: productStore.quantityOfProduct,
          });
          basketStore.updateBasket(
            1,
            selected.id ?? 0,
            productStore.quantityOfProduct,
          );
          NavigationService.goBack();
        }}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: COLORS.white,
          }}>
          {' '}
          {t('Add')}
        </Text>
      </Pressable>
      <Pressable style={greenButton} onPress={() => NavigationService.goBack()}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: COLORS.white,
          }}>
          {t('Close')}
        </Text>
      </Pressable>
    </View>
  );
};
export default observer(ModalEachProduct);
