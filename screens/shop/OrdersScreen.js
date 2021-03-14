import React, { useReducer } from 'react';
import { View,
    FlatList,
    Text,
    Platform,
    ActivityIndicator,
    StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    return (
            <FlatList data={orders}
                    keyExtractor={item => item.id}
                    renderItem={itemData => 
                      <OrderItem 
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
                      />
                      
                      }
                    />
    );
};

export const screenOptions = navData => {
    return {
      headerTitle: 'Your Orders',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    };
  };

  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default OrdersScreen;