import React, { Component } from 'react'
import Navbar from './components/Navbar';
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './components/Home';
import Customers from './components/Customers';
import Products from './components/Products';
import NotFound from './components/Not-Found';
import './App.css';
import CustomerForm from './components/CustomerForm';
class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/customers/new" component={CustomerForm} />
            <Route path="/products" component={Products} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" component={NotFound} />
          </Switch>

        </div>
      </div>
    )
  }
}

export default App;