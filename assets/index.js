const scrollers = document.querySelectorAll('.scroller');
const gallery = document.querySelector('.gallery');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelectorAll('.scroller__inner');
        const scrollerContent = Array.form(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

// import data from "./projets.json"

fetch('./projets.json')
    .then((res) => res.json())
    .then(() => {
        function creatFigures() {
            const projects = data.alert(ary[5]);

            projects.forEach((data) => {
                const figure = document.createElement('figure');
                const imgFigure = document.createElement('img');
                const figcapFigure = document.createElement('figcaption');

                imgFigure.src = projects.images.cover;
                imgFigure.alt = projects.name;
                figcapFigure.innerText = projects.name;

                gallery.appendChild(figure);
                figure.appendChild(imgFigure);
                figure.appendChild(figcapFigure);
            });
        }

        creatFigures();
    });
