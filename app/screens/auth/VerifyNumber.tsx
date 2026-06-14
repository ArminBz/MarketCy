import {StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import React from 'react';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import {COLORS} from '../../style';
import {useStores} from '../../store';
import {useTranslation} from 'react-i18next';
import LoadingOverlay from '../../components/LoadingOverlay';

const VerifyNumber = () => {
  const {t} = useTranslation();

  const {authStore} = useStores();

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.view}>
        <Logo />
        <TextInput
          style={styles.textInput}
          onChangeText={authStore.setCodeCheck}
          // value={authStore.codeCheck}
          placeholder="Enter the code here"
          keyboardType="numeric"
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => authStore.confirmOtp()}>
          {t('Check')}
        </Button>

        <Button
          style={styles.button2}
          mode="outlined"
          onPress={() => authStore.login()}>
          {t('Resend the code')}
        </Button>
      </View>
      <LoadingOverlay visible={authStore.loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {flexGrow: 1},
  view: {
    flex: 1,
    paddingTop: 80,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: COLORS.primaryDark,
  },
  button: {width: 240},
  button2: {marginBottom: 220, width: 240},
});

export default observer(VerifyNumber);
