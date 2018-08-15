// Defining a baseURL and key to as part of the request URL

let baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
let key = 'acf3dfa1f43c424a88a5adc7b2cbfeeb';
let url = '';

// Grab references to all the DOM elements you'll need to manipulate

let searchTerm = document.querySelector('.search');
let startDate = document.querySelector('.start-date');
let endDate = document.querySelector('.end-date');
let searchForm = document.querySelector('form');
let submitBtn = document.querySelector('.submit');

let nextBtn = document.querySelector('.next');
let previousBtn = document.querySelector('.prev');

let section = document.querySelector('section');
let nav = document.querySelector('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;
let displayNav = false;

// Event listeners to control the functionality

searchForm.addEventListener('submit', submitSearch);

function submitSearch(event) {
    pageNumber = 0;
    fetchResults(event);
}

function fetchResults(event) {
    event.preventDefault();

    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

    if (startDate.value !== '') {
        url += `&begin_date=${startDate.value}`;
    }

    if (endDate.value !== '') {
        url += `&end_date=${endDate.value}`;
    }

    fetch(url).then(function (result) {
        return result.json();
    }).then(function (json) {
        displayResults(json);
    })
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs;

    if (articles.length === 10) {
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }

    if (pageNumber === 0) {
        previousBtn.style.display = 'none';
    } else if (pageNumber > 0) {
        previousBtn.style.display = 'block';
    }

    if (articles.length === 0) {
        let para = document.createElement('p');

        para.textContent = 'No results returned.';

        section.appendChild(para);

        return;
    }

    for (let i = 0; i < articles.length; i++) {
        let article = document.createElement('article');
        let heading = document.createElement('h2');
        let link = document.createElement('a');
        let img = document.createElement('img');
        let para1 = document.createElement('p');
        let para2 = document.createElement('p');
        let clearfix = document.createElement('div');

        let current = articles[i];
        console.log(current);

        link.href = current.web_url;
        link.textContent = current.headline.main;

        para1.textContent = current.headline.main;
        para2.textContent = 'Keywords: ';

        for (let j = 0; j < current.keywords.length; j++) {
            let span = document.createElement('span');

            span.textContent += `${current.keywords[j].value} `;

            para2.appendChild(span);
        }

        if (current.multimedia.length > 0) {
            img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
            img.alt = current.headline.main;
        }

        clearfix.setAttribute('class', 'clearfix');

        article.appendChild(heading);

        heading.appendChild(link);

        article.appendChild(img);
        article.appendChild(para1);
        article.appendChild(para2);
        article.appendChild(clearfix);

        section.appendChild(article);
    }
}

nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function nextPage(event) {
    pageNumber++;

    fetchResults(event);
}

function previousPage(event) {
    if (pageNumber === 0) {
        return;
    }

    pageNumber--;

    fetchResults(event);
}
