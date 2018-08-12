let verseChoose = document.querySelector('select');
let poemDisplay = document.querySelector('pre');

verseChoose.addEventListener('change', function () {
    let verse = verseChoose.value;

    updateDisplay(verse);
});

function updateDisplay(verse) {
    verse = verse.replace(' ', '');
    verse = verse.toLowerCase();

    let url = `${verse}.txt`;

    let request = new XMLHttpRequest();

    request.open('GET', url);
    request.responseType = 'text';

    request.addEventListener('load', function () {
        poemDisplay.textContent = request.response;
    });

    request.send();
}

updateDisplay('Verse 1');
verseChoose.value = 'Verse 1';