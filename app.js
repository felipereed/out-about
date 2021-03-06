const API_KEY =
  "Bearer 4xXf6b67EXTMd9Mw4WkHO4-ivhSa7wSi252Lsi0Zvgs5FmNaSQVE2oTPH_1_tji5mVhZ4qhN_aq-jjGsK6Nrcgwic7UxQmaZNaEG43X_n5L054fE5WlbUdAMqgKJXnYx";
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?location=new-york&limit=50";

async function getInfoFromApi(searchTerm, price) {
  let urlWithParameter = BASE_URL + `&term=${searchTerm}`;

  if (price == 1 || price == 2 || price == 3 || price == 4) {
    urlWithParameter = urlWithParameter + `&price=${price}`;
  }
 
  let response = await axios.get(urlWithParameter, {
    headers: {
      Authorization: API_KEY,
    },
  });

  return response.data.businesses;
}

function randomlySelectItem(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)]
}

function buttonEvents() {
  let breakfastDropdown = document.querySelector('.breakfast > select')
  let landmarkButton = document.querySelector('.landmark > button')
  let lunchDropdown = document.querySelector('.lunch > select')
  let museumButton = document.querySelector('.museum > button')
  let parkButton = document.querySelector('.park > button')
  let dinnerDropdown = document.querySelector('.dinner > select')
  let rooftopButton = document.querySelector('.rooftop > button')
  
  let closeBreakfastRecommendation = document.getElementById('closeBreakfastRecommendation');
  let closeLandmarkRecommendation = document.getElementById('closeLandmarkRecommendation')
  let closeLunchRecommendation = document.getElementById('closeLunchRecommendation')
  let closeMuseumRecommendation = document.getElementById('closeMuseumRecommendation')
  let closeParkRecommendation = document.getElementById('closeParkRecommendation')
  let closeDinnerRecommendation = document.getElementById('closeDinnerRecommendation')
  let closeRooftopRecommendation = document.getElementById('closeRooftopRecommendation')
  
  breakfastDropdown.addEventListener('change', selectBreakfast)
  landmarkButton.addEventListener('click', buttonLandmark)
  lunchDropdown.addEventListener('change', selectLunch)
  museumButton.addEventListener('click', buttonMuseum)
  parkButton.addEventListener('click', buttonPark)
  dinnerDropdown.addEventListener('change', selectDinner)
  rooftopButton.addEventListener('click', buttonRooftop)
  
  closeBreakfastRecommendation.addEventListener('click', hideResultSection)
  closeLandmarkRecommendation.addEventListener('click', hideResultSection)
  closeLunchRecommendation.addEventListener('click', hideResultSection)
  closeMuseumRecommendation.addEventListener('click', hideResultSection)
  closeParkRecommendation.addEventListener('click', hideResultSection)
  closeDinnerRecommendation.addEventListener('click', hideResultSection)
  closeRooftopRecommendation.addEventListener('click', hideResultSection)
}

async function makeRecommendation(searchTerm, priceRange) {
  let apiResults = await getInfoFromApi(searchTerm, priceRange)
  let randomItem = randomlySelectItem(apiResults)
  console.log(randomItem);
  populateResultSection(randomItem, searchTerm);
}

async function selectBreakfast() {
  let priceRange = this.options[this.selectedIndex].value
  makeRecommendation('Breakfast', priceRange);
}

async function buttonLandmark() {
  makeRecommendation('Landmark')
}

async function selectLunch() {
  let priceRange = this.options[this.selectedIndex].value
  makeRecommendation('Lunch', priceRange)
}

async function buttonMuseum() {
  makeRecommendation('Museum');
}

async function buttonPark() {
  makeRecommendation('Park')
}

async function selectDinner() {
  let priceRange = this.options[this.selectedIndex].value
  makeRecommendation('Dinner', priceRange)
}

async function buttonRooftop() {
  makeRecommendation('Rooftop')
}

function hideResultSection() {
  this.parentElement.style.display = 'none';
  
}

buttonEvents();

function populateResultSection(item, category) {
  let img = document.getElementById('resultImg' + category);
  let name = document.getElementById('resultName' + category);
  let address = document.getElementById('resultAddress' + category);
  let phone = document.getElementById('resultPhone' + category);
  let website = document.getElementById('resultWebsite' + category);
  let map = document.getElementById('resultMap' + category)
// the section below sets all the properties of the elements in the result section 
  img.src = item.image_url;
  name.innerHTML = item.name;
  address.innerHTML = item.location.display_address[0] + '</br>' + item.location.display_address[1];
  phone.innerHTML = item.display_phone;
  website.href = item.url;
  map.href = 'https://maps.google.com/?q=' + item.location.display_address[0] + ' ' + item.location.display_address[1];
// so far the recommendation is invisible, this code displays it after the elements are populated
  img.parentElement.style.display = 'block';
}

