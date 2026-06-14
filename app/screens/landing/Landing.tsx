import React from 'react';
import {COLORS} from '../../style';
import {StyleSheet, Dimensions, Image, View} from 'react-native';

let {width, height} = Dimensions.get('window');

const Landing = () => {
  return (
    <View style={styles.view}>
      <Image
        testID="logoImage"
        style={styles.image}
        source={require('../../assets/Icon-marketing-1024x1024.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'center',
  },
});

export default Landing;
