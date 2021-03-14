import Product from "../../models/products";

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://kissansmart.com/api/products'                
            );
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();
            const loadedProducts = [];
            //console.log('------------------------------------------------');
            //console.log(responseData);
            //console.log('*************************************************');
            console.log(responseData.data);
            console.log(' ###### '+ responseData.data[0].price);
            for( const key in responseData.data) {
                loadedProducts.push(new Product(key,'u1', 
                responseData.data[key].name, 
                responseData.data[key].image, 
                responseData.data[key].description,
                responseData.data[key].price
                ));
            }
            //console.log(responseData);
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            });
        } catch(err) {
            console.log(err);
            throw err;
        }
    }
}