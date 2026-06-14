import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../style';

// Full-screen translucent loading spinner shown while a request is in flight.
export default function LoadingOverlay({visible}: {visible: boolean}) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
