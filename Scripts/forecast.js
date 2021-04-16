// This JS file is for interacting with the API

// I am removing my key for obvious reasons. To generate a key, just make an account on
// https://developer.accuweather.com/ 
// Follow the steps on the website thereafter.
let key = "Your_Key_Here";

const getCity = async (city) => {
	const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
	const query = `?apikey=${key}&q=${city}`;
	const response = await fetch(base + query);	
	const data = await response.json();

	// console.log(data)
	return data[0];	
}

const getWeather = async (data) => {
	// console.log(data + 'from get weather');
	const url = `http://dataservice.accuweather.com/currentconditions/v1/${data}`;
	const para = `?apikey=${key}`;

	const response = await fetch(url + para);
	const weather = await response.json();
	// console.log(weather[0].WeatherText);
	return weather[0];
};


