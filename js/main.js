// dom queries
// const $search = document.querySelector('#query');
// const $icon = document.querySelector('.icon');

// handles search query from open library API
function getBookData() {
  // creates new xhr object
  const xhr = new XMLHttpRequest();
  // sets request method and URL
  xhr.open('GET', 'https://openlibrary.org/search.json?q=');
  // gets body of HTTP response once it has been converted from JSON to JS objects
  xhr.responseType = 'json';
  // executes function when response is eventually loaded
  xhr.addEventListener('load', function () {
    // below for test purposes - DELETE BEFORE SUBMITTING PR
    // console.log('status:', xhr.status);
    // console.log('response:', xhr.response);
  });
  // sends request to the server at the URL specified in xhr.open()
  xhr.send();
}

getBookData();
