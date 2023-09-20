import React, { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'


const Cart = (props) => {
    const ctx = useContext(CartContext);
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemAddHandler = item => {
        ctx.addItem(item);
    }
    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    }
    const incrementCartItemHandler = id => {
        ctx.incrementItem(id);
    }
    const cartItems = <ul>
        {ctx.items.map(item => {
            return <CartItem 
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onIncrement={incrementCartItemHandler.bind(null,item.id)}
                    />
        })}
    </ul> 
    
    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            { hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>

}

export default Cart