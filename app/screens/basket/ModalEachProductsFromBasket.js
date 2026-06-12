import {Text, View, Pressable, Image} from 'react-native';
import * as React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {COLORS, purpleButton, greenButton} from '../../style';
import NumericInput from 'react-native-numeric-input';
import NavigationService from '../../router/NavigationService';
import {useTranslation} from 'react-i18next';

const ModalEachProductsFromBasket = props => {
  const {productStore, basketStore} = useStores();
  const {t} = useTranslation();

  let name = productStore.selectedProducts?.store_product.product?.name || null;
  let price = productStore.selectedProducts?.store_product?.price || null;
  let thumb =
    productStore.selectedProducts?.store_product.product?.thumb || null;
  let description =
    productStore.selectedProducts?.store_product.product?.description || null;
  let id = productStore.selectedProducts?.store_product?.id || null;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{
          flex: 0.4,
          height: 200,
          borderWidth: 0.8,
          borderColor: COLORS.border,
          width: 200,
          marginBottom: 30,
        }}
        source={{
          uri: thumb,
        }}
        resizeMode="cover"
      />

      <Text style={{flex: 0.06, fontSize: 17, fontWeight: 'bold'}}>{name}</Text>
      <Text style={{flex: 0.06, fontSize: 16}}>{description}</Text>
      <View
        style={{
          flex: 0.07,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: COLORS.primary}}>
          {price} TL
        </Text>
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
        iconStyle={{color: COLORS.white}}
        rightButtonBackgroundColor={COLORS.primary}
        leftButtonBackgroundColor={COLORS.green}
      />
      <Pressable
        style={purpleButton}
        onPress={() => {
          basketStore.updateBasket(1, id, productStore.quantityOfProduct);
          basketStore.getBasket();

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
export default observer(ModalEachProductsFromBasket);
