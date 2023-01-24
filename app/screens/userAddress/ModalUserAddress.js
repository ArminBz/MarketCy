import { Text, View, SafeAreaView, Pressable, Dimensions, Image,  FlatList } from "react-native";
import React, {
   useEffect, useState,useRef,
} from 'react'
import { observer } from "mobx-react";

import { useStores } from "../../store";
import { purpleButton,greenButton } from '../../style'
import NumericInput from 'react-native-numeric-input'
// import subheading from "react-native-paper/src/components/Typography/Subheading";
import NavigationService from "../../router/NavigationService";
import { List,TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
const {
  height, width,
} = Dimensions.get('window',)

// const showAddressList = () => {
//   return (
//
//
//   )
// }

const ModalUserAddress=(props) =>{
  const { t, i18n } = useTranslation();

  const {
    userAddressStore,
    authStore,
  } = useStores()

  // useEffect(()=>{
  //
  // }, [],)

  const [showAddress, setShowAddress, ] = useState(false)

  const renderItem = ({item}) =>(

    <View>

    </View>
  );


  let name = props?.route?.params?.name || null
  return (

    <View style={{ flex: 1}}>
      <List.Section>

        <List.Subheader>Add Address</List.Subheader>
<View style={{top: 10,
  width: width - 40,
  left: 20,
  zIndex: 99,}}>
      <TextInput

        placeholder={t("Add Address")}
        maxLength={40}
        value={userAddressStore.userAddress}
        onChangeText={userAddressStore.setUserAddress}
      />
</View>
      </List.Section>
      <View>
        <FlatList

          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        >
        </FlatList>
      </View>
<View style={{position: 'absolute',
  bottom:40,
  left:60,right:60}}>
      <Pressable style={purpleButton}
                 onPress={async () => {
                   // alert(t("you have Entered successfully") )
                  await userAddressStore.addAddresses()
                   // NavigationService.goBack()
                  await authStore.getUser()
                   setShowAddress(true)
                 }}

      >
        <Text style={{ fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white', }}> {t('Add')}</Text>
      </Pressable>
      <Pressable style={greenButton} onPress={() => NavigationService.goBack()}>
        <Text style={{ fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white', }}>{t('Close')}</Text>
      </Pressable>
</View>
    </View>

  )
}
export default observer(ModalUserAddress)
