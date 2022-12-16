import { Alert, Text, View } from "react-native";
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

const Intro: () => Node = () =>{
  const {
    authStore,
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
  //
    <Background>
      <Logo />
      <Text>
        Welcome to all markets in Cyprus!
      </Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={authStore.phoneNumber}
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
        mode="contained"
        // onPress={() =>authStore.phoneNumber? authStore.login():alert('please Enter your Number')}
        onPress={() => OnPress()}
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
