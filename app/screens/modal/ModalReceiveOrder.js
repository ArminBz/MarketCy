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

const _iconStyle = borderColor => ({
  height: 50,
  width: 50,
  borderRadius: 25,
  borderColor: borderColor,
});

const styles = {
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
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },

  {
    id: 1,
    text: 'Cash',
    fillColor: COLORS.green,
    unfillColor: COLORS.checkboxGreenUnfill,
    iconStyle: _iconStyle(COLORS.checkboxGreenUnfill),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
];

const {width} = Dimensions.get('window');

const ModalReceiveOrder = props => {
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [indexChangeColorAddress, setIndexChangeColorAddress] =
    React.useState(0);

  const {authStore, productStore, userAddressStore, basketStore} = useStores();

  useEffect(() => {
    authStore.getUser();
  }, [authStore]);

  const renderItem = ({item}) => {
    let name = item?.store_product.product?.name || null;
    let price = item?.store_product?.price || null;
    let quantity = item.quantity || null;
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          marginTop: 5,
          padding: 10,
          width: width,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: COLORS.borderLight,
        }}>
        <View style={{flex: 1}}>
          <Text style={{flex: 0.2, fontSize: 14, fontWeight: 'bold'}}>
            {name}
          </Text>

          <Text
            style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              ...discountedPriceStyle(
                item.store_product.discount_price !== null &&
                  item.store_product.discount_price !== 0,
              ),
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
                color: COLORS.primary,
              }}>
              {item.store_product.discount_price}
            </Text>
          ) : null}
        </View>
        <View style={{marginTop: 17}}>
          <TextInput
            style={{
              margin: 12,
              borderWidth: 2,
              borderColor: COLORS.borderInput,
              padding: 10,
              color: COLORS.primaryDark,
              fontSize: 15,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            placeholder={quantity.toString()}
            placeholderTextColor={COLORS.primary}
            editable={false}
            selectTextOnFocus={false}
            value={quantity}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <ScrollView style={{height: 200}}>
          <List.Section title="Your Addresses">
            <List.Accordion
              style={{}}
              title="Select your address"
              left={props => <List.Icon {...props} icon="location-enter" />}>
              {Object.keys(authStore.addressesOfUser).map((ads, index) => (
                <List.Item
                  style={
                    indexChangeColorAddress === index
                      ? stylesAddress.alphabetContainerSelected
                      : null
                  }
                  onPress={() => {
                    userAddressStore.setUserAddress(
                      authStore.addressesOfUser[ads],
                    );
                    setIndexChangeColorAddress(index);
                  }}
                  title={authStore.addressesOfUser[ads]}
                  key={ads}
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

      <View style={{flex: 0.8}}>
        <FlatList
          extraData={basketStore.basketItems}
          data={basketStore.basketItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                marginBottom: 2,
                marginTop: 20,
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}>
              Total: {basketStore.totalPrice} TL
            </Text>
          </View>
        </View>
        <SafeAreaView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginBottom: 10,
              marginLeft: 32,
              justifyContent: 'center',
            }}>
            <BouncyCheckboxGroup
              data={verticalStaticData}
              style={{flexDirection: 'column'}}
              onChange={selectedItem => {
                productStore.setPayment(selectedItem.text);
                JSON.stringify(selectedItem.id)
                  ? setCheckboxState(true)
                  : setCheckboxState(setCheckboxState(false));
              }}
            />
          </View>
          <View
            style={{
              width: 250,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              backgroundColor: checkboxState
                ? COLORS.paymentOn
                : COLORS.paymentOff,
              marginBottom: 18,
            }}>
            <Text
              style={{
                color: COLORS.white,
              }}>{`Check Payment method: ${checkboxState.toString()}`}</Text>
          </View>
        </SafeAreaView>
      </View>
      <View
        style={{flex: 0.15, alignItems: 'center', justifyContent: 'center'}}>
        <Pressable
          style={{
            paddingVertical: 12,
            paddingHorizontal: 130,
            borderRadius: 8,
            elevation: 3,
            backgroundColor: COLORS.primary,
            marginTop: 10,
          }}
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
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: COLORS.white,
            }}>
            {' '}
            Order
          </Text>
        </Pressable>
        <Pressable
          style={{
            paddingVertical: 12,
            paddingHorizontal: 130,
            borderRadius: 8,
            elevation: 3,
            backgroundColor: COLORS.green,
            marginTop: 10,
          }}
          onPress={() => NavigationService.goBack()}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: COLORS.white,
            }}>
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default observer(ModalReceiveOrder);
const stylesAddress = StyleSheet.create({
  alphabetContainer: {
    backgroundColor: COLORS.white,
  },
  alphabetContainerSelected: {
    backgroundColor: COLORS.checkboxPurpleUnfill,
  },
});
