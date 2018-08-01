import React, {Component} from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

// import NProgress from 'nprogress';
//import 'nprogress/nprogress.css'

export default function (importComponent) {
    return Loadable({
        loader: () => importComponent(),
        loading: Loading
    });

    // return class AsyncComponent extends Component{
    //     state = {
    //         component:null
    //     }
    //     async componentDidMount(){
    //         const {default:component} =  await importComponent();
    //         this.setState({
    //             component:component
    //         });
    //         NProgress.done();
    //     }

    //     componentWillUnmount(){
    //         NProgress.start();
    //     }
        
    //     render(){
    //         const C = this.state.component;

    //         if(C){
    //             return (<C {...this.props}/>)
    //         }

    //         return null;
    //     }
    // }
};