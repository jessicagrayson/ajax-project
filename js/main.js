// dom queries
const $searchBar = document.querySelector('#query');
const $apiEndpoint = 'https://openlibrary.org/search.json?q=';
const limit = '&limit=10&offset=0';
const $icon = document.querySelector('.icon');
const $fwrdArrow = document.querySelector('.forward-arrow');
const $backArrow = document.querySelector('.back-arrow');
const $arrowContainer = document.querySelector('.arrow-container');
const $entriesTable = document.querySelector('.entries-table');
const searchUrl = 'https://covers.openlibrary.org/b/id/';
const urlSuffix = '.jpg';
const $saveBtn = document.querySelector('.save-button');

// array to store search results
const currentResults = [];
// TESTING TESTING 123
let clickedBook = {};

// function handles search query from open library API
function getBookData(event) {
  // prevents default form reset behavior
  event.preventDefault();
  // gets string from search bar, splits it, adds '+' between each character and concatenates w/ api endpoint
  let searchTerms = $searchBar.value;
  const splitTerms = searchTerms.split(' ');
  searchTerms = splitTerms.join('+');
  const requestUrl = $apiEndpoint + searchTerms + limit;
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
    //  removes existing entries from the table before next search
    const existingEntries = document.querySelectorAll('.results-row');

    // initiates loop that iterates over each book object in the results array obtainedfrom the API response
    existingEntries.forEach(function (entry) {
      entry.remove();
    });
    // assigns api search results to variables for later use
    results.forEach(function (book) {
      const title = book.title;
      const author = book.author_name;
      const cover = book.cover_i;
      const coverUrl = searchUrl + cover + urlSuffix;
      // conditional statement filters out incomplete search results and behaves normally for results with all info present
      if (
        !(cover === undefined || title === undefined || author === undefined)
      ) {
        // creates elements for DOM tree
        const $tableRow = document.createElement('tr');
        $tableRow.className = 'results-row';
        const $tableTitle = document.createElement('td');
        $tableTitle.className = 'title';
        const $tableAuthor = document.createElement('td');
        $tableAuthor.className = 'author';
        const $tableImg = document.createElement('img');
        $tableImg.setAttribute('src', coverUrl);
        $tableImg.setAttribute('alt', 'book cover image');
        $tableImg.className = 'table-image cover-image';

        // assigns appropriate values
        $tableTitle.textContent = book.title;
        $tableAuthor.textContent = book.author_name;

        // appends DOM elements
        $entriesTable.appendChild($tableRow);
        $tableRow.appendChild($tableImg);
        $tableRow.appendChild($tableTitle);
        $tableRow.appendChild($tableAuthor);

        // creates specific condition

        // adds current results to array
        currentResults.push({
          title,
          author,
          // eslint-disable-next-line comma-dangle
          coverUrl,
        });
      }
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

// click event for 'Enter' key - submits form and toggles search results table
document.addEventListener('keypress', function () {
  if (event.key === 'Enter') {
    toggleTable(event);
    getBookData(event);
  }
});

// function to conditionally hide or display entries table
function toggleTable(event) {
  $entriesTable.classList.remove('hidden');
  $searchBar.classList.add('hidden');
  $icon.classList.add('hidden');
  $icon.style.display = 'none';
  // displays the arrows
  $arrowContainer.style.display = 'flex';
}

// function that reverts to search bar view
function toggleSearch(event) {
  $searchBar.classList.remove('hidden');
  $entriesTable.classList.add('hidden');
  $arrowContainer.style.display = 'none';
  $icon.style.display = 'inline';
  $searchBar.value = 'Search book title or author name';
}

// event listener for back arrow, triggers toggleSearch function
$backArrow.addEventListener('click', toggleSearch);

// event listener on entries table which calls getTableData
$entriesTable.addEventListener('click', function (event) {
  // anonymous function to define object with book values
  const clickedRow = event.target.closest('.results-row');

  if (clickedRow) {
    const title = clickedRow.querySelector('.title').textContent;
    const author = clickedRow.querySelector('.author').textContent;
    const imageUrl = clickedRow
      .querySelector('.cover-image')
      .getAttribute('src');

    // creates an object from book that has been selected
    clickedBook = {
      title,
      author,
      // eslint-disable-next-line comma-dangle
      imageUrl,
    };
    data.entries.push(clickedBook);
  }

  // hide all other rows after one row is clicked
  const $allRows = document.querySelectorAll('.results-row');
  $allRows.forEach(row => {
    if (row !== clickedRow) {
      row.style.display = 'none';
    }
    // hides forward arrow
    $fwrdArrow.style.display = 'none';
    // displays save button
    $saveBtn.style.display = 'flex';
  });

});

// console.log(data.entries);

// adds entryId to book object, increments nextEntryId, hides table
function handleFwrd(event) {
  if (clickedBook?.title && clickedBook?.author && clickedBook?.imageUrl) {
    alert('handled!');
    clickedBook.entryId = data.nextEntryId;
    // console.log(clickedBook);
    data.nextEntryId = data.nextEntryId + 1;
    // console.log(data.nextEntryId);
  }
  // hides entries table
  $entriesTable.classList.add('hidden');

}
// event listener for save button, calls handleFwrd function
$saveBtn.addEventListener('click', handleFwrd);

// TESTING TESTING 123

// function renderEntry(entry) {
// // creates element of DOM tree:
//   const $listItem = document.createElement('li');
//   $listItem.className = 'user-entry';
//   const $row = document.createElement('div');
//   $row.className = 'entry-row';
//   const $imgColumn = document.createElement('div');
//   $imgColumn.className = 'column-half image-column';
//   const $img = document.createElement('img');
//   $img.className = 'entry-img';
//   // BELOW WILL NEED TO BE UPDATED
//   $img.setAttribute('src', entry.url);
//   const $textColumn = document.createElement('div');
//   $textColumn.className = 'column-half text-column';
//   const $title = document.createElement('h2');
//   $title.className = 'entry-title';
//   $title.textContent = entry.title;
//   const $notes = document.createElement('p');
//   $notes.className = 'entry-notes';
//   $notes.textContent = entry.notes;

//   // append DOM nodes to tree NEED TO CREATE UL
//   $list.appendChild($listItem);

// // appends li to ul and returns li with child elements
// }
