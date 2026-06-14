import React from 'react';
import {COLORS} from '../../style';
import {StyleSheet, Dimensions, Linking, View} from 'react-native';
import {observer} from 'mobx-react';
import {List, TextInput} from 'react-native-paper';
import NavigationService from '../../router/NavigationService';
import {useStores} from '../../store';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import Background from '../../components/Background';

const {width} = Dimensions.get('window');

const Dashboard = () => {
  const {t, i18n} = useTranslation();

  const {languageStore, authStore} = useStores();

  const [text, setText] = React.useState('');

  return (
    <View style={styles.view}>
      <List.Section>
        <List.Subheader>{t('Number')}</List.Subheader>
        <View style={styles.view2}>
          <TextInput
            mode={'outlined'}
            label={authStore.phoneNumber}
            value={text}
            onChangeText={value => setText(value)}
            disabled
            inlineImageLeft="search_icon"
          />
        </View>
        <List.Subheader style={styles.subheader}>{t('Profile')}</List.Subheader>
        <List.Item
          onPress={() => NavigationService.navigate('ModalUserAddress')}
          title={t('Set Address')}
          left={() => <List.Icon color={COLORS.black} icon="home" />}
        />
        <List.Subheader style={styles.subheader2}>
          {t('Setting')}
        </List.Subheader>
        <List.Item
          onPress={() => Linking.openURL('app-settings://')}
          title={t('Notification')}
          left={() => <List.Icon color={COLORS.black} icon="alarm" />}
        />
        <List.Item
          onPress={() => authStore.onSignOut()}
          title={t('Log out')}
          left={() => <List.Icon color={COLORS.black} icon="logout" />}
        />
      </List.Section>

      <Background>
        <View style={styles.view3}>
          {Object.keys(languageStore.lngs).map(lng => (
            <Button
              key={lng}
              style={styles.button}
              onPress={() => {
                i18n.changeLanguage(lng);
                languageStore.setCounter(languageStore.count + 1);
              }}>
              {languageStore.lngs[lng].nativeName}
            </Button>
          ))}
        </View>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
  view2: {
    top: 10,
    width: width - 40,
    left: 20,
    zIndex: 99,
  },
  subheader: {paddingTop: 30},
  subheader2: {paddingTop: 30},
  view3: {
    flexDirection: 'row',
    width: width / 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {borderRadius: 20},
});

export default observer(Dashboard);
