import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealsItem/MealItem';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState('');
    useEffect(() => {
        const fetchMeals = async () => {
            const loadedMeals = [];
            const response = await fetch('https://react-2c4cc-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Some thing when wrong!');
            }
            const responseData = await response.json();
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, []);

    if (isLoading) {
        return <section className={classes.meals + ' ' + classes['loading-meal']} >
            <Card>
                <p>Loading...</p>
            </Card>
        </section>;
    }
    if (httpError) {
        return <section className={classes.meals + ' ' + classes['error-meal']} >
            <Card>
                <p>{httpError}</p>
            </Card>
        </section>;
    }


    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description} />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;