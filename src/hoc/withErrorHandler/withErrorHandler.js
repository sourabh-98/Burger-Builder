import React, { Component } from 'react';
import Auxi from '../Auxi';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req; 
            })
            this.resInterceptors = axios.interceptors.response.use(res => res,error => {
                this.setState({error: error});
            })
        }
        componentWillUnmount(){
            console.log('Will Unmount',this.resInterceptors,this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorChangeHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <Auxi>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorChangeHandler}
                        >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxi>
            );
        }
    }
}

export default withErrorHandler;