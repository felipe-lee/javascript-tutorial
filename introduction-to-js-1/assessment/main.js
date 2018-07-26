var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var storyText = 'It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared ' +
    'in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs ' +
    '300 pounds, and it was a hot day.';
var insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
var insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
var insertZ = [
    'spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    let items = [
        {'name': ':insertx:', 'newText': xItem},
        {'name': ':inserty:', 'newText': yItem},
        {'name': ':insertz:', 'newText': zItem},
    ];

    for (item of items) {
        let regEx = new RegExp(item.name, 'g');

        newStory = newStory.replace(regEx, item.newText)
    }

    if (customName.value !== '') {
        newStory = newStory.replace('Bob', customName.value);
    }

    if (document.getElementById("uk").checked) {
        let weight = Math.round(300 * 0.071429) + ' stone';

        newStory = newStory.replace('300 pounds', weight);

        let temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';

        newStory = newStory.replace('94 farenheit', temperature);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}