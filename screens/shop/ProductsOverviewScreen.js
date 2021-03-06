import React, { useState, useEffect, useCallback } from 'react';
import { Text, FlatList, ActivityIndicator, View, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { DrawerActions } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(productActions.fetchProducts());
      } catch(err) {
        setError(err.message);         
      }       
      setIsLoading(false); 
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {      
      loadProducts();
    },[dispatch, loadProducts]);
    
    if(error) {
      return <View style={styles.centered}>
      <Text>An error Occured</Text>    
      <Button title="Try Again" onPress={loadProducts} color={Colors.primary}/>
    </View>
    }
    
    if(isLoading) {
      return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />        
      </View>
      );
    }

    if(!isLoading && products.length === 0) {
      return (
        <View style={styles.centered}>
          <Text> No Products Found.</Text>
        </View>
      );
    }
    return <FlatList data={products} 
                    keyExtractor={item => item.id}
                    renderItem={itemData => (
                        <ProductItem 
                            image={itemData.item.imageUrl}
                            title={itemData.item.title}
                            price={itemData.item.price}
                            onViewDetail={() => {
                                props.navigation.navigate('ProductsDetail',{
                                    productId: itemData.item.id,
                                    productTitle: itemData.item.title
                                })
                            }}
                            onAddToCart={() => {
                                dispatch(cartActions.addToCart(itemData.item));
                            }}
                        />)}
    />;
}
export const screenOptions = navData => {
    return {
        headerTitle: 'All Products',
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
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  navData.navigation.navigate('Cart');
                }}
              />
            </HeaderButtons>
          ) 
    };
};

const styles = StyleSheet.create ({
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default ProductsOverviewScreen;