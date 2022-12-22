import React from 'react'
import { Image, StyleSheet, View } from "react-native";

export default function Logo() {
  return (
    <Image source={require('../assets/CYMARKET.jpg')} style={styles.image} />
 )
}

const styles = StyleSheet.create({
  image: {
    width: 260,
    height: 250,
    marginBottom: 40,
    borderRadius:15

  },
})
