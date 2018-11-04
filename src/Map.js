import React, { Component } from 'react'
import L from 'leaflet';

class Map extends Component {

	state = {
		restaurants : this.props.restaurants,
		initialRender: true
	}

	componentDidMount() {
		// create map
		this.map = L.map('map', {
			center: [12.9719, 77.6412],
			zoom: 13,
			layers: [
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}),
			]
		});

		this.markersLayer = L.layerGroup([]);		
		this.customIcon = L.icon({
			iconUrl: 'https://image.flaticon.com/icons/svg/33/33622.svg',
			iconSize: [68, 65], // size of the icon
			iconAnchor: [35, 65], // point of the icon which will correspond to marker's location
			popupAnchor: [-40, -50]
		});
	}

	componentDidUpdate() {
		let restaurants = this.props.restaurants;
		let popup = this.props.popup;
		//remove all markers from the map
		this.markersLayer.eachLayer((layer => this.map.removeLayer(layer)));
		restaurants.forEach((res) => {
			let restaurant = res.restaurant;
			//create markers and bind popup to each
			restaurant.marker = L.marker([restaurant.location.latitude, restaurant.location.longitude]);
			restaurant.marker.addTo(this.markersLayer);
			restaurant.marker.bindPopup(`<strong>${restaurant.name}</strong><br>
											Rating: ${restaurant.user_rating.aggregate_rating}<br>
											Cost for two: ${restaurant.currency} ${restaurant.average_cost_for_two}<br>
											Cuisines: ${restaurant.cuisines}<br>
											<small>Courtesy: Zomato API</small>`);
			if(restaurant.id === popup)	{
				restaurant.marker.openPopup();
				restaurant.marker.setIcon(this.customIcon).addTo(this.map);
			}

		//	console.log(this.map._layers.first);

			// this.map._layers[0].on('tileerror', function (error, tile) {
			// 	console.log(error);
			// 	console.log(tile);
			// 	document.querySelector('.error-block').style.display = "block";
			// });
		});		
		
		// add marker and popup for each restaurant
		this.markersLayer.addTo(this.map);
	}

	render() {
		return(
			<div id="map"></div>
		)    
	}
}

export default Map