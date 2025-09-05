import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react';
import {IconButton, List, TextInput} from 'react-native-paper';
import NavigationService from '../../router/NavigationService';
import {useStores} from '../../store';
import {useTranslation} from 'react-i18next';

const {height, width} = Dimensions.get('window');

const Orders: () => Node = () => {
  const {t, i18n} = useTranslation();

  const {languageStore, authStore, workerStore, productStore} = useStores();

  const [text, setText] = React.useState('');

  const renderPendingItem = ({item}) => {
    return (
      <ScrollView
        style={{
          flex: 1,
          marginBottom: 10,
          marginTop: 5,
          padding: 10,
          width: width,
          borderWidth: 1,
          borderColor: '#E2E2E2',
        }}>
        <TouchableOpacity
          onPress={() => {
            workerStore.setSelectedOrderProducts(item);
            NavigationService.navigate('ModalOrderProducts');
          }}>
          <View style={{flex: 1}}>
            <List.Icon
              color="#6200EE"
              icon="phone"
              style={{position: 'absolute', left: -12, bottom: 38}}
            />
            {/*<Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold' }}>{price}</Text>*/}
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                paddingLeft: 30,
              }}>
              {item.phone}
            </Text>
            <List.Icon
              color="#6200EE"
              icon="update"
              style={{position: 'absolute', left: -12, top: 10}}
            />
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',

                paddingLeft: 30,
                paddingTop: 10,
              }}>
              {item.created_at}
            </Text>
            <List.Icon
              color="#6200EE"
              icon="location-enter"
              style={{position: 'absolute', left: -11, top: 37}}
            />
            <Text
              style={{
                flex: 0.2,
                fontSize: 14,
                fontWeight: 'bold',
                paddingLeft: 30,
                paddingTop: 10,
              }}>
              {item.address}
            </Text>
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                color: '#6200EE',
                position: 'absolute',
                left: 340,
              }}>
              {item.status}
            </Text>
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                color: '#6200EE',
                position: 'absolute',
                left: 340,
                top: 30,
              }}>
              {item.total} TL
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderAcceptedItem = ({item}) => {
    return (
      <ScrollView
        style={{
          flex: 1,
          marginBottom: 10,
          marginTop: 5,
          padding: 10,
          width: width,

          borderWidth: 1,
          borderColor: '#E2E2E2',
        }}>
        <TouchableOpacity
          onPress={() => {
            workerStore.setSelectedOrderProducts(item);
            NavigationService.navigate('ModalOrderProducts');
          }}>
          <View style={{flex: 1}}>
            <List.Icon
              color="#6200EE"
              icon="phone"
              style={{position: 'absolute', left: -12, bottom: 38}}
            />
            {/*<Text style={{ flex: 0.2, fontSize: 15, fontWeight: 'bold' }}>{price}</Text>*/}
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                paddingLeft: 30,
              }}>
              {item.phone}
            </Text>
            <List.Icon
              color="#6200EE"
              icon="update"
              style={{position: 'absolute', left: -12, top: 10}}
            />
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',

                paddingLeft: 30,
                paddingTop: 10,
              }}>
              {item.created_at}
            </Text>
            <List.Icon
              color="#6200EE"
              icon="location-enter"
              style={{position: 'absolute', left: -11, top: 37}}
            />
            <Text
              style={{
                flex: 0.2,
                fontSize: 14,
                fontWeight: 'bold',
                paddingLeft: 30,
                paddingTop: 10,
              }}>
              {item.address}
            </Text>
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'green',
                position: 'absolute',
                left: 340,
              }}>
              {item.status}
            </Text>
            <Text
              style={{
                flex: 0.2,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'green',
                position: 'absolute',
                left: 340,
                top: 30,
              }}>
              {item.total} TL
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

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
          {/*<List.Subheader style={{paddingTop:30,color:'#6200EE'}}>{t('Pending Orders')}</List.Subheader>*/}
          {/*<List.Item*/}
          {/*  onPress={() => authStore.onSignOut()}*/}
          {/*  title={t("Pending")}*/}
          {/*  left={() => <List.Icon color="#000" icon="logout" />}*/}
          {/*/>*/}
          {/*<View style={{paddingTop:10}}>*/}
          {/*<FlatList*/}
          {/*  data={workerStore.pendingOrders}*/}
          {/*  renderItem={renderPendingItem}*/}
          {/*  keyExtractor={item => item.id}*/}
          {/*  />*/}
          {/*</View>*/}
          {Object.keys(workerStore.pendingOrders).map(item => {
            // console.log('sasa',workerStore.pendingOrders[item])
            return (
              <View
                key={item}
                style={{
                  marginBottom: 10,
                  marginTop: 5,
                  padding: 10,
                  width: width,
                  borderWidth: 1,
                  borderColor: '#E2E2E2',
                }}>
                <TouchableOpacity
                  style={{width: width}}
                  onPress={() => {
                    workerStore.setSelectedOrderProducts(
                      workerStore.pendingOrders[item],
                    );
                    NavigationService.navigate('ModalOrderProducts');
                  }}>
                  <View style={{width: width}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        width: '100%',
                      }}>
                      {workerStore.pendingOrders[item].phone}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        paddingTop: 10,
                        width: '100%',
                      }}>
                      {workerStore.pendingOrders[item].created_at}
                    </Text>
                    <Text
                      style={{
                        flex: 0.2,
                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingTop: 10,
                        width: '100%',
                      }}>
                      {workerStore.pendingOrders[item].address}
                    </Text>
                    <View style={{position: 'absolute', right: 28}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#6200EE',
                        }}>
                        {workerStore.pendingOrders[item].status}
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#6200EE',
                          top: 10,
                        }}>
                        {workerStore.pendingOrders[item].total} TL
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

          {Object.keys(workerStore.acceptedOrders).map(item => {
            return (
              <View
                key={item}
                style={{
                  flex: 1,
                  marginBottom: 10,
                  marginTop: 5,
                  padding: 10,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#E2E2E2',
                }}>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    workerStore.setSelectedOrderProducts(
                      workerStore.acceptedOrders[item],
                    );
                    NavigationService.navigate('ModalOrderProducts');
                  }}>
                  <View style={{width: width}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        width: '100%',
                      }}>
                      {workerStore.acceptedOrders[item].phone}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        paddingTop: 10,
                        width: '100%',
                      }}>
                      {workerStore.acceptedOrders[item].created_at}
                    </Text>
                    <Text
                      style={{
                        flex: 0.2,
                        fontSize: 14,
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      {workerStore.acceptedOrders[item].address}
                    </Text>
                    <View style={{position: 'absolute', right: 28}}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'green',
                        }}>
                        {workerStore.acceptedOrders[item].status}
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'green',
                          top: 10,
                        }}>
                        {workerStore.acceptedOrders[item].total} TL
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {workerStore.loading ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#6200EE" />
          </View>
        ) : null}
      </ScrollView>
      <View style={{borderWidth: 10, borderColor: '#30262E', bottom: 0}}>
        <List.Item
          onPress={() => authStore.onSignOut()}
          title={t('Log out')}
          left={() => <List.Icon color="#000" icon="logout" />}
        />
      </View>
    </View>
  );
};
export default observer(Orders);
