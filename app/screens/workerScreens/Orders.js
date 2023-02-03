import React, {
  useEffect, useState,useRef,
} from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react";
import { IconButton, List,TextInput } from "react-native-paper";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import navigationService from "../../router/NavigationService";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import Background from "../../components/Background";
import Icon from "react-native-vector-icons/FontAwesome";

const {
  height, width,
} = Dimensions.get('window',)

const Orders: () => Node = () =>{
  const { t, i18n } = useTranslation();

  // useEffect(()=>{
  //   workerStore.getAdminOrders(null)
  // }, [],)

  const {
    languageStore,
    authStore,
    workerStore,
    productStore
  } = useStores()

  const [text, setText] = React.useState("");

  const renderPendingItem = ({item}) => {
    // let thumb = items?.product?.thumb || null
    // console.log('item',item.phone)
    // console.log('pr',itemProducts)
    return (
      <ScrollView style={{
        flex: 1,
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        width: width,

        borderWidth: 1,
        borderColor: '#E2E2E2',

      }}>
        <TouchableOpacity onPress={() => {
          workerStore.setSelectedOrderProducts(item)
          // console.log('ww',item)
          NavigationService.navigate('ModalOrderProducts')
        }}>
          <View style={{ flex: 1 }}>
            <List.Icon  color="#6200EE" icon="phone" style={{position:'absolute',left:-12,bottom:38}} />
            {/*<Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold' }}>{price}</Text>*/}
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              paddingLeft:30
            }}>{item.phone}</Text>
            <List.Icon color="#6200EE" icon="update" style={{position:'absolute',left:-12,top:10}} />
              <Text style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',

                paddingLeft:30,
                paddingTop:10
              }}>{item.created_at}</Text>
            <List.Icon  color="#6200EE" icon="location-enter" style={{position:'absolute',left:-11,top:37}} />
            <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold',paddingLeft:30, paddingTop:10 }}>{item.address}</Text>
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#6200EE',position:'absolute',left:340
            }}>{item.status}</Text>
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#6200EE',position:'absolute',left:340,top:30
            }}>{item.total} TL</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  };


  const renderAcceptedItem = ({item}) => {
    // let thumb = items?.product?.thumb || null
    // console.log('item',item.phone)
    // console.log('pr',itemProducts)
    return (
      <ScrollView style={{
        flex: 1,
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        width: width,

        borderWidth: 1,
        borderColor: '#E2E2E2',

      }}>
        <TouchableOpacity onPress={() => {
          workerStore.setSelectedOrderProducts(item)
          // console.log('ww',item)
          NavigationService.navigate('ModalOrderProducts')
        }}>
          <View style={{ flex: 1 }}>
            <List.Icon  color="#6200EE" icon="phone" style={{position:'absolute',left:-12,bottom:38}} />
            {/*<Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold' }}>{price}</Text>*/}
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              paddingLeft:30
            }}>{item.phone}</Text>
            <List.Icon color="#6200EE" icon="update" style={{position:'absolute',left:-12,top:10}} />
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',

              paddingLeft:30,
              paddingTop:10
            }}>{item.created_at}</Text>
            <List.Icon  color="#6200EE" icon="location-enter" style={{position:'absolute',left:-11,top:37}} />
            <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold',paddingLeft:30, paddingTop:10 }}>{item.address}</Text>
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              color: 'green',position:'absolute',left:340
            }}>{item.status}</Text>
            <Text style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              color: 'green',position:'absolute',left:340,top:30
            }}>{item.total} TL</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  };

  // const renderRejectedItem = ({item}) => {
  //   // let thumb = items?.product?.thumb || null
  //   // console.log('item',item.phone)
  //   // console.log('pr',itemProducts)
  //   return (
  //     <ScrollView style={{
  //       flex: 1,
  //       marginBottom: 10,
  //       marginTop: 5,
  //       padding: 10,
  //       width: width,
  //
  //       borderWidth: 1,
  //       borderColor: '#E2E2E2',
  //
  //     }}>
  //       <TouchableOpacity onPress={() => {
  //         workerStore.setSelectedOrderProducts(item)
  //         // console.log('ww',item)
  //         NavigationService.navigate('ModalOrderProducts')
  //       }}>
  //         <View style={{ flex: 1 }}>
  //           <List.Icon  color="#6200EE" icon="phone" style={{position:'absolute',left:-12,bottom:38}} />
  //           {/*<Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold' }}>{price}</Text>*/}
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //             paddingLeft:30
  //           }}>{item.phone}</Text>
  //           <List.Icon color="#6200EE" icon="update" style={{position:'absolute',left:-12,top:10}} />
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //
  //             paddingLeft:30,
  //             paddingTop:10
  //           }}>{item.created_at}</Text>
  //           <List.Icon  color="#6200EE" icon="location-enter" style={{position:'absolute',left:-11,top:37}} />
  //           <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold',paddingLeft:30, paddingTop:10 }}>{item.address}</Text>
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //             color: 'red',position:'absolute',left:340
  //           }}>{item.status}</Text>
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //             color: 'red',position:'absolute',left:340,top:30
  //           }}>{item.total} TL</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   )
  // };
  //
  // const renderDeliveredItem = ({item}) => {
  //   // let thumb = items?.product?.thumb || null
  //   // console.log('item',item.phone)
  //   // console.log('pr',itemProducts)
  //   return (
  //     <ScrollView style={{
  //       flex: 1,
  //       marginBottom: 10,
  //       marginTop: 5,
  //       padding: 10,
  //       width: width,
  //
  //       borderWidth: 1,
  //       borderColor: '#E2E2E2',
  //
  //     }}>
  //       <TouchableOpacity onPress={() => {
  //         workerStore.setSelectedOrderProducts(item)
  //         // console.log('ww',item)
  //         NavigationService.navigate('ModalOrderProducts')
  //       }}>
  //         <View style={{ flex: 1 }}>
  //           <List.Icon  color="#6200EE" icon="phone" style={{position:'absolute',left:-12,bottom:38}} />
  //           {/*<Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold' }}>{price}</Text>*/}
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //             paddingLeft:30
  //           }}>{item.phone}</Text>
  //           <List.Icon color="#6200EE" icon="update" style={{position:'absolute',left:-12,top:10}} />
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //
  //             paddingLeft:30,
  //             paddingTop:10
  //           }}>{item.created_at}</Text>
  //           <List.Icon  color="#6200EE" icon="location-enter" style={{position:'absolute',left:-11,top:37}} />
  //           <Text style={{ flex: 0.2, fontSize: 14, fontWeight: 'bold',paddingLeft:30, paddingTop:10 }}>{item.address}</Text>
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //             color: 'blue',position:'absolute',left:340
  //           }}>{item.status}</Text>
  //           <Text style={{
  //             flex: 0.2,
  //             fontSize: 15,
  //             fontWeight: 'bold',
  //             color: 'blue',position:'absolute',left:340,top:30
  //           }}>{item.total} TL</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   )
  // };

  return (
    <ScrollView style={{flex: 1}} >
      <SafeAreaView >
      <List.Section>
        <List.Subheader>{t("Number")}</List.Subheader>
        <View style={{top: 10,
          width: width - 40,
          left: 20,
          zIndex: 99,}}>
          <TextInput
            mode={'outlined'}
            label={authStore.phoneNumber}
            value={text}
            onChangeText={text => setText(text)}
            disabled
            inlineImageLeft='search_icon'
          />
        </View>
        <List.Subheader style={{paddingTop:30,color:'#6200EE'}}>{t('Pending Orders')}</List.Subheader>
        <FlatList
          data={workerStore.pendingOrders}
          renderItem={renderPendingItem}
          keyExtractor={item => item.id}
          />
        <List.Subheader style={{paddingTop:30,color:'green'}}>{t('Accepted Orders')}</List.Subheader>
        <FlatList
          data={workerStore.acceptedOrders}
          renderItem={renderAcceptedItem}
          keyExtractor={item => item.id}
        />
        {/*<List.Subheader style={{paddingTop:30,color:'blue'}}>{t('Delivered Orders')}</List.Subheader>*/}
        {/*<FlatList*/}
        {/*  data={workerStore.deliveredOrders}*/}
        {/*  renderItem={renderDeliveredItem}*/}
        {/*  keyExtractor={item => item.id}*/}
        {/*/>*/}
        {/*<List.Subheader style={{paddingTop:30,color:'red'}}>{t('Rejected Orders')}</List.Subheader>*/}
        {/*<FlatList*/}
        {/*  data={workerStore.rejectedOrders}*/}
        {/*  renderItem={renderRejectedItem}*/}
        {/*  keyExtractor={item => item.id}*/}
        {/*/>*/}
        <List.Item
          onPress={() => authStore.onSignOut()}
          title={t("Log out")}
          left={() => <List.Icon color="#000" icon="logout" />}
        />
      </List.Section>

      {/*<Background>*/}
      {/*  <Button  style={{height:70,width:500,position: 'absolute',bottom: 0 }}>*/}
      {/*    {Object.keys(languageStore.lngs).map((lng) => (*/}
      {/*      <Button  key={lng} style={{borderRadius:20,fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} onPress={() => {*/}
      {/*        i18n.changeLanguage(lng);*/}
      {/*        languageStore.setCounter(languageStore.count + 1);*/}
      {/*      }}>*/}
      {/*        {languageStore.lngs[lng].nativeName}*/}
      {/*      </Button>*/}
      {/*    ))}*/}
      {/*  </Button>*/}
      {/*</Background>*/}
      </SafeAreaView>
    </ScrollView>

    // <Background>
    //   <Logo />
    //
    //   <Text>
    //     Your amazing app starts here. Open you favorite code editor and start
    //     editing this project.
    //   </Text>
    //   <Button
    //     mode="outlined"
    //     onPress={() =>
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'StartScreen' }],
    //       })
    //     }
    //   >
    //     Logout
    //   </Button>
    // </Background>
  )
}
export default observer(Orders)
