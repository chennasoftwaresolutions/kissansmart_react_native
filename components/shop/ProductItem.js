import React from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = props => {
    let TouchableComp = TouchableOpacity;
    TouchableComp = TouchableNativeFeedback;

    return (    
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComp onPress={props.onViewDetail}
                        useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}}/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{ props.title }</Text>
                            <Text style={styles.price}>Rs. { props.price.toFixed(2) }</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
                        </View>    
                    </View>
                </TouchableComp>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product : {
        /*shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',*/
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    image: {
        width: '50%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price:{
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
    }
});

export default ProductItem;