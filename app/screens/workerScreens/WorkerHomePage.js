import React, {
  useEffect, useState,useRef,
} from 'react'
import { Dimensions, ImageBackground, Linking, Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import { IconButton, List,TextInput } from "react-native-paper";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import navigationService from "../../router/NavigationService";
import { useTranslation } from "react-i18next";
// import Button from "../../components/Button";
// import Background from "../../components/Background";
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const {
  height, width,
} = Dimensions.get('window',)

const WorkerHomePage: () => Node = () =>{


//   this.state = {
//     scan: false,
//     ScanResult: false,
//     result: null
//   };
//
// const onSuccess = (e) => {
//   const check = e.data.substring(0, 4);
//   console.log('scanned data' + check);
//   this.setState({
//     result: e,
//     scan: false,
//     ScanResult: true
//   })
//   if (check === 'http') {
//     Linking.openURL(e.data).catch(err => console.error('An error occured', err));
//   } else {
//     this.setState({
//       result: e,
//       scan: false,
//       ScanResult: true
//     })
//   }
// }
// const activeQR = () => {
//   this.setState({ scan: true })
// }
// const scanAgain = () => {
//   this.setState({ scan: true, ScanResult: false })
// }

  const { t, i18n } = useTranslation();

  const {
    authStore,
  } = useStores()

  const [text, setText] = React.useState("");
  return (
    <View></View>
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


  //   <View style={styles.scrollViewStyle}>
  //     <View>
  //       <View style={styles.header}>
  //         <TouchableOpacity>
  //           {/*<Image source={require('./assets/back.png')} style={{height: 36, width: 36}}></Image>*/}
  //         </TouchableOpacity>
  //         <Text style={styles.textTitle}>Scan QR Code</Text>
  //       </View>
  //       {!this.scan && !this.ScanResult &&
  //         <View style={styles.cardView} >
  //           {/*<Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>*/}
  //           <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
  //           {/*<Image source={require('./assets/qr-code.png')} style={{margin: 20}}></Image>*/}
  //           <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
  //             <View style={styles.buttonWrapper}>
  //               {/*<Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>*/}
  //               <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan QR Code</Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       }
  //       {this.ScanResult &&
  //         <View>
  //           <Text style={styles.textTitle1}>Result</Text>
  //           <View style={this.ScanResult ? styles.scanCardView : styles.cardView}>
  //             <Text>Type : {this.result.type}</Text>
  //             <Text>Result : {this.result.data}</Text>
  //             <Text numberOfLines={1}>RawData: {this.result.rawData}</Text>
  //             <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
  //               <View style={styles.buttonWrapper}>
  //                 {/*<Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>*/}
  //                 <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       }
  //       {this.scan &&
  //         <QRCodeScanner
  //           reactivate={true}
  //           showMarker={true}
  //           ref={(node) => { this.scanner = node }}
  //           onRead={onSuccess}
  //           topContent={
  //             <Text style={styles.centerText}>
  //               Please move your camera {"\n"} over the QR Code
  //             </Text>
  //           }
  //           bottomContent={
  //             <View>
  //               {/*<ImageBackground source={require('./assets/bottom-panel.png')} style={styles.bottomContent}>*/}
  //                 <TouchableOpacity style={styles.buttonScan2}
  //                                   onPress={() => this.scanner.reactivate()}
  //                                   onLongPress={() => this.setState({ scan: false })}>
  //                   {/*<Image source={require('./assets/camera2.png')}></Image>*/}
  //                 </TouchableOpacity>
  //               {/*</ImageBackground>*/}
  //             </View>
  //           }
  //         />
  //       }
  //     </View>
  //   </View>
  //
   )
}
export default observer(WorkerHomePage)

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2196f3'
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
    color: 'white'
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
    backgroundColor: 'white'
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
    alignItems: 'center'
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#258ce3',
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
    fontSize: 16
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

