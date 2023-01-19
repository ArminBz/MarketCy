import { Suspense } from 'react';

import * as React from 'react';
import {  View, StatusBar, Platform } from "react-native";
import App from "./app/app";
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider, MD2LightTheme } from "react-native-paper";

const MaterialLightTheme = {
  ...MD2LightTheme,
  "colors": {
    "primary": "#6200EE",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(211, 228, 255)",
    "onPrimaryContainer": "rgb(0, 28, 56)",
    "secondary": "rgb(84, 95, 112)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(215, 227, 248)",
    "onSecondaryContainer": "rgb(16, 28, 43)",
    "tertiary": "rgb(108, 86, 119)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(244, 217, 255)",
    "onTertiaryContainer": "rgb(38, 20, 49)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(253, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(223, 226, 235)",
    "onSurfaceVariant": "rgb(67, 71, 78)",
    "outline": "rgb(115, 119, 127)",
    "outlineVariant": "rgb(195, 198, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(241, 240, 244)",
    "inversePrimary": "rgb(161, 201, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(241, 244, 250)",
      "level2": "rgb(234, 240, 248)",
      "level3": "rgb(227, 235, 245)",
      "level4": "rgb(225, 233, 244)",
      "level5": "rgb(220, 230, 242)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(44, 49, 55, 0.4)",
    "customHeader": "rgb(255, 255, 255)"
  }
};

const MarketCy: () => Node = () => {


  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor="#000000"
                 barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
                 hidden={false} />
      <PaperProvider theme={MaterialLightTheme}>
        <Suspense fallback="...is loading">
      <App/>
        </Suspense>
      </PaperProvider>
    </View>
  );
}

export default MarketCy
