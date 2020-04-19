import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log('[OrderSummary.js] will update');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igKey => {
            return (<li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
            }
        )
        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>Your delicious burger includes the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price : {this.props.price}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Auxi>
        );
    }
}

export default OrderSummary;