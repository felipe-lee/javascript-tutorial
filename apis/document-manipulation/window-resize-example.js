let div = document.querySelector('div');

function fixDivSize() {
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    div.style.width = `${WIDTH}px`;
    div.style.height = `${HEIGHT}px`;
}

window.addEventListener('resize', fixDivSize);

fixDivSize();
