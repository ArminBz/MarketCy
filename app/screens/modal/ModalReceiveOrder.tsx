import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {useStores} from '../../store';
import {COLORS, discountedPriceStyle} from '../../style';

import NavigationService from '../../router/NavigationService';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import type {BasketItem} from '../../types';

const _iconStyle = (borderColor: string) => ({
  height: 50,
  width: 50,
  borderRadius: 25,
  borderColor: borderColor,
});

const iconStyles = {
  container: {marginTop: 24},
  verticalStyle: {marginTop: 16},
  textStyle: {textDecorationLine: 'none'},
  iconImageStyle: {height: 20, width: 20},
};

const verticalStaticData = [
  {
    id: 0,
    text: 'Card',
    fillColor: COLORS.primary,
    unfillColor: COLORS.checkboxPurpleUnfill,
    iconStyle: _iconStyle(COLORS.checkboxPurpleUnfill),
    textStyle: iconStyles.textStyle,
    style: iconStyles.verticalStyle,
    iconImageStyle: iconStyles.iconImageStyle,
  },

  {
    id: 1,
    text: 'Cash',
    fillColor: COLORS.green,
    unfillColor: COLORS.checkboxGreenUnfill,
    iconStyle: _iconStyle(COLORS.checkboxGreenUnfill),
    textStyle: iconStyles.textStyle,
    style: iconStyles.verticalStyle,
    iconImageStyle: iconStyles.iconImageStyle,
  },
];

const {width} = Dimensions.get('window');

const ModalReceiveOrder = () => {
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [indexChangeColorAddress, setIndexChangeColorAddress] =
    React.useState(0);

  const {authStore, productStore, userAddressStore, basketStore} = useStores();

  useEffect(() => {
    authStore.getUser();
  }, [authStore]);

  const renderItem = ({item}: {item: BasketItem}) => {
    const name = item?.store_product.product?.name || null;
    const price = item?.store_product?.price || null;
    const quantity = item.quantity ?? 0;
    return (
      <View style={styles.view}>
        <View style={styles.view2}>
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
              {item.store_product.discount_price}
            </Text>
          ) : null}
        </View>
        <View style={styles.view3}>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder={quantity.toString()}
            placeholderTextColor={COLORS.primary}
            editable={false}
            selectTextOnFocus={false}
            value={quantity.toString()}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.view4}>
      <View>
        <ScrollView style={styles.scrollView}>
          <List.Section title="Your Addresses">
            <List.Accordion
              title="Select your address"
              left={props => <List.Icon {...props} icon="location-enter" />}>
              {authStore.addressesOfUser.map((address, index) => (
                <List.Item
                  style={
                    indexChangeColorAddress === index
                      ? styles.alphabetContainerSelected
                      : null
                  }
                  onPress={() => {
                    userAddressStore.setUserAddress(address);
                    setIndexChangeColorAddress(index);
                  }}
                  title={address}
                  key={index}
                />
              ))}
              <List.Item
                title={'Add your address'}
                onPress={() => NavigationService.navigate('ModalUserAddress')}
              />
            </List.Accordion>
          </List.Section>
        </ScrollView>
      </View>

      <View style={styles.view5}>
        <FlatList
          extraData={basketStore.basketItems}
          data={basketStore.basketItems}
          renderItem={renderItem}
          keyExtractor={item => (item.id ?? 0).toString()}
        />

        <View>
          <View style={styles.view6}>
            <Text style={styles.text3}>Total: {basketStore.totalPrice} TL</Text>
          </View>
        </View>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.view7}>
            <BouncyCheckboxGroup
              data={verticalStaticData}
              style={styles.bouncyCheckboxGroup}
              onChange={(selectedItem: {id: number; text: string}) => {
                productStore.setPayment(selectedItem.text);
                JSON.stringify(selectedItem.id)
                  ? setCheckboxState(true)
                  : setCheckboxState(false);
              }}
            />
          </View>
          <View
            style={[
              styles.paymentBox,
              checkboxState ? styles.paymentOn : styles.paymentOff,
            ]}>
            <Text
              style={
                styles.text4
              }>{`Check Payment method: ${checkboxState.toString()}`}</Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.view8}>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            checkboxState === true &&
            userAddressStore.userAddress !== undefined &&
            userAddressStore.userAddress.length > 0
              ? basketStore.checkOut(
                  1,
                  userAddressStore.userAddress,
                  productStore.payment,
                )
              : Alert.alert('Check the Payment method or add your address');
            NavigationService.navigate('ListOfProducts');
          }}>
          <Text style={styles.text5}> Order</Text>
        </Pressable>
        <Pressable
          style={styles.pressable2}
          onPress={() => NavigationService.goBack()}>
          <Text style={styles.text6}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default observer(ModalReceiveOrder);
const styles = StyleSheet.create({
  priceText: {flex: 0.2, fontSize: 15, fontWeight: 'bold'},
  paymentBox: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 18,
  },
  paymentOn: {backgroundColor: COLORS.paymentOn},
  paymentOff: {backgroundColor: COLORS.paymentOff},
  view: {
    flex: 1,
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    width: width,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  view2: {flex: 1},
  text: {flex: 0.2, fontSize: 14, fontWeight: 'bold'},
  text2: {
    flex: 0.2,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  view3: {marginTop: 17},
  textInput: {
    margin: 12,
    borderWidth: 2,
    borderColor: COLORS.borderInput,
    padding: 10,
    color: COLORS.primaryDark,
    fontSize: 15,
    textAlign: 'center',
  },
  view4: {flex: 1},
  scrollView: {height: 200},
  view5: {flex: 0.8},
  view6: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 10,
  },
  text3: {
    marginBottom: 2,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  safeAreaView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  view7: {
    marginBottom: 10,
    marginLeft: 32,
    justifyContent: 'center',
  },
  bouncyCheckboxGroup: {flexDirection: 'column'},
  text4: {
    color: COLORS.white,
  },
  view8: {flex: 0.15, alignItems: 'center', justifyContent: 'center'},
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 130,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.primary,
    marginTop: 10,
  },
  text5: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  pressable2: {
    paddingVertical: 12,
    paddingHorizontal: 130,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.green,
    marginTop: 10,
  },
  text6: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  alphabetContainer: {
    backgroundColor: COLORS.white,
  },
  alphabetContainerSelected: {
    backgroundColor: COLORS.checkboxPurpleUnfill,
  },
});
