import {
  ActivityIndicator,
  Alert,
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

const Intro: () => Node = () =>{

  const { t, i18n } = useTranslation();
  // const [count, setCounter] = useState(0);

  // const [lngs, setLngs] = useState({ en: { nativeName: 'English' }});

  useEffect(() => {
    // i18n.services.backendConnector.backend.getLanguages((err, ret) => {
    //   if (err) return // TODO: handle err...
    //   languageStore.setLngs(ret);
    // });
  }, []);


  const {
    authStore,
    languageStore,
  } = useStores()


  // const [name, setName, ] = useState('Intro')

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
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>{name}</Text>
  //     <Button
  //       title="Go to Details"
  //       onPress={() => setName('aidin')}
  //     />
  //
  //   </View>
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Background>
          <Logo />
          <Text style={{ paddingBottom: 30, color: '#6203EC', fontWeight: "bold", fontSize: 15 }}>
            {t('I Need Your Phone Number!')}
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
            style={{ marginBottom: 180,marginTop:40 }}
            mode="contained"
            // onPress={() =>authStore.phoneNumber? authStore.login():alert('please Enter your Number')}
            onPress={() => OnPress()}
          >
            {t('Send me the code!')}
          </Button>
          <Button style={{ height: 70, width: 500, position: 'absolute', bottom: 0 }}>
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
          </Button>
        </Background>
      {authStore.loading ? (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
        }} >
          <ActivityIndicator
            size="large"
            color="#6200EE"

          />
        </View> ) :null}
    </ScrollView>
  );
}

export default observer(Intro)
