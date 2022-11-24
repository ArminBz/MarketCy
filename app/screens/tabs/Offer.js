import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Button from '../../components/Button'
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { observer } from "mobx-react";
import NavigationService from "../../router/NavigationService";
import NumericInput from "react-native-numeric-input";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStores } from "../../store";


const {
  height, width,
} = Dimensions.get('window',)

const Offer: () => Node = () =>{
  const {
    offerStore,
  } = useStores()


  const renderItem = ({item}) =>(
    <ScrollView>

      <TouchableOpacity style={{
        flex: 1,
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        width: width,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E2E2E2'
      }} onPress={() => {

      }}>

        <Image style={{
          flex:1,
          height: 150,
          borderWidth: 0.8,
          borderColor: '#C6C6C6',
          width: 80,
          padding: 6,
          marginRight: 10
        }}
               source={{
                 uri: item.image,
               }}
               resizeMode="cover"
        />
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={{flex:1}}>
      <FlatList
        extraData={offerStore.offer}
        data={offerStore.offer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    </View>
  )
}
export default observer(Offer)
