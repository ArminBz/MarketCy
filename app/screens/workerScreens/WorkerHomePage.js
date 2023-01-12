import React, {
  useEffect, useState,useRef,Fragment,
} from 'react'
import {
  Dimensions,
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Pressable, ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from "../../components/Button";
import Background from "../../components/Background";
import { useStores } from "../../store";

const {
  height, width,
} = Dimensions.get('window',)

const WorkerHomePage: () => Node = () =>{

  const {
    workerStore,
    basketStore
  } = useStores()

  const chechScanResult = () => {
    workerStore.getProductByBarcode(result.data)
  }

  // useEffect(()=>{
  //
  // }, [],)

  const [scan, setScan] = React.useState(false);
  const [ScanResult, setScanResult] = React.useState(false);
  const [result, setResult] = React.useState(null);

const onSuccess = (e) => {
  const check = e.data.substring(0, 4);
  setScanResult(true)
  setScan(false)
  setResult(0)
  if (check === 'http') {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  } else {
    setResult(e)
    setScan(false)
    setScanResult(true)
  }
}
const activeQR = () => {
  setScan(true)
}
const scanAgain = () => {
  setScan(true)
  setScanResult(false)
}

  const { t, i18n } = useTranslation();

  const {
    authStore,
  } = useStores()

  const [text, setText] = React.useState("");
  return (
    // <View style={{flex:1}}>
    //   <List.Section>
    //     <List.Subheader>{t("Number")}</List.Subheader>
    //     <View style={{top: 10,
    //       width: width - 40,
    //       left: 20,
    //       zIndex: 99,}}>
    //       <TextInput
    //         mode={'outlined'}
    //         label={authStore.phoneNumber}
    //         value={text}
    //         onChangeText={text => setText(text)}
    //         disabled
    //         inlineImageLeft='search_icon'
    //       />
    //     </View>
    //     <List.Subheader style={{paddingTop:30}}>{t('Products')}</List.Subheader>
    //     <List.Item
    //       onPress={() => NavigationService.navigate('ModalUserAddress')}
    //       title={t("Set Address")}
    //       left={() => <List.Icon color="#000" icon="home" />}
    //     />
    //     <List.Item
    //       onPress={() => authStore.onSignOut()}
    //       title={t("Log out")}
    //       left={() => <List.Icon color="#000" icon="logout" />}
    //     />
    //   </List.Section>
    // </View>


    <View style={styles.scrollViewStyle}>
      <Fragment>
        <View style={styles.header}>
          <TouchableOpacity>
            {/*<Image source={require('./assets/back.png')} style={{height: 36, width: 36}}></Image>*/}
          </TouchableOpacity>
          <Text style={styles.textTitle}>Scan QR Code</Text>
        </View>
        {!scan && !ScanResult &&
          <View style={styles.cardView} >
            <Image source={require('./../../assets/camera.png')} style={{height: 36, width: 36}}></Image>
            <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
            <Image source={require('./../../assets/qr-code.png')} style={{margin: 20}}></Image>
            <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
              <View style={styles.buttonWrapper}>
                <Image source={require('./../../assets/camera.png')} style={{height: 36, width: 36}}></Image>
                <Text style={{...styles.buttonTextStyle, color: 'white'}}>Scan QR Code</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        {ScanResult &&
          <Fragment>
          <View>
            <Text style={styles.textTitle1}>Result</Text>
            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
              <Text>Type : {result.type}</Text>
              <Text>Result : {result.data}</Text>
              <Text numberOfLines={1}>RawData: {result.rawData}</Text>
              <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Image source={require('./../../assets/camera.png')} style={{height: 36, width: 36}}></Image>
                  <Text style={{...styles.buttonTextStyle, color: '#6200EE'}}>Click to scan again</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          </Fragment>
        }
        {scan &&
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={(node) => { this.scanner = node }}
            onRead={onSuccess}
            topContent={
              <Text style={styles.centerText}>
                Please move your camera {"\n"} over the QR Code
              </Text>
            }
            bottomContent={
              <View>
                <ImageBackground source={require('./../../assets/bottom-panel.png')} style={styles.bottomContent}>
                  <TouchableOpacity style={styles.buttonScan2}
                                    onPress={() => this.scanner.reactivate()}
                                    onLongPress={() => setScan(false)}>
                    <Image source={require('./../../assets/camera2.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>

            }
          />
        }
      </Fragment>
        <Background>
          <Button
            style={{ marginTop: 30 }}
            mode="contained"
            onPress={() => authStore.onSignOut()}
          >
            {t('LogOut')}
          </Button>
        </Background>
      {basketStore.loading ? (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
        }} >
          <ActivityIndicator
            size="large"
            color="#6200EE"
          />
        </View> ) :null}
      { ScanResult ? chechScanResult():null }
    </View>
   )
}
export default observer(WorkerHomePage)

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
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
    color:'white',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white'
  },
  cardView: {
    width: width - 32,
    height: height - 350,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    backgroundColor: '#6200EE'
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
    backgroundColor: 'white'
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
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20
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
    color:'white'
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
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
    height: 44
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  }
}
)

