import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log(props.ingredients);
    let ingredients = [];
    for(let igName in props.ingredients){
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        });
    }

    let ingredientOutput = ingredients.map(ig => {
         return <span 
                    key={ig.name}
                    style={{
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}>{ig.name} [{ig.amount}] </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Total Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;