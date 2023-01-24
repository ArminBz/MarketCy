import { Suspense } from 'react';

import * as React from 'react';
import {  View, StatusBar, Platform } from "react-native";
import App from "./app/app";
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider, MD2LightTheme } from "react-native-paper";

const MaterialLightTheme = {
  "colors": {
    "primary": "rgb(255, 170, 243)",
    "onPrimary": "rgb(91, 0, 91)",
    "primaryContainer": "rgb(129, 1, 129)",
    "onPrimaryContainer": "rgb(255, 215, 245)",
    "secondary": "rgb(218, 191, 210)",
    "onSecondary": "rgb(61, 43, 58)",
    "secondaryContainer": "rgb(85, 65, 81)",
    "onSecondaryContainer": "rgb(247, 218, 239)",
    "tertiary": "rgb(245, 184, 167)",
    "onTertiary": "rgb(76, 38, 27)",
    "tertiaryContainer": "rgb(102, 60, 47)",
    "onTertiaryContainer": "rgb(255, 219, 209)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "#FFFBFE",
    "onBackground": "rgb(233, 224, 228)",
    "surface": "rgb(30, 26, 29)",

    "surfaceVariant": "rgb(78, 68, 75)",
    "onSurfaceVariant": "rgb(209, 194, 203)",
    "outline": "rgb(154, 141, 149)",
    "outlineVariant": "rgb(78, 68, 75)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(233, 224, 228)",
    "inverseOnSurface": "rgb(52, 47, 50)",
    "inversePrimary": "rgb(158, 42, 155)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(41, 33, 40)",
      "level2": "rgb(48, 38, 46)",
      "level3": "rgb(55, 42, 53)",
      "level4": "rgb(57, 43, 55)",
      "level5": "rgb(62, 46, 59)"
    },

    "backdrop": "rgba(55, 46, 52, 0.4)"
  }}

const MarketCy: () => Node = () => {


  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor="#000000"
                 barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
                 hidden={false} />
      <PaperProvider theme={{version:2}}>
        <Suspense fallback="...is loading">
      <App/>
        </Suspense>
      </PaperProvider>
    </View>
  );
}

export default MarketCy
