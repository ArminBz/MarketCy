import React from 'react';
import {
  Dimensions, Image,
  View,
} from 'react-native';

let {
  width, height,
} = Dimensions.get('window');

const Landing = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#6200EE',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%'
    }}>
      <Image
        testID="logoImage"
        style={{
          width: width,
          height: height,
          resizeMode: 'center'
        }}
        source={require('../../assets/Icon-marketing-1024x1024.png')}
      />
    </View>
  );
};

export default Landing;
