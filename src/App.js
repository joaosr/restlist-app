import React from 'react';
import './App.css';
import RestaurantList from './components/RestaurantList';
import Login from './components/Login';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      restaurants: [],
      loggedin: false
    };

    this.restaurantUpdate = this.restaurantUpdate.bind(this)
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/restaurants/');
      const restaurants = await res.json();
      this.setState({
        restaurants: restaurants.results
      });
    } catch (e) {
      console.log(e);
    }
  }

  restaurantUpdate(restaurant){
       debugger;
       const restaurants = this.state.restaurants.map(r => { return r.id === restaurant.id ? restaurant : r })
       this.setState({
         restaurants: restaurants,
       })
  }

  render() {
    return (

      <div className="App">
        <Login updateLoginStatus={e => {
          this.setState({
            loggedin: e,
          });
        }}/>
        <RestaurantList
          restaurants={this.state.restaurants}
          loggedin={this.state.loggedin}
          restaurantUpdate={this.restaurantUpdate}
        />
      </div>
    );
  }

}
