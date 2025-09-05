import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Dimensions,
  Animated
} from "react-native";
import { observer } from "mobx-react";
import React from 'react';
import NavigationService from "../../router/NavigationService";
import { useStores } from "../../store";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

const {
  height, width,
} = Dimensions.get('window');

const Search = (props) => {
  const {
    productStore,
    categoryStore,
  } = useStores();

  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(productStore.products.find(x => x.name === query));

  const renderItemHeader = ({ item }) => (
    <TouchableOpacity style={{ borderWidth: 6, borderColor: '#F2F2F2' }}>
      <View style={{ borderWidth: 1, borderColor: '#C6C6C6', borderRadius: 1, height: 40, backgroundColor: '#F2F2F2' }}>
        <Text style={{
          fontSize: 13,
          fontWeight: 'bold',
          color: '#6200EE',
          borderWidth: 2,
          borderColor: '#F2F2F2',
          textAlign: 'center',
          height: 35,
          lineHeight: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingBottom: 10, paddingTop: 10 }}>
        <Searchbar
          placeholder="Search Products"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={{}}>
        <FlatList
          data={categoryStore.categories}
          renderItem={renderItemHeader}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 10,
    width: width - 40,
    left: 20,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
  }
});

export default observer(Search);
