import PRODUCTS from '../../data/dummy-data';
import { SET_PRODUCTS } from '../actions/products';
import Product from '../../models/products';

const initialState = {
    availableProducts : PRODUCTS,
    //userProducts: PRODUCTS.filter(prod => prod.ownerId === 'user1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
          return {
            availableProducts: action.products,
            userProducts: action.userProducts
          };
        }
    return state;
};