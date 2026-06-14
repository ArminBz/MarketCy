import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {COLORS, purpleButton, greenButton} from '../../style';
import NavigationService from '../../router/NavigationService';
import {List, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const ModalUserAddress = () => {
  const {t} = useTranslation();

  const {userAddressStore, authStore} = useStores();

  const [, setShowAddress] = useState(false);

  const renderItem = () => <View />;

  return (
    <View style={styles.view}>
      <List.Section>
        <List.Subheader>Add Address</List.Subheader>
        <View style={styles.view2}>
          <TextInput
            placeholder={t('Add Address')}
            maxLength={40}
            onChangeText={userAddressStore.setUserAddress}
          />
        </View>
      </List.Section>
      <View>
        <FlatList data={[]} renderItem={renderItem} />
      </View>
      <View style={styles.view3}>
        <Pressable
          style={purpleButton}
          onPress={async () => {
            // alert(t("you have Entered successfully") )
            await userAddressStore.addAddresses();
            NavigationService.goBack();

            // NavigationService.goBack()
            await authStore.getUser();
            setShowAddress(true);
          }}>
          <Text style={styles.text}> {t('Add')}</Text>
        </Pressable>
        <Pressable
          style={greenButton}
          onPress={() => NavigationService.goBack()}>
          <Text style={styles.text2}>{t('Close')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
  view2: {top: 10, width: width - 40, left: 20, zIndex: 99},
  view3: {position: 'absolute', bottom: 40, left: 60, right: 60},
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
});

export default observer(ModalUserAddress);
