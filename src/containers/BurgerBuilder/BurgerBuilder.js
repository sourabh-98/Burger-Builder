import React,{Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4
}

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        erroe: false
    };
    componentDidMount(){
        axios.get('https://react-my-burger-6dccd.firebaseio.com/ingredients.json').then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true})
        });
    }
    updatePurchaseState (ingredients) {
        const sum =Object.keys(ingredients).map(
            igKey => {
            return ingredients[igKey]        
        }).reduce((sum,el) => {
            return sum+el;
        },0);
        this.setState({purchasable: sum>0})
    }
    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount !== 0){
            const newCount = oldCount-1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = newCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceSubtraction;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        //alert('Continue');
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            name: 'Sourabh Sand',
            address: {
                lane: '20,Round Tank Lane',
                pin: '711101',
            },
            email: 'abc@gmail.com', 
            deliveryMode: 'fastest'
        }
        axios.post('/orders.json',order)
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
    }
    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Can't load the ingredients</p> : <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Auxi>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientsAdded = {this.addIngredientsHandler}
                        ingredientsRemoved = {this.removeIngredientsHandler}
                        disabled = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                        price = {this.state.totalPrice}
                        />
                    </Auxi>);
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
                />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Auxi>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                     {orderSummary}
                </Modal>
                {burger}
            </Auxi>
        );
    };
};

export default withErrorHandler(BurgerBuilder,axios);