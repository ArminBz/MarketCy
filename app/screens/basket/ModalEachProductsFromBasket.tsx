import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import * as React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {COLORS, purpleButton, greenButton} from '../../style';
import NumericInput from 'react-native-numeric-input';
import NavigationService from '../../router/NavigationService';
import {useTranslation} from 'react-i18next';
import type {BasketItem} from '../../types';

const ModalEachProductsFromBasket = () => {
  const {productStore, basketStore} = useStores();
  const {t} = useTranslation();

  const selected = productStore.selectedProducts as BasketItem;
  const name = selected?.store_product.product?.name || null;
  const price = selected?.store_product?.price || null;
  const thumb = selected?.store_product.product?.thumb;
  const description = selected?.store_product.product?.description || null;
  const id = selected?.store_product?.id ?? 0;
  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={{
          uri: thumb,
        }}
        resizeMode="cover"
      />

      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text2}>{description}</Text>
      <View style={styles.view2}>
        <Text style={styles.text3}>{price} TL</Text>
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
          basketStore.updateBasket(1, id, productStore.quantityOfProduct);
          basketStore.getBasket();

          NavigationService.goBack();
        }}>
        <Text style={styles.text4}> {t('Add')}</Text>
      </Pressable>
      <Pressable style={greenButton} onPress={() => NavigationService.goBack()}>
        <Text style={styles.text5}>{t('Close')}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {
    flex: 0.4,
    height: 200,
    borderWidth: 0.8,
    borderColor: COLORS.border,
    width: 200,
    marginBottom: 30,
  },
  text: {flex: 0.06, fontSize: 17, fontWeight: 'bold'},
  text2: {flex: 0.06, fontSize: 16},
  view2: {
    flex: 0.07,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text3: {fontSize: 17, fontWeight: 'bold', color: COLORS.primary},
  text4: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  text5: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
});

export default observer(ModalEachProductsFromBasket);
