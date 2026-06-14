import {
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../../style';
import {observer} from 'mobx-react';
import React from 'react';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import PhoneInput from 'react-native-phone-number-input';
import {useStores} from '../../store';
import {useTranslation} from 'react-i18next';
import LoadingOverlay from '../../components/LoadingOverlay';

const {width} = Dimensions.get('window');

const Intro = () => {
  const {t, i18n} = useTranslation();

  const {authStore, languageStore} = useStores();

  const phoneInput = React.useRef(null);

  const OnPress = () => {
    if (authStore.phoneNumber.length !== 0) {
      Alert.alert('Confirm Number', authStore.phoneNumber, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            authStore.phoneNumber
              ? authStore.login()
              : Alert.alert('please Enter your Number'),
        },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.view}>
        <Logo />
        <Text style={styles.text}>{t('Enter Your Phone Number')}</Text>
        <PhoneInput
          ref={phoneInput}
          defaultCode="TR"
          layout="first"
          onChangeFormattedText={text => {
            authStore.setPhoneNumber(text);
          }}
          onChangeText={text => {
            authStore.setPhoneNumber(text);
          }}
          withShadow
          autoFocus
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => OnPress()}>
          {t('Send me the code!')}
        </Button>
      </View>
      <LoadingOverlay visible={authStore.loading} />

      <View style={styles.view2}>
        {Object.keys(languageStore.lngs).map(lng => (
          <Button
            key={lng}
            style={styles.button2}
            onPress={() => {
              i18n.changeLanguage(lng);
              languageStore.setCounter(languageStore.count + 1);
            }}>
            {languageStore.lngs[lng].nativeName}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {flexGrow: 1},
  view: {
    flex: 1,
    padding: 20,
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  text: {
    paddingBottom: 30,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {marginTop: 40, width: 240},
  view2: {
    flexDirection: 'row',
    width: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignSelf: 'center',
  },
  button2: {borderRadius: 20},
});

export default observer(Intro);
