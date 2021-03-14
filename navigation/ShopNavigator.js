import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerItemList
  } from '@react-navigation/drawer';
//import OrdersScreen from '../screens/shop/OrdersScreen';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import  Colors  from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProductsOverviewScreen, { screenOptions as ProductsOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as ProductsDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import { useDispatch } from 'react-redux';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen 
                name="ProductsOverview" 
                component={ProductsOverviewScreen}
                options={ProductsOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="ProductsDetail" 
                component={ProductDetailScreen}
                options={ProductsDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={cartScreenOptions}
            />
    </ProductsStackNavigator.Navigator>
    );
}

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen name="Orders"
        component={OrdersScreen} 
        options={ordersScreenOptions}/>
    </OrdersStackNavigator.Navigator>
    );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={props => {
                return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList {...props} />
                    <Button
                        title="Logout"
                        color={Colors.primary}
                        onPress={() => {
                        //dispatch(authActions.logout());
                        // props.navigation.navigate('Auth');
                        }}
                    />
                    </SafeAreaView>
                </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}
        >
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                drawerIcon: props => (
                    <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={props.color}
                    />
                )
                }}
            />            
        </ShopDrawerNavigator.Navigator>
    );
};