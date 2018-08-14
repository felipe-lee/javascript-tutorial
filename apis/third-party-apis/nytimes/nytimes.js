// Defining a baseURL and key to as part of the request URL

var baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
var key = 'INSERT-YOUR-API-KEY-HERE';
var url;

// Grab references to all the DOM elements you'll need to manipulate

var searchTerm = document.querySelector('.search');
var startDate = document.querySelector('.start-date');
var endDate = document.querySelector('.end-date');
var searchForm = document.querySelector('form');
var submitBtn = document.querySelector('.submit');

var nextBtn = document.querySelector('.next');
var previousBtn = document.querySelector('.prev');

var section = document.querySelector('section');
var nav = document.querySelector('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
var pageNumber = 0;
var displayNav = false;

// Event listeners to control the functionality

