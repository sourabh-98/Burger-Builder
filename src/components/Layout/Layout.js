import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: true}
        }
    )};
    
    render(){
        return(
            <Auxi>
                <Toolbar
                    clicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}

export default Layout;