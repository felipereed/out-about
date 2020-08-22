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
  return myArray[Math.floor(Math.random() * myArray.length)];
}

function buttonEvents() {
  let breakfastDropdown = document.querySelector('.breakfast > select')
  let closeBreakfastRecommendation = document.getElementById('closeBreakfastRecommendation');
  breakfastDropdown.addEventListener('change', selectBreakfast);
  closeBreakfastRecommendation.addEventListener('click', hideResultSection);
}

async function makeRecommendation(searchTerm, priceRange) {
  let apiResults = await getInfoFromApi(searchTerm, priceRange)
  let randomItem = randomlySelectItem(apiResults)
  console.log(randomItem);
  populateResultSection(randomItem, searchTerm);
}

async function selectBreakfast() {
  let priceRange = this.options[this.selectedIndex].value;
  makeRecommendation('Breakfast', priceRange);
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
// the section below sets all the properties of the elements in the result section 
  img.src = item.image_url;
  name.innerHTML = item.name;
  address.innerHTML = item.location.display_address[0] + '</br>' + item.location.display_address[1];
  phone.innerHTML = item.display_phone;
  website.href = item.url;
// so far the recommendation is invisible, this code displays it after the elements are populated
  img.parentElement.style.display = 'block';
}

