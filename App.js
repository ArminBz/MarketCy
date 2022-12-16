
import * as React from 'react';
import {  View, StatusBar, Platform } from "react-native";
import App from "./app/app";
import { Provider as PaperProvider } from 'react-native-paper';



const MarketCy: () => Node = () => {



  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor="#000000"
                 barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
                 hidden={false} />
      <PaperProvider theme={{ version: 2 }}>
      <App/>
      </PaperProvider>
    </View>
  );
}

export default MarketCy
