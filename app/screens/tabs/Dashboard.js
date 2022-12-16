import React from 'react'
import { Dimensions, Text, View } from "react-native";
import { observer } from "mobx-react";
import { IconButton, List,TextInput } from "react-native-paper";
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import navigationService from "../../router/NavigationService";

const {
  height, width,
} = Dimensions.get('window',)

const Dashboard: () => Node = () =>{

  const {

    authStore,
    categoryStore,
    productStore
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
        mode={'outlined'}
        label={authStore.phoneNumber}
        value={text}
        onChangeText={text => setText(text)}
        disabled
        inlineImageLeft='search_icon'
      />
      </View>
      <List.Subheader style={{paddingTop:30}}>Profile</List.Subheader>
      <List.Item
        onPress={() => NavigationService.navigate('ModalUserAddress')}
        title="Set Address"
        left={() => <List.Icon color="#000" icon="home" />}
      />
      <List.Subheader style={{paddingTop:30}}>Setting</List.Subheader>
      <List.Item
        // onPress={async () => await categoryStore.getCategory()}
        title="Notification"
        left={() => <List.Icon color="#000" icon="alarm" />}
      />
      <List.Item
        onPress={() => authStore.onSignOut()}
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
