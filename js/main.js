// dom queries
const $searchBar = document.querySelector('#query');
const $apiEndpoint = 'https://openlibrary.org/search.json?q=';
// const $icon = document.querySelector('.icon');
// for testing only
const $hersheyButton = document.querySelector('.hershey');

// handles search query from open library API
function getBookData() {
  const searchTerms = $searchBar.value;
  const requestUrl = $apiEndpoint + searchTerms;
  // DELETE THIS ALERT LATER, FOR TESTING
  alert(searchTerms);
  alert(requestUrl);
  // creates new xhr object
  const xhr = new XMLHttpRequest();
  // sets request method and URL
  xhr.open('GET', requestUrl);
  // gets body of HTTP response once it has been converted from JSON to JS objects
  xhr.responseType = 'json';
  // executes function when response is eventually loaded
  xhr.addEventListener('load', function () {});
  // sends request to the server at the URL specified in xhr.open()
  xhr.send();
}

$hersheyButton.addEventListener('click', getBookData);
