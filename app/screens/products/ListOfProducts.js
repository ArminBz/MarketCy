import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, discountedPriceStyle} from '../../style';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import NavigationService from '../../router/NavigationService';
import {useStores} from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IconButton} from 'react-native-paper';
import Button from '../../components/Button';
import Background from '../../components/Background';
import {useTranslation} from 'react-i18next';
import {Searchbar} from 'react-native-paper';
import LoadingOverlay from '../../components/LoadingOverlay';

const {width} = Dimensions.get('window');

const ListOfProducts = () => {
  const {t} = useTranslation();

  const {productStore, categoryStore, basketStore} = useStores();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    basketStore.getBasket();
    productStore.setProduct([]);
    productStore.setPage(1);
    productStore.getProducts(productStore.idMarkets, null, null, null, null);
  }, [basketStore, productStore]);

  const renderItemHeader = ({item}) => (
    <TouchableOpacity
      style={{borderWidth: 6, borderColor: COLORS.surfaceMuted}}
      onPress={async () => {
        productStore.setProduct([]);
        await productStore.getProducts(
          productStore.idMarkets,
          item.id,
          null,
          null,
          null,
        );
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: 8,
          height: 60,
          width: 140,
          backgroundColor: COLORS.primary,
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS.white,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    let name = item?.product?.name || null;
    let thumb = item?.product?.thumb || null;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginBottom: 15,
          marginTop: 1,
          padding: 10,
          width: width,
          borderWidth: 0.8,
          borderColor: COLORS.border,
          backgroundColor: COLORS.white,
        }}
        onPress={() => {
          productStore.setSelectedProducts(item);
          NavigationService.navigate('ModalEachProduct');
        }}>
        <Image
          style={{
            height: 150,
            width: 150,
            marginBottom: 7,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
          }}
          source={{
            uri: thumb,
          }}
          resizeMode="cover"
        />

        <Text
          style={{
            flex: 0.2,
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          {name}
        </Text>
        <Text
          style={{
            flex: 0.2,
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 5,
            ...discountedPriceStyle(
              item.discount_price !== null && item.discount_price !== 0,
            ),
          }}>
          {item.price} TL
        </Text>
        {item.discount_price !== null && item.discount_price !== 0 ? (
          <Text
            style={{
              flex: 0.2,
              fontSize: 15,
              fontWeight: 'bold',
              color: COLORS.primary,
              marginBottom: 5,
            }}>
            {item.discount_price} TL
          </Text>
        ) : null}

        <View
          style={{
            borderRadius: 10,
            width: 30,
            height: 30,
            marginLeft: 'auto',
            marginRight: 0,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Icon
            style={{textAlign: 'center'}}
            name="plus"
            size={15}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingBottom: 1}}>
        <FlatList
          data={categoryStore.categories}
          renderItem={renderItemHeader}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <TouchableOpacity
              style={{borderWidth: 6, borderColor: COLORS.surfaceMuted}}
              onPress={async () => {
                productStore.setProduct([]);
                productStore.setPage(1);
                productStore.getProducts(
                  productStore.idMarkets,
                  null,
                  null,
                  null,
                  null,
                );
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  borderRadius: 8,
                  height: 60,
                  width: 140,
                  backgroundColor: COLORS.primary,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: COLORS.white,
                    textAlign: 'center',
                    lineHeight: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  All
                </Text>
              </View>
            </TouchableOpacity>
          }
          horizontal={true}
          onEndReachedThreshold={0.1}
          onEndReached={async () => {
            if (categoryStore.flatListOnReachEnd) {
              categoryStore.setOnEndReachedLoading(true);
              categoryStore.setPage(categoryStore.page + 1);
              categoryStore.getCategory();
            }
          }}
          ListFooterComponent={() => {
            if (categoryStore.onEndReachedLoading) {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator color={COLORS.primary} />
                </View>
              );
            } else {
              return <View />;
            }
          }}
          showsVerticalScrollIndicator={false}
        />
        <View style={{paddingBottom: 10, paddingTop: 10}}>
          <Searchbar
            placeholder="Search Products"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onIconPress={async () => {
              productStore.setProduct([]);
              await productStore.getProducts(1, null, searchQuery, null);
            }}
          />
        </View>
      </View>
      {productStore.product.length !== 0 ? (
        <FlatList
          data={productStore.product.slice()}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.1}
          onEndReached={async () => {
            if (productStore.flatListOnReachEnd) {
              productStore.onEndReachedLoading = true;
              productStore.setPage(productStore.page + 1);
              productStore.getProducts(
                productStore.idMarkets,
                null,
                null,
                null,
                productStore.page,
              );
            }
          }}
          ListFooterComponent={() => {
            if (productStore.onEndReachedLoading) {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator color={COLORS.primary} />
                </View>
              );
            } else {
              return <View />;
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Background>
          <IconButton
            icon="database-lock"
            iconColor={COLORS.primary}
            size={120}
            onPress={() => NavigationService.navigate('Basket')}
          />

          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            {t('There is no product in this category!')}
          </Text>
          <Button
            onPress={() => NavigationService.navigate('ListOfProducts')}
            mode="outlined">
            {t('Products')}
          </Button>
        </Background>
      )}
      <LoadingOverlay visible={productStore.loading} />
    </View>
  );
};

export default observer(ListOfProducts);
