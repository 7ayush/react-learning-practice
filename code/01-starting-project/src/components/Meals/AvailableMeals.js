import React from 'react'
import DUMMY_MEALS from '../Constants/dummy-meals'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => {
        return <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
        />
    })
    
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals