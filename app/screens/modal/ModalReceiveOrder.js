import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {observer} from 'mobx-react';

import {useStores} from '../../store';
import {purpleButton, greenButton} from '../../style';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';

import NavigationService from '../../router/NavigationService';
import {List} from 'react-native-paper';
import qs from 'qs';
import {Linking, Platform, StyleSheet} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {useTranslation} from 'react-i18next';

const _iconStyle = (borderColor: string) => ({
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

const verticalStaticData: ICheckboxButton[] = [
  {
    id: 0,
    text: 'Card',
    fillColor: '#6200EE',
    unfillColor: '#afb5f5',
    iconStyle: _iconStyle('#afb5f5'),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },

  {
    id: 1,
    text: 'Cash',
    fillColor: '#009588',
    unfillColor: '#cbf2d5',
    iconStyle: _iconStyle('#cbf2d5'),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
];

export async function sendMessage(to, subject, body, options = {}) {
  const url =
    Platform.OS === 'android'
      ? 'sms:919999999999?body=your message'
      : 'sms:919999999999';
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log('Unsupported url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
}

const {height, width} = Dimensions.get('window');

const ModalReceiveOrder = props => {
  const {t, i18n} = useTranslation();

  const [checkboxState, setCheckboxState] = React.useState(false);
  const [indexChangeColorAddress, setIndexChangeColorAddress] =
    React.useState(0);

  const {authStore, productStore, userAddressStore, basketStore} = useStores();

  useEffect(() => {
    authStore.getUser();
  }, []);

  const renderItem = ({item}) => {
    let name = item?.store_product.product?.name || null;
    let price = item?.store_product?.price || null;
    let thumb = item?.store_product.product?.thumb || null;
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
          borderColor: '#E2E2E2',
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
              }}>
              {item.store_product.discount_price}
            </Text>
          ) : null}
          {/*<Text style={{ flex: 0.2, fontSize: 12, }}>{item.amount}</Text>*/}
        </View>
        <View style={{marginTop: 17}}>
          <TextInput
            style={{
              margin: 12,
              borderWidth: 2,
              borderColor: '#E9E9E9',
              padding: 10,
              color: '#4700AE',
              fontSize: 15,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            placeholder={quantity.toString()}
            placeholderTextColor="#6200EE"
            editable={false}
            selectTextOnFocus={false}
            value={quantity}
          />
        </View>
      </View>
    );
  };

  const [showAddress, setShowAddress] = useState(false);
  const itemStyles = [
    stylesAddress.alphabetContainer,
    indexChangeColorAddress && stylesAddress.alphabetContainerSelected,
  ];
  let name = props?.route?.params?.name || null;
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
                color: '#6200EE',
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
              onChange={(selectedItem: ICheckboxButton) => {
                productStore.setPayment(selectedItem.text);
                // console.log("SelectedItem: ", productStore.payment);
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
              backgroundColor: checkboxState ? '#34eb83' : '#eb4034',
              marginBottom: 18,
            }}>
            <Text
              style={{
                color: '#fff',
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
            backgroundColor: '#6200EE',
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
              color: 'white',
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
            backgroundColor: '#009588',
            marginTop: 10,
          }}
          onPress={() => NavigationService.goBack()}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: 'white',
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
    backgroundColor: 'white',
  },
  alphabetContainerSelected: {
    backgroundColor: '#AFB5F5',
  },
});
