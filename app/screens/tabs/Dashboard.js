import React from 'react'
import { Dimensions, Linking, Text, View } from "react-native";
import { observer } from "mobx-react";
import { IconButton, List,TextInput } from "react-native-paper";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import navigationService from "../../router/NavigationService";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import Background from "../../components/Background";

const {
  height, width,
} = Dimensions.get('window',)

const Dashboard: () => Node = () =>{
  const { t, i18n } = useTranslation();

  const {
    languageStore,
    authStore,
    categoryStore,
    productStore
  } = useStores()

  const [text, setText] = React.useState("");
  return (
    <View style={{flex:1}}>
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
      <List.Subheader style={{paddingTop:30}}>{t('Profile')}</List.Subheader>
      <List.Item
        onPress={() => NavigationService.navigate('ModalUserAddress')}
        title={t("Set Address")}
        left={() => <List.Icon color="#000" icon="home" />}
      />
      <List.Subheader style={{paddingTop:30}}>{t('Setting')}</List.Subheader>
      <List.Item
        onPress={ () => Linking.openURL('app-settings://')}
        title={t("Notification")}
        left={() => <List.Icon color="#000" icon="alarm" />}
      />
      <List.Item
        onPress={() => authStore.onSignOut()}
        title={t("Log out")}
        left={() => <List.Icon color="#000" icon="logout" />}
      />
    </List.Section>

      <Background>
  <View  style={{flexDirection: 'row',width:105,justifyContent: 'center', alignItems: 'center',position: 'absolute',bottom: 0}}>
    {Object.keys(languageStore.lngs).map((lng) => (
      <Button  key={lng} style={{borderRadius:20,fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} onPress={() => {
        i18n.changeLanguage(lng);
        languageStore.setCounter(languageStore.count + 1);
      }}>
        {languageStore.lngs[lng].nativeName}
      </Button>
    ))}
  </View>
    </Background>
    </View>
  )
}
export default observer(Dashboard)
