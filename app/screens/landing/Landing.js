import React from 'react'
import {
  Dimensions, Image,
  View,
} from 'react-native'


let {
  width, height,
} = Dimensions.get('window',)

const Landing: () => Node = () => {

  return (<View style={{ flex: 1,backgroundColor:'#4E00BE' }}>
    <Image
      testID="logoImage"
      style={{
        width: width, height: height
      }}
      source={require('../../assets/logo-for-grocery-store-vector-21609818.jpeg',)}
    />
  </View>)
}

export default Landing
