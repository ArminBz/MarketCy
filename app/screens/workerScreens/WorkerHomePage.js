import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  Dimensions,
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TextInput,
  Switch,
} from 'react-native';
import {observer} from 'mobx-react';
import {useTranslation} from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../../components/Button';
import Background from '../../components/Background';
import {useStores} from '../../store';
import {greenButton, INPUT, purpleButton} from '../../style';
import NavigationService from '../../router/NavigationService';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const {height, width} = Dimensions.get('window');

const WorkerHomePage = () => {
  const {workerStore, basketStore, authStore} = useStores();

  useEffect(() => {
    workerStore.getAdminPendingOrders();
    workerStore.getAdminRejectedOrders();
    workerStore.getAdminDeliveredOrders();
    workerStore.getAdminAcceptOrders();
  }, [workerStore]);

  const toggleSwitch = () => {
    setCheckboxState(previousState => !previousState);
  };
  let bouncyCheckboxRef = null;
  const [checkboxState, setCheckboxState] = React.useState(true);

  const chechScanResult = data => {
    setBarcode(data);
    workerStore.getProductByBarcode(data);
  };

  const [scan, setScan] = React.useState(false);
  const [ScanResult, setScanResult] = React.useState(false);
  const [barcode, setBarcode] = React.useState(0);

  const onSuccess = async e => {
    const check = e.data.substring(0, 4);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      console.log('e', e.data);
      await chechScanResult(e.data);
      setScan(false);
      setScanResult(true);
    }
  };
  const activeQR = () => {
    setScan(true);
  };
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  const {t, i18n} = useTranslation();

  return (
    <View style={styles.scrollViewStyle}>
      <View>
        <TouchableOpacity />
        <Text style={styles.textTitle}>Scan QR Code</Text>
      </View>
      {!scan && !ScanResult ? (
        <View style={styles.cardView}>
          <Image
            source={require('./../../assets/camera.png')}
            style={{height: 36, width: 36}}
          />
          <Text numberOfLines={8} style={styles.descText}>
            Please move your camera {'\n'} over the QR Code
          </Text>
          <Image
            source={require('./../../assets/qr-code.png')}
            style={{margin: 20}}
          />
          <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
            <View style={styles.buttonWrapper}>
              <Image
                source={require('./../../assets/camera.png')}
                style={{height: 36, width: 36}}
              />
              <Text style={{...styles.buttonTextStyle, color: 'white'}}>
                Scan QR Code
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      {ScanResult ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{
              height: 200,
              borderWidth: 0.8,
              borderColor: '#C6C6C6',
              width: 200,
              marginBottom: 10,
            }}
            source={{
              uri: workerStore.searchResult.thumb,
            }}
            resizeMode="cover"
          />
          <Text style={{fontSize: 17, fontWeight: 'bold', marginBottom: 1}}>
            {workerStore.searchResult.name}
          </Text>
          <Text style={{fontSize: 16}}>
            {workerStore.searchResult.description}
          </Text>
          {/*<Text style={{flex:0.06,fontSize: 17,}}>{productStore.selectedProducts.amount}</Text>*/}
          <View style={{height: 90}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '50%',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 14, fontWeight: 'bold', color: '#6200EE'}}>
                {' '}
                Price:{' '}
              </Text>
              <TextInput
                style={{
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  color: '#4700AE',
                  fontSize: 20,
                }}
                keyboardType="numeric"
                onChangeText={workerStore.setPriceProduct}
                // keyboardType='decimal-pad'
                placeholder={workerStore.priceToString}
                placeholderTextColor="#6200EE"
                value={workerStore.priceProduct}
                /*{workerStore.searchResult.price}*/
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#6200EE',
                  left: -10,
                }}>
                {' '}
                TL{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#6200EE',
                  paddingLeft: 30,
                }}>
                Discount Price:{' '}
              </Text>
              <TextInput
                keyboardType="numeric"
                style={INPUT}
                onChangeText={workerStore.setDiscountPriceProduct}
                placeholder={workerStore.discountPriceToString}
                placeholderTextColor="#6200EE"
                value={workerStore.discountPriceProduct}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#6200EE',
                position: 'absolute',
                right: -15,
                bottom: 35,
              }}>
              {' '}
              TL{' '}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 20,
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={checkboxState ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={checkboxState}
            />
          </View>
          <View>
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 46,
                borderRadius: 8,
                elevation: 3,
                backgroundColor: '#6200EE',
                marginTop: 2,
              }}
              onPress={async () => {
                console.log(
                  'ball',
                  barcode,
                  workerStore.priceProduct,
                  workerStore.discountPriceProduct,
                  checkboxState,
                );
                await workerStore.adminCreateProduct(
                  barcode,
                  workerStore.priceProduct,
                  workerStore.discountPriceProduct,
                  checkboxState,
                );
                setScanResult(false);
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
                {t('Add')}
              </Text>
            </Pressable>
            <Pressable style={greenButton} onPress={() => setScanResult(false)}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21,
                  fontWeight: 'bold',
                  letterSpacing: 0.25,
                  color: 'white',
                }}>
                {t('Close')}
              </Text>
            </Pressable>
          </View>

          <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
            <View style={styles.buttonWrapper}>
              <Image
                source={require('./../../assets/camera.png')}
                style={{height: 36, width: 36}}
              />
              <Text style={{...styles.buttonTextStyle, color: '#6200EE'}}>
                Click to scan again
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      {scan ? (
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          ref={node => {
            this.scanner = node;
          }}
          onRead={onSuccess}
          topContent={
            <Text style={styles.centerText}>
              Please move your camera {'\n'} over the QR Code
            </Text>
          }
        />
      ) : null}
      {workerStore.loading ? (
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
export default observer(WorkerHomePage);

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    paddingLeft: 15,
    paddingTop: 10,
    width: width,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  cardView: {
    height: height,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    backgroundColor: '#6200EE',
  },
  scanCardView: {
    width: width - 32,
    height: height / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    paddingTop: 1,
    paddingRight: 25,
    paddingBottom: 1,
    paddingLeft: 25,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonScan2: {
    marginLeft: width / 2 - 50,
    width: 100,
    height: 100,
  },
  descText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 13,
    padding: 32,
    color: 'black',
    height: 170,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  bottomContent: {
    width: width,
    height: 120,
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: 'white',
    marginTop: 32,
    width: width - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
});
