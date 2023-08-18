// dom queries
const $searchBar = document.querySelector('#query');
const $apiEndpoint = 'https://openlibrary.org/search.json?q=';
const limit = '&limit=10&offset=0';
const $icon = document.querySelector('.icon');

// handles search query from open library API
function getBookData(event) {
  // prevents default form reset behavior
  event.preventDefault();
  // gets string from search bar, splits it and adds + between each character and concatenates w/ api endpoint
  let searchTerms = $searchBar.value;
  const splitTerms = searchTerms.split(' ');
  searchTerms = splitTerms.join('+');
  const requestUrl = $apiEndpoint + searchTerms + limit;
  alert(requestUrl);
  // creates new xhr object
  const xhr = new XMLHttpRequest();
  // sets request method and URL
  xhr.open('GET', requestUrl);
  // console.log(requestUrl);
  // gets body of HTTP response once it has been converted from JSON to JS objects
  xhr.responseType = 'json';
  // executes function when response is eventually loaded
  xhr.addEventListener('load', function () {
    // DELETE BELOW CONSOLE LOGS BEFORE PR
    // console.log('status:', xhr.status);
    // console.log('response:', xhr.response);
  });
  // sends request to the server at the URL specified in xhr.open()
  xhr.send();
}
// click event for magnifying glass icon - submits form
$icon.addEventListener('click', getBookData);
