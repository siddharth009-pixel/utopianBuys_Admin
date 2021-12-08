import React,{useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import Home from './containers/Home'
import Signup from './containers/Signup'
import Signin from './containers/Signin'
import { Provider } from 'react-redux';
import PrivateRoute from './HOC/PrivateRoute';
import { isUserLoggedIn } from './actions/auth.action';
import { useDispatch, useSelector } from "react-redux";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import { getAllCategory } from "./actions/category.action";
import { getInitialData } from "./actions/initialData.action";
import NewPage from "./containers/NewPage";


function App() {

  const dispatch = useDispatch();
  const auth=useSelector(state=>state.auth)

  useEffect(() => {
  
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())      
    }
    if(auth.authenticate){
    dispatch(getInitialData())    
    }
  }, [auth.authenticate])


  return (
      <div className="App">
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
    </div>
  );
}

export default App;
