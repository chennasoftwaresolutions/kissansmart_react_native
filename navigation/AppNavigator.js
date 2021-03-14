import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ProductsNavigator, OrdersNavigator }  from './ShopNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const AppNavigator = props => {
    return (<NavigationContainer>
              <Drawer.Navigator initialRouteName="Products">
                <Drawer.Screen name="Products" component={ProductsNavigator} 
                    options={{
                        drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={Colors.primary}
                        />
                        )
                    }}
                />
                <Drawer.Screen name="Orders" component={OrdersNavigator} 
                    options={{
                        drawerIcon: props => (
                          <Ionicons
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                            size={23}
                            color={Colors.primary}
                          />
                        )
                      }}
                />
            </Drawer.Navigator>
    </NavigationContainer>    
    );
};
const Drawer = createDrawerNavigator();
export default AppNavigator;