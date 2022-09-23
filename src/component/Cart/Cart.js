import { useContext } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`
    const addItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });

    }
    const removeItemHandler = id => {
        cartCtx.removeItem(id);
    }
    const hasItems = cartCtx.items.length > 0;
    const cartItem = <ul>
        {cartCtx.items.map((item, index) => <CartItem
            className={classes['cart-items']}
            key={index}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
        />)}
    </ul>

    return (

        <Modal onCloseCart={props.onCloseCart}>
            {cartItem}
            <div className={classes.total}>
                <span>Total Price</span>
                <span>{totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>

    )
}

export default Cart