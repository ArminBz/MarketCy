import React from 'react';
import {COLORS} from '../../style';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import {List, TextInput} from 'react-native-paper';
import NavigationService from '../../router/NavigationService';
import {useStores} from '../../store';
import {useTranslation} from 'react-i18next';
import LoadingOverlay from '../../components/LoadingOverlay';

const {width} = Dimensions.get('window');

const Orders = () => {
  const {t} = useTranslation();

  const {authStore, workerStore} = useStores();

  const [text, setText] = React.useState('');

  return (
    <View style={{flex: 1}}>
      <List.Subheader>{t('Number')}</List.Subheader>
      <View
        style={{
          top: 10,
          width: width - 40,
          left: 20,
          zIndex: 99,
          paddingBottom: 20,
        }}>
        <TextInput
          mode={'outlined'}
          label={authStore.phoneNumber}
          value={text}
          onChangeText={text => setText(text)}
          disabled
          inlineImageLeft="search_icon"
        />
      </View>
      <ScrollView>
        <View style={{paddingTop: 10, flex: 1}}>
          {workerStore.pendingOrders.map((order, index) => {
            return (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                  marginTop: 5,
                  padding: 10,
                  width: width,
                  borderWidth: 1,
                  borderColor: COLORS.borderLight,
                }}>
                <TouchableOpacity
                  style={{width: width}}
                  onPress={() => {
                    workerStore.setSelectedOrderProducts(order);
                    NavigationService.navigate('ModalOrderProducts');
                  }}>
                  <View style={{width: width}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        width: '100%',
                      }}>
                      {order.phone}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        paddingTop: 10,
                        width: '100%',
                      }}>
                      {order.created_at}
                    </Text>
                    <Text
                      style={{
                        flex: 0.2,
                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingTop: 10,
                        width: '100%',
                      }}>
                      {order.address}
                    </Text>
                    <View style={{position: 'absolute', right: 28}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: COLORS.primary,
                        }}>
                        {order.status}
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: COLORS.primary,
                          top: 10,
                        }}>
                        {order.total} TL
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

          {workerStore.acceptedOrders.map((order, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  marginBottom: 10,
                  marginTop: 5,
                  padding: 10,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: COLORS.borderLight,
                }}>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    workerStore.setSelectedOrderProducts(order);
                    NavigationService.navigate('ModalOrderProducts');
                  }}>
                  <View style={{width: width}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        width: '100%',
                      }}>
                      {order.phone}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        paddingTop: 10,
                        width: '100%',
                      }}>
                      {order.created_at}
                    </Text>
                    <Text
                      style={{
                        flex: 0.2,
                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      {order.address}
                    </Text>
                    <View style={{position: 'absolute', right: 28}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: COLORS.success,
                        }}>
                        {order.status}
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: COLORS.success,
                          top: 10,
                        }}>
                        {order.total} TL
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <LoadingOverlay visible={workerStore.loading} />
      </ScrollView>
      <View style={{borderWidth: 10, borderColor: COLORS.dark, bottom: 0}}>
        <List.Item
          onPress={() => authStore.onSignOut()}
          title={t('Log out')}
          left={() => <List.Icon color={COLORS.black} icon="logout" />}
        />
      </View>
    </View>
  );
};
export default observer(Orders);
