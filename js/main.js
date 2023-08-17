// dom queries
const $searchBar = document.querySelector('#query');
const $apiEndpoint = 'https://openlibrary.org/search.json?q=';
// const $icon = document.querySelector('.icon');
// for testing only
const $hersheyButton = document.querySelector('.hershey');

// handles search query from open library API
function getBookData(event) {
  event.preventDefault();
  const searchTerms = $searchBar.value;
  const requestUrl = $apiEndpoint + searchTerms;
  // DELETE THIS ALERT LATER, FOR TESTING
  // alert(searchTerms);
  // alert(requestUrl);
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
// click event for test button - submits form
$hersheyButton.addEventListener('click', getBookData);
