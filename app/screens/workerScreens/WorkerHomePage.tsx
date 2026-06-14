import React, {useEffect} from 'react';
import {
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  Switch,
} from 'react-native';
import {observer} from 'mobx-react';
import {useTranslation} from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useStores} from '../../store';
import {COLORS, greenButton, INPUT} from '../../style';
import LoadingOverlay from '../../components/LoadingOverlay';

const {height, width} = Dimensions.get('window');

const WorkerHomePage = () => {
  const {workerStore} = useStores();

  useEffect(() => {
    workerStore.getAdminPendingOrders();
    workerStore.getAdminRejectedOrders();
    workerStore.getAdminDeliveredOrders();
    workerStore.getAdminAcceptOrders();
  }, [workerStore]);

  const toggleSwitch = () => {
    setCheckboxState(previousState => !previousState);
  };
  const [checkboxState, setCheckboxState] = React.useState(true);

  const chechScanResult = (data: string) => {
    setBarcode(data);
    workerStore.getProductByBarcode(data);
  };

  const [scan, setScan] = React.useState(false);
  const [ScanResult, setScanResult] = React.useState(false);
  const [barcode, setBarcode] = React.useState('');

  const onSuccess = async (e: {data: string}) => {
    const check = e.data.substring(0, 4);
    if (check === 'http') {
      Linking.openURL(e.data).catch(() => {
        // ignore — failed to open external link
      });
    } else {
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

  const {t} = useTranslation();

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
              <Text style={{...styles.buttonTextStyle, color: COLORS.white}}>
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
              borderColor: COLORS.border,
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
          <View style={{height: 90}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '50%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                {' '}
                Price:{' '}
              </Text>
              <TextInput
                style={{
                  margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  color: COLORS.primaryDark,
                  fontSize: 20,
                }}
                keyboardType="numeric"
                onChangeText={workerStore.setPriceProduct}
                // keyboardType='decimal-pad'
                placeholder={workerStore.priceToString}
                placeholderTextColor={COLORS.primary}
                value={workerStore.priceProduct}
                /*{workerStore.searchResult.price}*/
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  left: -10,
                }}>
                {' '}
                TL{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                  paddingLeft: 30,
                }}>
                Discount Price:{' '}
              </Text>
              <TextInput
                keyboardType="numeric"
                style={INPUT}
                onChangeText={workerStore.setDiscountPriceProduct}
                placeholder={workerStore.discountPriceToString}
                placeholderTextColor={COLORS.primary}
                value={workerStore.discountPriceProduct}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.primary,
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
              trackColor={{
                false: COLORS.switchTrackOff,
                true: COLORS.switchTrackOn,
              }}
              thumbColor={
                checkboxState ? COLORS.switchThumbOn : COLORS.switchThumbOff
              }
              ios_backgroundColor={COLORS.switchIosBg}
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
                backgroundColor: COLORS.primary,
                marginTop: 2,
              }}
              onPress={async () => {
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
                  color: COLORS.white,
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
                  color: COLORS.white,
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
              <Text style={{...styles.buttonTextStyle, color: COLORS.primary}}>
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
          onRead={onSuccess}
          topContent={
            <Text style={styles.centerText}>
              Please move your camera {'\n'} over the QR Code
            </Text>
          }
        />
      ) : null}
      <LoadingOverlay visible={workerStore.loading} />
    </View>
  );
};
export default observer(WorkerHomePage);

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
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
    color: COLORS.white,
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: COLORS.white,
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
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.white,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.white,
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
    color: COLORS.white,
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 13,
    padding: 32,
    color: COLORS.black,
    height: 170,
  },
  textBold: {
    fontWeight: '500',
    color: COLORS.black,
  },
  bottomContent: {
    width: width,
    height: 120,
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: COLORS.white,
    marginTop: 32,
    width: width - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  buttonTextStyle: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
