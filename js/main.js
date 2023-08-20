// dom queries
const $searchBar = document.querySelector('#query');
const $apiEndpoint = 'https://openlibrary.org/search.json?q=';
const limit = '&limit=10&offset=0';
const $icon = document.querySelector('.icon');
// const $fwrdArrow = document.querySelector('.forward-arrow');
const $backArrow = document.querySelector('.back-arrow');
const $entriesTable = document.querySelector('.entries-table');
// const $entryView = document.querySelector('[data-view=entries]');
// const $formView = document.querySelector('[data-view=entry-form]');
// const $form = document.querySelector('#form');
const searchUrl = 'https://covers.openlibrary.org/b/id/';
const urlSuffix = '.jpg';

// array to store current search results
const currentResults = [];

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
  // gets body of HTTP response once it has been converted from JSON to JS objects
  xhr.responseType = 'json';
  // executes function when response is eventually loaded
  xhr.addEventListener('load', function () {
    // handles API response
    const response = xhr.response;
    // access and use key-value pairs
    const results = response.docs;
    // console.log(results);
    //  removes existing entries from the table
    const existingEntries = document.querySelectorAll('.results-row');
    existingEntries.forEach(function (entry) {
      entry.remove();
    });

    // initiates loop that iterates over each book object in the results array obtainedfrom the API response
    results.forEach(function (book) {
      const title = book.title;
      const author = book.author_name;
      const cover = book.cover_i;
      const hersheyUrl = searchUrl + cover + urlSuffix;

      // creates elements for DOM tree
      const $tableRow = document.createElement('tr');
      $tableRow.className = 'results-row';
      const $tableTitle = document.createElement('td');
      $tableTitle.className = 'title';
      const $tableAuthor = document.createElement('td');
      $tableAuthor.className = 'author';
      const $tableImg = document.createElement('img');
      $tableImg.setAttribute('src', hersheyUrl);
      $tableImg.className = 'table-image cover-image';

      // assigning appropriate values
      $tableTitle.textContent = book.title;
      $tableAuthor.textContent = book.author;

      // appends DOM elements
      $entriesTable.appendChild($tableRow);
      $tableRow.appendChild($tableImg);
      $tableRow.appendChild($tableTitle);
      $tableRow.appendChild($tableAuthor);
      // adds current results to array
      currentResults.push({
        title,
        author,
        hersheyUrl
      });
    });
  });

  // notifies user of errors when they occur
  xhr.addEventListener('error', function (error) {
    console.error('Error fetching data:', error);
  });

  // sends request to the server at the URL specified in xhr.open()
  xhr.send();
}

// click event for magnifying glass icon - submits form and toggles search results table
$icon.addEventListener('click', function () {
  toggleTable(event);
  getBookData(event);
});

// function to conditionally hide or display entries table
function toggleTable(event) {
  $entriesTable.classList.remove('hidden');
  $searchBar.classList.add('hidden');
}

// function that reverts to search bar view
function toggleSearch(event) {
  $searchBar.classList.remove('hidden');
  $entriesTable.classList.add('hidden');
  $icon.classList.add('hidden');
}

// event listener for back arrow, triggers toggleSearch function
$backArrow.addEventListener('click', toggleSearch);
