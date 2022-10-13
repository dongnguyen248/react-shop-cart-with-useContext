import { useRef, useState } from 'react';
import classes from './Checkout.module.css';
const isEmty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
const Checkout = (props) => {
    const [formValidatily, setFormValidatily] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const onConfirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const nameIsEmty = isEmty(enteredName);
        const streetIsEmty = isEmty(enteredStreet);
        const postalCodeIsValid = isFiveChars(enteredPostalCode);
        const cityIsEmty = isEmty(enteredCity);
        setFormValidatily({
            name: !nameIsEmty,
            city: !cityIsEmty,
            street: !streetIsEmty,
            postalCode: postalCodeIsValid
        });
        props.onConfirm({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            postalCode: enteredPostalCode
        });

    };
    const nameControlClasse = !formValidatily.name ? classes.control + ' ' + classes.invalid : classes.control;
    const streetControlClasse = !formValidatily.street ? classes.control + ' ' + classes.invalid : classes.control;
    const postalCodeControlClasse = !formValidatily.postalCode ? classes.control + ' ' + classes.invalid : classes.control;
    const cityControlClasse = !formValidatily.city ? classes.control + ' ' + classes.invalid : classes.control;
    return (
        <form className={classes.form} onSubmit={onConfirmHandler}>
            <div className={nameControlClasse}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formValidatily.name && <p className={classes.error}> Please enter valid name!</p>}
            </div>
            <div className={streetControlClasse}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formValidatily.street && <p className={classes.error}> Please enter valid street!</p>}
            </div>
            <div className={postalCodeControlClasse}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formValidatily.postalCode && <p className={classes.error}> Please enter 5 character in postalCode!</p>}
            </div>
            <div className={cityControlClasse}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formValidatily.city && <p className={classes.error}> Please enter valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form >
    );
};

export default Checkout;