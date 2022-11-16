import { Button, Text, View } from "react-native";
import * as React from "react";
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/FontAwesome'
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DataTable } from 'react-native-paper';
import { useStores } from "../../store";
import { List } from 'react-native-paper';
import NavigationService from "../../router/NavigationService";

const Home: () => Node = () =>{
  const {
    authStore,
  } = useStores()
  return (
    <View style={{ flex: 1, }}>

      {/*<MapView*/}

      {/*         showsUserLocation={true}*/}
      {/*>*/}
      {/*</MapView>*/}


      <List.Section>
        <List.Subheader>Markets</List.Subheader>
        <List.Item onPress={() => NavigationService.navigate('ListOfProducts')} title="caesar market" left={() => <List.Icon icon="store"  />} />
        <List.Item onPress={() => NavigationService.navigate('ListOfProducts')} title="Noyanlar market" left={() => <List.Icon icon="store" />}/>
        <List.Item onPress={() => NavigationService.navigate('ListOfProducts')} title="abdo" left={() => <List.Icon icon="store" />}/>
        <List.Item onPress={() => NavigationService.navigate('ListOfProducts')} title="golseren market" left={() => <List.Icon icon="store" />}/>
        <List.Item onPress={() => NavigationService.navigate('ListOfProducts')} title="bogaz market" left={() => <List.Icon icon="store" />} />
      </List.Section>

    </View>

  );
}

export default observer(Home)
