// This JS file is for interacting with the API

// I am removing my key for obvious reasons. To generate a key, just make an account on
// https://developer.accuweather.com/ 
// Follow the steps on the website thereafter.
// let key = "";

class Forecast{
	constructor() {
		this.key = 'Your key here';
		this.weatherURL = "http://dataservice.accuweather.com/currentconditions/v1/";
		this.cityURL = "http://dataservice.accuweather.com/locations/v1/cities/search";
	}


	async updateCity(city) {
		const cityDetails = await this.getCity(city);
		const weather = await this.getWeather(cityDetails.Key);

		return { cityDetails, weather };
	}

	async getCity(city) {
		const query = `?apikey=${this.key}&q=${city}`;
		const response = await fetch(this.cityURL + query);	
		const data = await response.json();

		// console.log(data)
		return data[0];	
	}

	async getWeather(id) {
		const para = `${id}?apikey=${this.key}`;
		const response = await fetch(this.weatherURL + para);
		const weather = await response.json();
		// console.log(weather[0].WeatherText);
		return weather[0];
	}
}



