import {
  Alert,
  Animated,
  Button,
  Dimensions,
  Keyboard,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  AppRegistry, TouchableOpacity,
} from "react-native";
import React, {useRef, useEffect,useState} from 'react';
import { observer } from "mobx-react";
import { useStores } from "../../store";
import MapView, {Marker, Circle} from 'react-native-maps';
import NavigationService from "../../router/NavigationService";
import Geolocation, { getCurrentPosition } from "react-native-geolocation-service";
import { googleMapIsInstalled } from "react-native-maps/lib/decorateMapComponent";
import { Notifications } from "react-native-notifications";
import { Registered } from "react-native-notifications";
import { RegistrationError } from "react-native-notifications";
import messaging, { firebase } from "@react-native-firebase/messaging";

// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


// const customStyle = [
//   {
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#242f3e',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#746855',
//       },
//     ],
//   },
//   {
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#242f3e',
//       },
//     ],
//   },
//   {
//     featureType: 'administrative.locality',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#F6F6F6',
//       },
//     ],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#d59563',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#263c3f',
//       },
//     ],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#6b9a76',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#38414e',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#212a37',
//       },
//     ],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#9ca5b3',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#746855',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [
//       {
//         color: '#1f2835',
//       },
//     ],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#f3d19c',
//       },
//     ],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#2f3948',
//       },
//     ],
//   },
//   {
//     featureType: 'transit.station',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#d59563',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [
//       {
//         color: '#17263c',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [
//       {
//         color: '#515c6d',
//       },
//     ],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.stroke',
//     stylers: [
//       {
//         color: '#17263c',
//       },
//     ],
//   },
// ];

const {
  height, width,
} = Dimensions.get('window',)



const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


const Map: () => Node = () =>{



  const {
    userLocationStore,
    categoryStore,
    authStore,
  } = useStores()


  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: 35.27917321575899,
        longitude: 33.896278512958624,
      },
      title: "Unimar Market",
      description: "Located at Iskele",
    },
    {
      coordinate: {
        latitude: 35.26096078233671,
        longitude: 33.90240328181233,
      },
      title: "Caesar Market",
      description: "Located at caesar resort and has variety of products",
    },
    {
      coordinate: {
        latitude: 35.256088142310205,
        longitude: 33.904544485000386,
      },
      title: "Noyanlar Market",
      description: "open till midnight",
    },
    {
      coordinate: {
        latitude: 35.25367501019976,
        longitude: 33.899871788483615,
      },
      title: "RoyalSun Market",
      description: "Located at royalsun",
    },
  ]);
  const [region, setRegion] = useState({
    latitude: 35.261090828339285,
    longitude: 33.903074668781095,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  });
  const [regionTimeout, setRegionTimeout] = useState(0);
  const [animationState,setAnimation]=useState(new Animated.Value(0));
  const [item,setItem]=useState(0);
  let mapRef = useRef();

  const requestFirebasePushNotificationPermission = async () => {
    try {
      await messaging().requestPermission()
    } catch (err) {
      console.log('requestFirebasePushNotificationPermission', err)
    }
  }

  useEffect(()=>{
    requestFirebasePushNotificationPermission()
    categoryStore.getCategory()
  }, [],)

  useEffect(()=>{

    animationState.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);

      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      setRegionTimeout(() => {
        if (item !== index) {
          setItem(index);
          const { coordinate } = markers[index];
          mapRef.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });


    Geolocation.getCurrentPosition(
      position => {
        userLocationStore.setLatitude(position.coords.latitude)
        userLocationStore.setLongitude(position.coords.longitude)
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  },[])
  const interpolations =markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = animationState.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });
    const opacity = animationState.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });
    return { scale, opacity };
  });


  return (
    <View style={{ flex: 1}}>


      <MapView
        ref={mapRef}
        showsUserLocation={true}
        initialRegion={region}
        style={styles.container}
        // annotations={markers}
      >
        {markers.map((marker, index) => {

          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const opacityStyle = {
            opacity: interpolations[index].opacity,
          };
          return (
            <Marker key={index} coordinate={marker.coordinate}>
              <TouchableOpacity onPress={() => NavigationService.navigate('ListOfProducts')}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]}/>
                  <View style={styles.marker} />
                </Animated.View>
              </TouchableOpacity>
            </Marker>

          );
        })}
        <Marker
          coordinate={{
            latitude: userLocationStore.latitude,
            longitude: userLocationStore.longitude,
          }}>
        </Marker>

      </MapView>






    </View>

  );
}

export default observer(Map)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#F3F3E4",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius:5
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6200EE",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
