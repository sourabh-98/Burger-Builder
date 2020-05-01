import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    
    state = {
        ingredients: null,
        totalPrice: 0
    }
    componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        console.log(query.entries());
        for(let param of query.entries()){
            console.log(param[0],+param[1]);
            if(param[0] === 'price'){
                this.setState({totalPrice: +param[1]});
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients});
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        console.log(this.props);
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                    {console.log(this.props.match)}
                <Route path={this.props.match.path} 
                        render={() => (<ContactData 
                                            ingredients={this.state.ingredients}
                                            totalPrice={this.state.totalPrice}
                                                />)} 
                    />
            </div>
        )
    }
}

export default Checkout;