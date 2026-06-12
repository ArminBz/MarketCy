import {
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

const ModalOrderProducts = props => {
  const {authStore, workerStore} = useStores();

  useEffect(() => {
    authStore.getUser();
  }, [authStore]);

  let items = workerStore.selectedOrderProducts?.items || null;

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {items.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                marginBottom: 10,
                marginTop: 5,
                padding: 10,
                width: width,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: COLORS.borderLight,
              }}>
              <Image
                style={{
                  flex: 0.4,
                  height: 100,
                  borderWidth: 0.8,
                  borderColor: COLORS.border,
                  width: 60,
                  padding: 6,
                  marginRight: 10,
                }}
                source={{
                  uri: item.product.product.thumb,
                }}
                resizeMode="cover"
              />
              <View style={{flex: 0.6}}>
                <Text style={{flex: 0.2, fontSize: 14, fontWeight: 'bold'}}>
                  {item.product.product.name}
                </Text>

                <Text style={{flex: 0.2, fontSize: 15, fontWeight: 'bold'}}>
                  {item.product.product.price} TL
                </Text>
                {item.product.product.discount_price !== null &&
                item.product.product.discount_price !== 0 ? (
                  <Text
                    style={{
                      flex: 0.2,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                      marginBottom: 5,
                    }}>
                    {item.product.product.discount_price} TL
                  </Text>
                ) : null}
              </View>
              <View>
                <TextInput
                  style={{
                    margin: 12,
                    borderColor: COLORS.borderInput,
                    borderWidth: 2,
                    padding: 10,
                    color: COLORS.primaryDark,
                    fontSize: 15,
                    textAlign: 'center',
                  }}
                  keyboardType="numeric"
                  placeholder={item.quantity.toString()}
                  placeholderTextColor={COLORS.primary}
                  editable={false}
                  selectTextOnFocus={false}
                  value={item.quantity}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginBottom: 80,
        }}>
        <Text
          style={{
            marginBottom: 2,
            marginTop: 20,
            fontSize: 17,
            fontWeight: 'bold',
            color: COLORS.primary,
          }}>
          Total: {workerStore.selectedOrderProducts.total} TL
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width / 3,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          flex: 1,
          alignSelf: 'center',
          height: 80,
        }}>
        <Button
          onPress={() => {
            workerStore.adminUpdateOrderStatus(
              workerStore.selectedOrderProducts.id,
              'accepted',
            );
            workerStore.getAdminPendingOrders();
            workerStore.getAdminRejectedOrders();
            workerStore.getAdminDeliveredOrders();
            workerStore.getAdminAcceptOrders();
            NavigationService.goBack();
          }}
          style={{backgroundColor: COLORS.success}}
          icon="check"
          mode="contained">
          Accept
        </Button>
        <Button
          onPress={() => {
            workerStore.adminUpdateOrderStatus(
              workerStore.selectedOrderProducts.id,
              'rejected',
            );
            workerStore.getAdminPendingOrders();
            workerStore.getAdminRejectedOrders();
            workerStore.getAdminDeliveredOrders();
            workerStore.getAdminAcceptOrders();
            NavigationService.goBack();
          }}
          style={{backgroundColor: COLORS.danger}}
          icon="circle"
          mode="contained">
          Reject
        </Button>
        <Button
          onPress={() => {
            workerStore.adminUpdateOrderStatus(
              workerStore.selectedOrderProducts.id,
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
export default observer(ModalOrderProducts);
