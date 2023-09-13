import CartContext from './cart-context'
import { useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount : 0,
}

const cartReducer = ( state, action ) =>{
    if(action.type === 'ADD'){
        let updatedItems = [...state.items]
        let found = false;
        for(let i=0;i<updatedItems.length;i++){
            if(updatedItems[i].id === action.item.id){
                found = true;
                updatedItems[i].amount+=action.item.amount;
                break;
            }
        }
        if(found === false){
            updatedItems.push(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if(action.type ==='REMOVE'){
        const updatedItems = state.items.filter(item => item.id !== action.id);
        const removedItems = state.items.filter( item => item.id === action.id )
        const updatedAmount = state.totalAmount - removedItems[0].price * removedItems[0].amount;
        return { updatedItems, updatedAmount};
    }
    return defaultCartState;
}


const CartProvider = (props) => {
    const [ cartState, dispatchCartState ] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartState({type:'ADD', item: item})
    }
    const removeItemFromCartHandler = id => { 
        dispatchCartState({type : 'REMOVE', id : id})
    }


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider