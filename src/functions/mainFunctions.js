var userLocation; //Variable to hold the users latitude and longitude.
var userRadius; //Variable to hold the radius user would like to find food in.
var userPrice; //Variable to hold the desired price of food user would like to spend.

/**
 * Function for flipping card.
 */
exports.flip = () => { 
  if (document.getElementsByClassName('card-inner')[0].id ==='display-front') {
    document.getElementById('display-front').id = 'display-back';
  }
  else {
    document.getElementById('display-back').id = 'display-front';
  }
};

/**
 * Sets the price and radius based on user input.
 * 
 * @param selected - element clicked on by user
 */
exports.setChoice = (selected) => {
  selected = selected.parentElement;
  //Sets price
  if (selected.id === 'price-one') {
    userPrice = '1';
    selected.className = 'choice-box box-one choice-selected';
    document.getElementById('price-two').className = 'choice-box box-two price-two';
    document.getElementById('price-three').className = 'choice-box box-three price-three';
  }
  else if (selected.id === 'price-two') {
    userPrice = '2';
    selected.className = 'choice-box box-two choice-selected';
    document.getElementById('price-one').className = 'choice-box box-one price-one';
    document.getElementById('price-three').className = 'choice-box box-three price-three';
  }
  else if (selected.id === 'price-three') {
    userPrice = '3';
    selected.className = 'choice-box box-three choice-selected';
    document.getElementById('price-one').className = 'choice-box box-one price-one';
    document.getElementById('price-two').className = 'choice-box box-two price-two';
  }
  //Sets distance
  if (selected.id === 'distance-one') {
    userRadius = 1610;
    selected.className = 'choice-box box-one choice-selected';
    document.getElementById('distance-two').className = 'choice-box box-two distance-two';
    document.getElementById('distance-three').className = 'choice-box box-three distance-three';
  }
  else if (selected.id === 'distance-two') {
    userRadius = 16100;
    selected.className = 'choice-box box-two choice-selected';
    document.getElementById('distance-one').className = 'choice-box box-one distance-one';
    document.getElementById('distance-three').className = 'choice-box box-three distance-three';
  }
  else if (selected.id === 'distance-three') {
    userRadius = 48300;
    selected.className = 'choice-box box-three choice-selected';
    document.getElementById('distance-one').className = 'choice-box box-one distance-one';
    document.getElementById('distance-two').className = 'choice-box box-two distance-two';
  }
};

/**
 * Gets user latitude and longitude and updates userLocation with a string representation of the information.
 */
exports.getLocation = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    userLocation = `${position.coords.latitude}, ${position.coords.longitude}`;
  });
};

/**
 * Gets a list of restaurants from Google Places API based on user input, then calls the helper method setRest() 
 * to display a randomly chosen restaurant from the returned array.
 */
exports.getRest = () => {
  //Checks that user has selected both options. If not, displays error message to card.
  if (typeof userPrice === 'undefined' || typeof userRadius === 'undefined') {
    document.getElementById('error').innerHTML = 'Please choose distance and price.';
    return;
  }
  document.getElementById('error').innerHTML = '';
  document.getElementById('find-btn-img').className = 'find-btn-img spin';
  let placesRequest = new XMLHttpRequest();
  let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&type=restaurant&location=${userLocation}&radius=${userRadius}&maxprice=${userPrice}&minprice=${userPrice}&key=[API_KEY]`;
  placesRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let responseArray = JSON.parse(this.responseText);
      setRest(responseArray.results[Math.floor(Math.random() * (responseArray.results.length - 1))]);
    }
  };
  placesRequest.open('GET', url, true);
  placesRequest.send();
};

/**
 * Sets and displays a randomly chosen restaurant to the back of card.
 * 
 * @param {object} result - Randomly chosen restaurant
 */
const setRest = (result) => {
  document.getElementById('title').innerHTML = result.name;
  document.getElementById('rating').innerHTML = 'Rating: ' + result.rating;
  document.getElementById('address-link').innerHTML = result.formatted_address;
  //Calls formatLink to get a Google Maps link to restaurant
  let addressLink = formatLink(result);
  document.getElementById('address-link').href = `https://www.google.com/maps/search/?api=1&query=${addressLink}`;
  //Displays price of restaurant if price in unavailable.
  if (!result.price_level >= 1) {
    document.getElementById('price').innerHTML = 'Price: $';
  }
  //Displays price of restaurant as dollar signs.
  else {
    let restPrice = '';
    for (let i = 0; i < result.price_level; i++) {
      restPrice = restPrice.concat('$');
    }
    document.getElementById('price').innerHTML = 'Price: ' + restPrice;
  }
  document.getElementById('display-front').id = 'display-back';
  document.getElementById('find-btn-img').className = 'find-btn-img';
};

/**
 * Formats address information, so it can be used to create a Google Maps link to restaurant.
 * 
 * @param {object} address - Randomly chosen restaurant
 * @returns formattedString - Formatted restaurant address.
 */
const formatLink = (address) => {
  let formattedString = "";
  let restTitle = address.name;
  address = address.formatted_address.split(",");
  restTitle = restTitle.replace(/ /g, "+");
  //Formats the title of the restaurant.
  for (let i = 0; i < address.length; i++) {
    if (address[i].charAt(0) === " ") {
      address[i] = address[i].replace(" ", "");
    }
    address[i] = address[i].replace(/ /g, "+");
  }
  //Appends restTitle to formattedString along with the rest of the address information.
  for (let i = 0; i < address.length; i++) {
    if (i === 0) {
      formattedString = restTitle + "%2c" + address[i] + "%2c";
    }
    else if (i === address.length - 1) {
      formattedString = formattedString.concat(address[i]);
    }
    else {
      formattedString = formattedString.concat(address[i].concat("%2c"));
    }
  }
  return formattedString;
}