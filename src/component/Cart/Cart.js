import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
    const addItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });

    };
    const removeItemHandler = id => {
        cartCtx.removeItem(id);
    };
    const orderHandle = () => {
        setIsCheckout(true);
    };
    const onOrderSubmitHandler = (userData) => {
        setIsSubmitting(true);
        fetch('https://react-2c4cc-default-rtdb.firebaseio.com/oder.json', {
            method: 'POST',
            body: JSON.stringify(
                {
                    user: userData,
                    orderItems: cartCtx.items
                }
            )
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearItem();
    };
    const hasItems = cartCtx.items.length > 0;

    const cartItem = <ul className={classes['item-list']}>
        {cartCtx.items.map((item, index) => <CartItem
            className={classes['cart-items']}
            key={index}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
        />)}
    </ul>;
    const orderButton = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandle}>Order</button>}
    </div>;
    const cartModal = <React.Fragment>
        {cartItem}
        <div className={classes.total}>
            <span>Total Price</span>
            <span>{totalPrice}</span>
        </div>
        {isCheckout && <Checkout onConfirm={onOrderSubmitHandler} onCancel={props.onCloseCart} />}
        {!isCheckout && orderButton}
    </React.Fragment>;
    const isSubmitingText = <p>Sending oder ....</p>;
    const didSubmitText = <React.Fragment>
        <p>Success oder we will send to you soon!</p>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
        </div>
    </React.Fragment>;

    return (

        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModal}
            {isSubmitting && isSubmitingText}
            {!isSubmitting && didSubmit && didSubmitText}

        </Modal>

    );
};

export default Cart;