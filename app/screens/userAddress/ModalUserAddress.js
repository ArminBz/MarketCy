import {Text, View, Pressable, Dimensions, FlatList} from 'react-native';
import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import {COLORS, purpleButton, greenButton} from '../../style';
import NavigationService from '../../router/NavigationService';
import {List, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const ModalUserAddress = props => {
  const {t} = useTranslation();

  const {userAddressStore, authStore} = useStores();

  const [, setShowAddress] = useState(false);

  const renderItem = ({item}) => <View />;

  return (
    <View style={{flex: 1}}>
      <List.Section>
        <List.Subheader>Add Address</List.Subheader>
        <View style={{top: 10, width: width - 40, left: 20, zIndex: 99}}>
          <TextInput
            placeholder={t('Add Address')}
            maxLength={40}
            onChangeText={userAddressStore.setUserAddress}
          />
        </View>
      </List.Section>
      <View>
        <FlatList renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
      <View style={{position: 'absolute', bottom: 40, left: 60, right: 60}}>
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
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: COLORS.white,
            }}>
            {' '}
            {t('Add')}
          </Text>
        </Pressable>
        <Pressable
          style={greenButton}
          onPress={() => NavigationService.goBack()}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: COLORS.white,
            }}>
            {t('Close')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default observer(ModalUserAddress);
