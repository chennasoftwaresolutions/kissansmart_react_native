import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.
                                                    availableProducts.
                                             find(product => product.id === productId));
    const dispatch = useDispatch();                                        
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}></Image>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }}></Button>
            </View>
            <Text style={styles.price}>Rs.{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

         
    );
};

/*ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}*/
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 380
        
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    actions:{
        marginVertical: 10,
        alignItems: 'center'
    }
});
export const screenOptions = {
        headerTitle: 'Product Detail'//navData.navigation'Product Detail'
};

export default ProductDetailScreen;