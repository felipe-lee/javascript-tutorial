let itemInput = document.querySelector('#item');
let addButton = document.querySelector('#add-item');
let shoppingList = document.querySelector('#shopping-list');

function deleteItem(event) {
    shoppingList.removeChild(this.parentElement);
}

function addItem(event) {
    let newItemText = itemInput.value;
    itemInput.value = '';
    itemInput.focus();

    let newItem = document.createElement('li');
    let newSpan = document.createElement('span');
    let newButton = document.createElement('button');

    newSpan.textContent = newItemText;

    newButton.textContent = 'Delete';
    newButton.addEventListener('click', deleteItem);

    newItem.appendChild(newSpan);
    newItem.appendChild(newButton);

    shoppingList.appendChild(newItem);
}

addButton.addEventListener('click', addItem);
