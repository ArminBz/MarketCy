import React from 'react';
import {COLORS} from '../../style';
import {
  StyleSheet,
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
    <View style={styles.view}>
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
      <ScrollView>
        <View style={styles.view3}>
          {workerStore.pendingOrders.map((order, index) => {
            return (
              <View key={index} style={styles.view4}>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => {
                    workerStore.setSelectedOrderProducts(order);
                    NavigationService.navigate('ModalOrderProducts');
                  }}>
                  <View style={styles.view5}>
                    <Text style={styles.text}>{order.phone}</Text>
                    <Text style={styles.text2}>{order.created_at}</Text>
                    <Text style={styles.text3}>{order.address}</Text>
                    <View style={styles.view6}>
                      <Text style={styles.text4}>{order.status}</Text>

                      <Text style={styles.text5}>{order.total} TL</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

          {workerStore.acceptedOrders.map((order, index) => {
            return (
              <View key={index} style={styles.view7}>
                <TouchableOpacity
                  style={styles.touchableOpacity2}
                  onPress={() => {
                    workerStore.setSelectedOrderProducts(order);
                    NavigationService.navigate('ModalOrderProducts');
                  }}>
                  <View style={styles.view8}>
                    <Text style={styles.text6}>{order.phone}</Text>
                    <Text style={styles.text7}>{order.created_at}</Text>
                    <Text style={styles.text8}>{order.address}</Text>
                    <View style={styles.view9}>
                      <Text style={styles.text9}>{order.status}</Text>

                      <Text style={styles.text10}>{order.total} TL</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <LoadingOverlay visible={workerStore.loading} />
      </ScrollView>
      <View style={styles.view10}>
        <List.Item
          onPress={() => authStore.onSignOut()}
          title={t('Log out')}
          left={() => <List.Icon color={COLORS.black} icon="logout" />}
        />
      </View>
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
    paddingBottom: 20,
  },
  view3: {paddingTop: 10, flex: 1},
  view4: {
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    width: width,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  touchableOpacity: {width: width},
  view5: {width: width},
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    width: '100%',
  },
  text3: {
    flex: 0.2,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    width: '100%',
  },
  view6: {position: 'absolute', right: 28},
  text4: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  text5: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
    top: 10,
  },
  view7: {
    flex: 1,
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  touchableOpacity2: {width: '100%'},
  view8: {width: width},
  text6: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
  },
  text7: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    width: '100%',
  },
  text8: {
    flex: 0.2,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  view9: {position: 'absolute', right: 28},
  text9: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  text10: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.success,
    top: 10,
  },
  view10: {borderWidth: 10, borderColor: COLORS.dark, bottom: 0},
});

export default observer(Orders);
