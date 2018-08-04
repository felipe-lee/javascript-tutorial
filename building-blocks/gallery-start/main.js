var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

for (let i = 1; i < 6; i++) {
    let newImage = document.createElement('img');

    newImage.setAttribute('src', 'images/pic' + i + '.jpg');

    thumbBar.appendChild(newImage);
}

function changeDisplayedImageSrc(newSrc) {
    displayedImage.setAttribute('src', newSrc);
}

thumbBar.addEventListener('click', function (event) {
    if (event.target && event.target.matches('img')) {
        let newSrc = event.target.getAttribute('src');

        changeDisplayedImageSrc(newSrc);
    }
});

function darkenLightenImage() {
    function lightenImage() {
        btn.textContent = 'Darken';
        btn.classList.replace('light', 'dark');

        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }

    if (btn.classList.contains('dark')) {
        btn.textContent = 'Lighten';
        btn.classList.replace('dark', 'light');

        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else if (btn.classList.contains('light')) {
        lightenImage();
    } else {
        alert('The button broke! Resetting!');

        btn.className = 'light';

        lightenImage();
    }
}

btn.addEventListener('click', darkenLightenImage);

