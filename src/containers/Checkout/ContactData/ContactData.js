import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import { withRouter } from 'react-router';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            lane: '',
            pincode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            name: 'Sourabh Kumar Sand',
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
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Enter Your Name" />
                <input type="email" name="email" placeholder="Your Email id" />
                <input type="text" name="lane" placeholder="Enter Your Lane" />
                <input type="text" name="pincode" placeholder="Enter Your Pincode" /><br/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER NOW</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

//Normally, we dont have history object in props. it can be solved using withRouter.
export default withRouter(ContactData);