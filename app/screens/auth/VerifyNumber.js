import {  Text, View,TextInput } from "react-native";
import { observer } from "mobx-react";
import NavigationService from "../../router/NavigationService";
import React, {
  Node, useEffect, useState,useRef,
} from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import { Paragraph } from "react-native-paper";
import Button from '../../components/Button'
import { INPUT, } from '../../style'
import { useStores } from "../../store";
import { useTranslation } from "react-i18next";

const VerifyNumber: () => Node = () =>{
  const { t, i18n } = useTranslation();

  // const phoneInput = useRef<PhoneInput>(null);
  const {
    languageStore,
    authStore,
  } = useStores()
  const [name, setName, ] = useState('Intro')



  return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>{name}</Text>
    //     <Button
    //       title="Go to Details"
    //       onPress={() => setName('aidin')}
    //     />
    //
    //   </View>
    //
    <Background>
      <Logo />
      <TextInput
        style={INPUT}
        onChangeText={authStore.setCodeCheck}
        value={authStore.codeCheck}
        placeholder="Enter the code here"
        keyboardType="numeric"
      />
      <Button
        mode="contained"
        onPress={() => authStore.confirmOtp()}
      >
        {t('Check')}
      </Button>
      <Button
        style={{marginBottom:220}}
        mode="outlined"
        onPress={() => NavigationService.navigate('VerifyNumber')}
      >
        {t('Resend the code')}
      </Button>

    </Background>
  );
}

export default observer(VerifyNumber)
