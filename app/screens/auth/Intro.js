import {  Text, View } from "react-native";
import { observer } from "mobx-react";
import NavigationService from "../../router/NavigationService";
import React, {
  Node, useEffect, useState,useRef,
} from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import { Paragraph } from "react-native-paper";
import Button from '../../components/Button'
import PhoneInput from "react-native-phone-number-input";

import { useStores } from "../../store";
import VerifyNumber from "./VerifyNumber";

const Intro: () => Node = () =>{
  // const phoneInput = useRef<PhoneInput>(null);
  const {
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
      <Text>
        Welcome to all markets in Cyprus!
      </Text>
      <PhoneInput
        // ref={phoneInput}
        defaultValue={authStore.phoneNumber}
        defaultCode="DM"
        layout="first"
        onChangeText={authStore.setPhoneNumber}
        withDarkTheme
        withShadow
        autoFocus
      />
      <Button
        mode="contained"
        onPress={() =>authStore.phoneNumber? NavigationService.navigate('VerifyNumber'):alert('please Enter your Number')}
      >
        Send me the code!
      </Button>
      <Button
        mode="outlined"
        onPress={() => NavigationService.navigate('VerifyNumber')}
      >
        See Markets on the map!
      </Button>
    </Background>
  );
}

export default observer(Intro)
