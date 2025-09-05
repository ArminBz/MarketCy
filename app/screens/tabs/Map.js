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
  AppRegistry,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {Marker, Circle} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import NavigationService from '../../router/NavigationService';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import {googleMapIsInstalled} from 'react-native-maps/lib/decorateMapComponent';
import {Notifications} from 'react-native-notifications';
import {Registered} from 'react-native-notifications';
import {RegistrationError} from 'react-native-notifications';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
import CustomMapStyle from '../../components/CustomMapStyle.json';

const {height, width} = Dimensions.get('window');

const Images = [
  {
    uri: 'https://lh5.googleusercontent.com/p/AF1QipMg04vC43ac_3hXuVRt0xfIEJSQdDOSTB7JdHNr=w203-h360-k-no',
  },
  {
    uri: 'https://scontent.fayt2-1.fna.fbcdn.net/v/t1.6435-9/72236174_2460502720710863_1790228216779112448_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=fRvN4Nm8_yAAX-SVeSY&_nc_ht=scontent.fayt2-1.fna&oh=00_AfAbn-Ip2MutLWair9jVN8j07qJpHqn_Ae98KnuVITrBzw&oe=63FF2CEB',
  },
  {
    uri: 'https://lh5.googleusercontent.com/p/AF1QipOG_-aiGTNqJb_GUr4N0zKFVdwoucgY8h_QUgDm=w408-h302-k-no',
  },
  {
    uri: 'data:image/jpeg;base64,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',
  },
];

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const Map: () => Node = () => {
  async function requestPermissions() {
    try {
      if (Platform.OS === 'ios') {
        const auth = Geolocation.requestAuthorization('whenInUse');
      }
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Example App',
            message: 'Example App access to your location ',
          },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const {t, i18n} = useTranslation();

  const {
    userLocationStore,
    categoryStore,
    authStore,
    productStore,
    basketStore,
  } = useStores();

  const [currentloc, setCurrentloc] = useState({
    latitude: '...',
    longitude: '...',
  });
  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: 35.28278808375736,
        longitude: 33.92319486891491,
      },
      id: 2,
      title: t('Sayılı Market (Iskele Bogaz)'),
      description: t('Located at Iskele Bogaz'),
      image: Images[0],
    },
    {
      coordinate: {
        latitude: 35.26096078233671,
        longitude: 33.90240328181233,
      },
      id: 1,
      title: t('Sayılı Market (Caesar Resort)'),
      description: t('Located at caesar resort and has variety of products'),
      image: Images[1],
    },
  ]);
  const [region, setRegion] = useState({
    latitude: 35.28278808375736,
    longitude: 33.92319486891491,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  });
  const [regionTimeout, setRegionTimeout] = useState(0);
  const [animationState, setAnimation] = useState(new Animated.Value(0));
  const [item, setItem] = useState(0);
  let mapRef = useRef();

  const requestFirebasePushNotificationPermission = async () => {
    try {
      await messaging().requestPermission();
    } catch (err) {
      console.log('requestFirebasePushNotificationPermission', err);
    }
  };

  useEffect(() => {
    requestFirebasePushNotificationPermission();
    categoryStore.getCategory();
  }, []);

  useEffect(() => {
    animationState.addListener(({value}) => {
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
          const {coordinate} = markers[index];
          mapRef.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
    requestPermissions();
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        // console.log('loc',position.coords.latitude)

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        });
        // console.log('loc',currentLatitude,currentLongitude)
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);
  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = animationState.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: 'clamp',
    });
    const opacity = animationState.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: 'clamp',
    });
    return {scale, opacity};
  });

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        showsUserLocation={true}
        initialRegion={region}
        style={styles.container}
        customMapStyle={CustomMapStyle}
        loadingEnabled
        showUserLocationButton={true}>
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
              <TouchableOpacity
                onPress={() => NavigationService.navigate('ListOfProducts')}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </TouchableOpacity>
            </Marker>
          );
        })}
      </MapView>

      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animationState,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}>
        {markers.map((marker, index) => (
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={() => {
              productStore.setIdMarkets(marker.id);
              NavigationService.navigate('ListOfProducts');

              // console.log('sssss',marker.id)
            }}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default observer(Map);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
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
    backgroundColor: '#F3F3E4',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 5,
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6200EE',
  },
  ring: {
    width: 19,
    height: 19,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderColor: 'rgba(130,4,150, 0.5)',
  },
});
