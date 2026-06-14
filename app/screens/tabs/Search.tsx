import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';
import {COLORS} from '../../style';
import {observer} from 'mobx-react';
import React from 'react';
import {useStores} from '../../store';
import {Searchbar} from 'react-native-paper';
import type {Category} from '../../types';

const Search = () => {
  const {categoryStore} = useStores();

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const renderItemHeader = ({item}: {item: Category}) => (
    <TouchableOpacity style={styles.touchableOpacity}>
      <View style={styles.view}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.view2}>
      <View style={styles.view3}>
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
  touchableOpacity: {borderWidth: 6, borderColor: COLORS.surfaceMuted},
  view: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 1,
    height: 40,
    backgroundColor: COLORS.surfaceMuted,
  },
  text: {
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
  },
  view2: {flex: 1},
  view3: {paddingBottom: 10, paddingTop: 10},
});

export default observer(Search);
