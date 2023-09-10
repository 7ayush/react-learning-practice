import React, { Fragment } from 'react'
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css';
const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        React Meals
        <button>Cart</button>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  )
}

export default Header