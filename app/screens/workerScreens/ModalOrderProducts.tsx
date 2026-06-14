import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../style';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../store';
import NavigationService from '../../router/NavigationService';
import {Button} from 'react-native-paper';
import LoadingOverlay from '../../components/LoadingOverlay';

const {width} = Dimensions.get('window');

const ModalOrderProducts = () => {
  const {authStore, workerStore} = useStores();

  useEffect(() => {
    authStore.getUser();
  }, [authStore]);

  const items = workerStore.selectedOrderProducts?.items ?? [];

  return (
    <View style={styles.view}>
      <ScrollView>
        {items.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.touchableOpacity}>
              <Image
                style={styles.image}
                source={{
                  uri: item.product.product.thumb,
                }}
                resizeMode="cover"
              />
              <View style={styles.view2}>
                <Text style={styles.text}>{item.product.product.name}</Text>

                <Text style={styles.text2}>
                  {item.product.product.price} TL
                </Text>
                {item.product.product.discount_price !== null &&
                item.product.product.discount_price !== 0 ? (
                  <Text style={styles.text3}>
                    {item.product.product.discount_price} TL
                  </Text>
                ) : null}
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder={(item.quantity ?? 0).toString()}
                  placeholderTextColor={COLORS.primary}
                  editable={false}
                  selectTextOnFocus={false}
                  value={(item.quantity ?? 0).toString()}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.view3}>
        <Text style={styles.text4}>
          Total: {workerStore.selectedOrderProducts.total} TL
        </Text>
      </View>
      <View style={styles.view4}>
        <Button
          onPress={() => {
            workerStore.adminUpdateOrderStatus(
              workerStore.selectedOrderProducts.id ?? 0,
              'accepted',
            );
            workerStore.getAdminPendingOrders();
            workerStore.getAdminRejectedOrders();
            workerStore.getAdminDeliveredOrders();
            workerStore.getAdminAcceptOrders();
            NavigationService.goBack();
          }}
          style={styles.button}
          icon="check"
          mode="contained">
          Accept
        </Button>
        <Button
          onPress={() => {
            workerStore.adminUpdateOrderStatus(
              workerStore.selectedOrderProducts.id ?? 0,
              'rejected',
            );
            workerStore.getAdminPendingOrders();
            workerStore.getAdminRejectedOrders();
            workerStore.getAdminDeliveredOrders();
            workerStore.getAdminAcceptOrders();
            NavigationService.goBack();
          }}
          style={styles.button2}
          icon="circle"
          mode="contained">
          Reject
        </Button>
        <Button
          onPress={() => {
            workerStore.adminUpdateOrderStatus(
              workerStore.selectedOrderProducts.id ?? 0,
              'delivered',
            );
            workerStore.getAdminPendingOrders();
            workerStore.getAdminRejectedOrders();
            workerStore.getAdminDeliveredOrders();
            workerStore.getAdminAcceptOrders();
            NavigationService.goBack();
          }}
          style={{}}
          icon="truck-delivery"
          mode="contained">
          Deliver
        </Button>
      </View>
      <LoadingOverlay visible={workerStore.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
  touchableOpacity: {
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    width: width,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  image: {
    flex: 0.4,
    height: 100,
    borderWidth: 0.8,
    borderColor: COLORS.border,
    width: 60,
    padding: 6,
    marginRight: 10,
  },
  view2: {flex: 0.6},
  text: {flex: 0.2, fontSize: 14, fontWeight: 'bold'},
  text2: {flex: 0.2, fontSize: 15, fontWeight: 'bold'},
  text3: {
    flex: 0.2,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  textInput: {
    margin: 12,
    borderColor: COLORS.borderInput,
    borderWidth: 2,
    padding: 10,
    color: COLORS.primaryDark,
    fontSize: 15,
    textAlign: 'center',
  },
  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 80,
  },
  text4: {
    marginBottom: 2,
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  view4: {
    flexDirection: 'row',
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignSelf: 'center',
    height: 80,
  },
  button: {backgroundColor: COLORS.success},
  button2: {backgroundColor: COLORS.danger},
});

export default observer(ModalOrderProducts);
