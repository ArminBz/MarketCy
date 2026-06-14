import {
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {COLORS} from '../../style';
import React, {useRef, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {Marker} from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import NavigationService from '../../router/NavigationService';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
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
];

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const Map = () => {
  async function requestPermissions() {
    try {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
      }
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Example App',
            message: 'Example App access to your location ',
            buttonPositive: 'OK',
          },
        );
      }
    } catch (err) {
      // location permission denied or unavailable
    }
  }

  const {t} = useTranslation();

  const {categoryStore, productStore} = useStores();

  const [markers] = useState([
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
  const [animationState] = useState(new Animated.Value(0));
  const [item, setItem] = useState(0);
  const mapRef = useRef<MapView>(null);

  const requestFirebasePushNotificationPermission = async () => {
    try {
      await messaging().requestPermission();
    } catch (err) {
      // notification permission denied or unavailable
    }
  };

  useEffect(() => {
    requestFirebasePushNotificationPermission();
    categoryStore.getCategory();
  }, [categoryStore]);

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
      setRegionTimeout(
        setTimeout(() => {
          if (item !== index) {
            setItem(index);
            const {coordinate} = markers[index];
            mapRef.current?.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              },
              350,
            );
          }
        }, 10),
      );
    });
    requestPermissions();
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;
        setRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        });
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, [
    animationState,
    item,
    markers,
    region.latitudeDelta,
    region.longitudeDelta,
    regionTimeout,
  ]);
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
        loadingEnabled>
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
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 10,
    shadowColor: COLORS.black,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: -2},
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
    color: COLORS.textMuted,
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
    backgroundColor: COLORS.primary,
  },
  ring: {
    width: 19,
    height: 19,
    borderRadius: 12,
    backgroundColor: COLORS.markerRing,
    position: 'absolute',
    borderColor: COLORS.markerRingBorder,
  },
});
