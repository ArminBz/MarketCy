import { Text, View, TextInput, ScrollView, ActivityIndicator } from "react-native";
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
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <View style={{flex: 1,

      paddingTop:80,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',}}>
      <Logo />
      <TextInput
        style={INPUT}
        onChangeText={authStore.setCodeCheck}
        // value={authStore.codeCheck}
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
        onPress={() =>  authStore.login()}
      >
        {t('Resend the code')}
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
    </ScrollView>
  );
}

export default observer(VerifyNumber)
