import React from 'react';
import { Text, FlatList, View, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state=> {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();
    const orderSubmitHandler = () => {
        Alert.alert('Are you sure?', 'Do you want to submit the cart?',[
            {
                text: 'Yes', 
                style: 'default',
                onPress: () => {
                    dispatch(
                        ordersActions.addOrder(
                            cartItems,
                            cartTotalAmount
                        )
                    )
                }
            },
            {
                text: 'No', 
                style: 'cancel',            
            }
        ]);
    }
    
    return ( 
    <View style={styles.screen}>
        <Card style={styles.summary}>
            <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>Rs. {cartTotalAmount.toFixed(2)}</Text>
            </Text>
            <Button color={Colors.accent} 
                    title="Order Now" 
                    disabled={cartItems.length === 0}
                    onPress={orderSubmitHandler}></Button>
        </Card>
        <FlatList data={cartItems} 
                    keyExtractor={item => item.productId}
                    renderItem={itemData => 
                                    <CartItem 
                                        quantity={itemData.item.quantity}
                                        title={itemData.item.productTitle}
                                        amount={itemData.item.sum}
                                        deletable
                                        onRemove={() => {
                                            dispatch(
                                                cartActions.removeFromCart(
                                                    itemData.item.productId
                                                )
                                            );
                                        }}
                                        />}
        >

        </FlatList>
                
    </View>
    );    
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
      },
      summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
      },
      summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
      },
      amount: {
        color: Colors.primary
      }
});

export default CartScreen;