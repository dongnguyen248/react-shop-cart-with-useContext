import CartContext from "./cart-context"
import React, { useReducer } from "react"


const defaultCartState = {
    items: [],
    totalPrice: 0
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => {

            return item.id === action.item.id
        })
        const existingCartItem = state.items[existingCartItemIndex];
        let updateItems;
        if (existingCartItem) {
            const updateItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem;
        } else {
            updateItems = state.items.concat(action.item);
        }


        const updateTotalPrice = state.totalPrice + action.item.price * action.item.amount;
        return { items: updateItems, totalPrice: updateTotalPrice }

    }
    if (action.type === 'REMOVE_ITEM') {
        let updateItems;
        const existingCartItemIndex = state.items.findIndex(item => {

            return item.id === action.id
        })
        const existCartItem = state.items[existingCartItemIndex];

        const updateTotalPrice = state.totalPrice - existCartItem.price;
        if (existCartItem.amount === 1) {
            updateItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updateItem = { ...existCartItem, amount: existCartItem.amount - 1 }
            updateItems = [...state.items]
            updateItems[existingCartItemIndex] = updateItem
        }
        return { items: updateItems, totalPrice: updateTotalPrice }
    }
    return defaultCartState;
}



const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item: item })
    };
    const removeItemFromCartHanlder = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id })
    };
    const cartContext = {
        items: cartState.items,
        totalPrice: cartState.totalPrice,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHanlder
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider