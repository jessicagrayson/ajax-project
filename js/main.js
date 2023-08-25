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
const $list = document.querySelector('.entries-list');
const $entriesView = document.querySelector('[data-view=entries]');
const $formView = document.querySelector('[data-view=entry-form]');
const $navLink = document.querySelector('.nav-link');

// array to store search results
const currentResults = [];
// empty object - used in getBookData
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

function handleFwrd(event) {
  if (clickedBook?.title && clickedBook?.author && clickedBook?.imageUrl) {

    clickedBook.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    data.entries.push(clickedBook);
  }
  // hides entries table
  $entriesTable.classList.add('hidden');

}

// creates DOM tree for a selected book
function renderEntries(entry) {
// creates element of DOM tree:
  const $listItem = document.createElement('li');
  $listItem.className = 'user-entry';
  const $row = document.createElement('div');
  $row.className = 'row entry-row';
  const $imgColumn = document.createElement('div');
  $imgColumn.className = 'column-half image-column';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.imageUrl);
  $img.className = 'entry-img';
  const $textColumn = document.createElement('div');
  $textColumn.className = 'column-half text-column';
  const $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  const $authorName = document.createElement('h2');
  $authorName.className = 'entry-author';
  $authorName.textContent = entry.author;

  // append DOM nodes to tree
  $listItem.appendChild($row);
  $row.appendChild($imgColumn);
  $imgColumn.appendChild($img);
  $row.appendChild($textColumn);
  $textColumn.appendChild($title);
  $textColumn.appendChild($authorName);

  // prepends li to ul and returns li with child elements
  $list.prepend($listItem);
  return $listItem;
}

// loop iterates through data.entries and creates a DOM tree for each entry
function arrayLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const entry = array[i];
    renderEntries(entry);
  }
}

// initiates arrayLoop function
document.addEventListener('DOMContentLoaded', function () {
  arrayLoop(data.entries);

  // retrieves store view state from localStorage
  const storedView = localStorage.getItem('currentView');
  // sets initial view based on stored state
  if (storedView === 'entry-form') {
    viewSwap('entry-form');
  } else {
    viewSwap('entries');
  }
});

// viewSwap function
function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entriesTable.classList.add('hidden');
    $entriesView.classList.add('hidden');
    $saveBtn.classList.add('hidden');
    $formView.classList.remove('hidden');
    data.view = 'entry-form';
    // changes nav link text to "entries"
    $navLink.textContent = 'Entries';

  } else if (viewName === 'entries') {
    $entriesTable.classList.add('hidden');
    $entriesView.classList.remove('hidden');
    $saveBtn.classList.remove('hidden');
    $formView.classList.add('hidden');
    data.view = 'entries';
    // changes nav link text to "new entry"
    $navLink.textContent = 'New Entry';
  }
  // store current view state in localStorage
  localStorage.setItem('currentView', viewName);
}

// save button swaps view, captures data from clicked result
$saveBtn.addEventListener('click', function () {
  viewSwap('entries');
  handleFwrd();
  // reloads page while staying on current view
  location.reload();
});

// nav link swaps view
$navLink.addEventListener('click', function (event) {
  event.preventDefault();
  if (data.view === 'entry-form') {
    viewSwap('entries');
  } else if (data.view === 'entries') {
    viewSwap('entry-form');
  }
});
