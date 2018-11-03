import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import * as ResAPI from './RestaurantsAPI';
import RestaurantList from './RestaurantList';



class App extends Component {

  state = {
    restaurants: [],
    copy: [],
    popup: '',
    error: false
  }

  componentDidMount() {
    ResAPI.getNearbyRes()
    .then(res => this.setState({
      restaurants: res,
      copy: res 
    }))
    .catch((error) => {
      this.setState({ error: true }, () => {
        console.log(error);
      });
    });
    ;
  }

  filterRes = (searchTerm) => {
    let searchTermRegex = RegExp(searchTerm, 'i');
    let restaurants = this.state.restaurants;
    if(searchTerm) {
      let matches = restaurants.filter((r) => searchTermRegex.test(r.restaurant.name));
      this.setState({copy : matches});
    }
    else {
      this.setState({copy : this.state.restaurants});
    }
  }

  handleClick = (id) => {
    this.setState({ popup: id });
  }

  openNav = () => {
    document.querySelector('#map').classList.toggle('shift');
    document.querySelector('nav').classList.toggle('shift');
  } 

  render() {
    //let restaurants = this.state.restaurants;
    //console.log(restaurants);
    if(this.state.error) {
      return (
        <div>There was an error fetching data</div>
      )
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <button onClick={() => { this.openNav() }}><i className="fa fa-bars"></i></button>
            <h1>NextMeal</h1>
          </header>
          <Map restaurants={this.state.copy} popup={this.state.popup} />
          <RestaurantList restaurants={this.state.copy || []} filterRes={this.filterRes} handleClick={this.handleClick} />
        </div>
      );
    }
  }
}

export default App;
