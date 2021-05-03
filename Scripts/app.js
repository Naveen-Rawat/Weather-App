// This JS file is for the DOM Manipulation

const cityForm = document.querySelector('form'); 
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
console.log(icon);
const updateUI = (data) => {

	const {cityDetails, weather} = data;

	details.innerHTML = `<h5 class="my-3"> ${cityDetails.EnglishName} </h5>
						<div class="my-3"> ${weather.WeatherText} </div>
						<div class="display-4 my-4">
							<span> ${weather.Temperature.Metric.Value} </span>
							<span>&deg;C </span>
						</div>`;

	// Update icon
	const iconSrc = `Images/icons/${weather.WeatherIcon}.svg`;
	console.log(iconSrc);
	icon.setAttribute('src', iconSrc);

	// Update day and night
	let timeSrc = null;

	if (weather.isDayTime) {
		timeSrc = `Images/day.svg`;
	} else {
		timeSrc = 'Images/night.svg';
	}
	time.setAttribute('src', timeSrc);

	
	// Remove d-none class if present
	if (card.classList.contains('d-none'))
		card.classList.remove('d-none');
};

const updateCity = async (city) => {
	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);

	return { cityDetails, weather };
};

cityForm.addEventListener('submit', event => {
	event.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

	// Update the UI with the new city
	updateCity(city).then(data => {
		updateUI(data);
	}).catch(err => {
		console.log('There was some error');
	});



	// Set localstorage
	localStorage.setItem('city', city);
});



if (localStorage.getItem('city'))
{
	updateCity(localStorage.getItem('city'))
	.then(data => {
		updateUI(data);
	})
	.catch(err => {
		console.log('There was some error');
	});
}