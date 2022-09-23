import { Fragment } from 'react'
import headerImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = (props) => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Meals Shop</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={headerImage} alt='food app' />
            </div>
        </Fragment>
    )
}

export default Header