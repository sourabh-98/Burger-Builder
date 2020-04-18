import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) =>{

    console.log(props.ingredients);
    /*const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => { 
                    return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    });*/
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
            var arr=[];
            for(var i=0;i<props.ingredients[igKey];i+=1){
                arr = [...arr,<BurgerIngredient key={igKey+i} type={igKey}/>]
            }
            return arr;
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Enter Ingredients !</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;