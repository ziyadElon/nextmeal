import React, { Component } from 'react';

class RestaurantList extends Component {
  render() {
    let restaurants = this.props.restaurants;
    //console.log(restaurants);
    return(
      <nav className="res-list">
        <input aria-label="Search" onChange={(e) => this.props.filterRes(e.target.value)} placeholder="Search restaurants"/>
        <ul>
          {restaurants.map(r => 
            (<li key={r.restaurant.id}>
              <button className="res-list__item" onClick={() => this.props.handleClick(r.restaurant.id)}>{r.restaurant.name}</button>
            </li>))}
        </ul>
      </nav>
    )
  }
}

export default RestaurantList;