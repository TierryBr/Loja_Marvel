import React from 'react';
import { Route, Switch } from 'react-router-dom';
 
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Details from './pages/Details/Details';
 
export default function Routes() {
 return (
   <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/details" exact component={Details} />
   </Switch>
 );
}