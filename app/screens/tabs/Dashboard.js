import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { Dimensions, Text, View } from "react-native";
import { observer } from "mobx-react";
import { IconButton, List,Colors,TextInput } from "react-native-paper";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import navigationService from "../../router/NavigationService";

const {
  height, width,
} = Dimensions.get('window',)

const Dashboard: () => Node = () =>{

  const {

    authStore,
  } = useStores()

  const [text, setText] = React.useState("");
  return (
    <List.Section>

      <List.Subheader>Number</List.Subheader>
      <View style={{top: 10,
        width: width - 40,
        left: 20,
        zIndex: 99,}}>
      <TextInput
        mode={'flat'}
        label={authStore.phoneNumber}
        value={text}
        onChangeText={text => setText(text)}
        disabled
        style={{borderWidth: 1,
          padding: 12,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 60,
          borderColor: '#888888',
          fontSize: 18,
          height: 50,
        }}

      />
      </View>
      <List.Subheader style={{paddingTop:30}}>Profile</List.Subheader>
      <List.Item
        onPress={() => NavigationService.navigate('UserAddress')}
        title="Set Address"
        left={() => <List.Icon color="#000" icon="home" />}
      />
      <List.Subheader style={{paddingTop:30}}>Setting</List.Subheader>
      <List.Item
        title="Notification"
        left={() => <List.Icon color="#000" icon="alarm" />}
      />
      <List.Item
        onPress={() => navigationService.goBack()}
        title="Log out"
        left={() => <List.Icon color="#000" icon="logout" />}
      />
    </List.Section>


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
export default observer(Dashboard)
