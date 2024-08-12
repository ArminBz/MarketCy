import {
  ActivityIndicator,
  Alert, Dimensions,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { observer } from "mobx-react";
import NavigationService from "../../router/NavigationService";
import React, {
  Node, useEffect, useState,useRef,
} from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import { Paragraph } from "react-native-paper";
import Button from '../../components/Button'
import PhoneInput from 'react-native-phone-number-input';

import { useStores } from "../../store";
import VerifyNumber from "./VerifyNumber";
import { useTranslation } from "react-i18next";

const {
  height, width,
} = Dimensions.get('window',)
const Intro: () => Node = () =>{

  const { t, i18n } = useTranslation();


  useEffect(() => {

  }, []);


  const {
    authStore,
    languageStore,
  } = useStores()



  const phoneInput = React.useRef(null);


  const OnPress = () => {

    if (authStore.phoneNumber.length !==0) {
      Alert.alert(
        "Confirm Number",
        authStore.phoneNumber,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },

          {
            text: "OK",
            onPress: () => authStore.phoneNumber? authStore.login():alert('please Enter your Number'),
          },
        ],
      );
    }
  }

  return (
    <ScrollView  contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex:1,
        padding: 20,
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',marginBottom:80}}>
          <Logo />
          <Text style={{ paddingBottom: 30, color: '#6203EC', fontWeight: "bold", fontSize: 15 }}>
            {t('Enter Your Phone Number')}
          </Text>
          <PhoneInput
            ref={phoneInput}
            // defaultValue={authStore.phoneNumber}
            defaultCode="TR"
            layout="first"
            onChangeFormattedText={text => {
              authStore.setPhoneNumber(text);
            }}
            onChangeText={(text) => {
              authStore.setPhoneNumber(text);
            }}
            withShadow
            autoFocus
          />
          <Button
            style={{ marginTop:40,width:240}}
            mode="contained"
            onPress={() => OnPress()}
          >
            {t('Send me the code!')}
          </Button>

      </View>
      {authStore.loading ? (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
        }} >
          <ActivityIndicator
            size="large"
            color="#6200EE"
          />
        </View> ) :null}

      <View style={{flexDirection: 'row',width:width/4,justifyContent: 'center', alignItems: 'center',position: 'absolute',bottom: 0,flex:1,alignSelf: 'center'}}>
        {Object.keys(languageStore.lngs).map((lng) => (
          <Button key={lng}
                  style={{ borderRadius: 20, fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
                  onPress={() => {
                    i18n.changeLanguage(lng);
                    languageStore.setCounter(languageStore.count + 1);
                  }}>
            {languageStore.lngs[lng].nativeName}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
}

export default observer(Intro)
