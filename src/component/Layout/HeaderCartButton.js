import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighLighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const classesButton = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    const { items } = cartCtx;
    const numberOfCartItem = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighLighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button className={classesButton} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItem}
            </span>
        </button>
    );
};

export default HeaderCartButton;