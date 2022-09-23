import { useState, useRef } from 'react'

import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true)

    const inputRef = useRef()

    const addToCartHanlder = (event) => {
        event.preventDefault();
        const inputAmount = inputRef.current.value;
        const inputAmountNumber = +inputAmount;
        if (inputAmount === 0 || inputAmountNumber < 0) {
            setAmountIsValid(false)
            return;
        }
        props.onAddCart(inputAmountNumber)
    }
    return (
        <form className={classes.form} onSubmit={addToCartHanlder}>
            <Input
                ref={inputRef}
                label={'Amount'}
                input={{
                    id: 'amount_' + props.item.id,
                    type: 'number',
                    step: '1',
                    min: '1',
                    max: '5',
                    defaultValue: '1'
                }} />
            <button type='submit'>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount value 1-5.</p>}
        </form>
    )
}

export default MealItemForm