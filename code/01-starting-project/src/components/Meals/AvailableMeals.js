import React from 'react'
import DUMMY_MEALS from '../Constants/dummy-meals'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal =>{
        return <li>{meal.name}</li>
    })
    return (
        <section className={classes.meals}>
            <ul>
                {mealsList} 
            </ul>
        </section>
    )
}

export default AvailableMeals