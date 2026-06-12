import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {COLORS} from '../../style';
import {observer} from 'mobx-react';
import React from 'react';
import {useStores} from '../../store';
import {Searchbar} from 'react-native-paper';

const Search = props => {
  const {productStore, categoryStore} = useStores();

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query =>
    setSearchQuery(productStore.products.find(x => x.name === query));

  const renderItemHeader = ({item}) => (
    <TouchableOpacity
      style={{borderWidth: 6, borderColor: COLORS.surfaceMuted}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: 1,
          height: 40,
          backgroundColor: COLORS.surfaceMuted,
        }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: COLORS.primary,
            borderWidth: 2,
            borderColor: COLORS.surfaceMuted,
            textAlign: 'center',
            height: 35,
            lineHeight: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{paddingBottom: 10, paddingTop: 10}}>
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

export default observer(Search);
