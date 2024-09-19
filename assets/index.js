import data from './projets.json';
const scrollers = document.querySelectorAll('.scroller');
const gallery = document.querySelector('.gallery');
const titleContainer = document.querySelector('.title-container');
const modalcarouselInner = document.querySelector('.carousel-inner');
const modalTags = document.querySelector('.tags');
const modalDescription = document.querySelector('.modal-body__description');
const btnClose = document.querySelector('.btn-close');
const btnMore = document.querySelector('.btn-more');

gallery.addEventListener('click', modalContent);
btnClose.addEventListener('click', modalClear);

function createFigures() {
    gallery.innerHTML = '';

    const projects = data.slice(0, 6);
    projects.forEach((data) => {
        const figure = document.createElement('figure');
        const imgFigure = document.createElement('img');
        const figcapFigure = document.createElement('figcaption');
        figure.setAttribute('class', 'project-figures');
        figure.setAttribute('type', 'button');
        figure.setAttribute('id', `${data.name}`);
        figure.setAttribute('data-bs-toggle', 'modal');
        figure.setAttribute('data-bs-target', '#modal-project');
        imgFigure.src = data.images.cover;
        imgFigure.alt = data.name;
        figcapFigure.innerText = data.name;
        gallery.appendChild(figure);
        figure.appendChild(imgFigure);
        figure.appendChild(figcapFigure);
    });

    btnMore.addEventListener('click', nextFigures);
}

function nextFigures() {
    gallery.innerHTML = '';

    const projects = data.slice(6, 12);
    projects.forEach((data) => {
        const figure = document.createElement('figure');
        const imgFigure = document.createElement('img');
        const figcapFigure = document.createElement('figcaption');
        figure.setAttribute('class', 'project-figures');
        figure.setAttribute('type', 'button');
        figure.setAttribute('id', `${data.name}`);
        figure.setAttribute('data-bs-toggle', 'modal');
        figure.setAttribute('data-bs-target', '#modal-project');
        imgFigure.src = data.images.cover;
        imgFigure.alt = data.name;
        figcapFigure.innerText = data.name;
        gallery.appendChild(figure);
        figure.appendChild(imgFigure);
        figure.appendChild(figcapFigure);
    });

    btnMore.addEventListener('click', createFigures);
}

function modalContent(event) {
    console.log(event.target.id);
    const currentProject = data.find((data) => data.name === event.target.id);
    const modalTitle = document.createElement('h3');
    titleContainer.appendChild(modalTitle);
    modalTitle.innerText = `Projet "${currentProject.name}"`;

    const Pictures = currentProject.images.pictures;

    const firstPicture = Pictures.shift();
    console.log(firstPicture);
    const modalcarouselActiveItems = document.createElement('div');
    modalcarouselActiveItems.setAttribute('class', 'carousel-item active');
    const carouselFirstImg = document.createElement('img');
    carouselFirstImg.src = firstPicture;
    carouselFirstImg.alt = 'Image du projet';
    carouselFirstImg.setAttribute('class', 'd-block w-100');
    modalcarouselInner.appendChild(modalcarouselActiveItems);
    modalcarouselActiveItems.appendChild(carouselFirstImg);

    console.log(Pictures);
    Pictures.forEach((picture) => {
        const modalcarouselItems = document.createElement('div');
        modalcarouselItems.setAttribute('class', 'carousel-item');
        const carouselImg = document.createElement('img');
        carouselImg.src = picture;
        carouselImg.alt = 'Image du projet';
        carouselImg.setAttribute('class', 'd-block w-100');
        modalcarouselInner.appendChild(modalcarouselItems);
        modalcarouselItems.appendChild(carouselImg);
    });

    const Tags = currentProject.tags;
    Tags.forEach((tag) => {
        const TagsContent = document.createElement('p');
        TagsContent.textContent = tag;
        modalTags.appendChild(TagsContent);
    });

    const modalDescriptionContent = document.createElement('p');
    modalDescriptionContent.innerText = currentProject.description;
    modalDescription.appendChild(modalDescriptionContent);

    Pictures.unshift(firstPicture);
}

function modalClear() {
    titleContainer.innerHTML = '';
    modalcarouselInner.innerHTML = '';
    modalTags.innerHTML = '';
    modalDescription.innerHTML = '';
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);
        console.log(scrollerContent);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

createFigures();

const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const formMessage = document.querySelector('#message');
const formButtonWrapper = document.querySelector('#wrapper-button');
const formButton = document.querySelector('#button');

function formRequire() {
    if (
        formName.value.trim() === '' ||
        formEmail.value.trim() === '' ||
        formMessage.value.trim() === ''
    ) {
        formButtonWrapper.className = 'wrapper-button wrapper-button-inactive';
        formButton.className = 'button button-inactive';
    } else {
        formButtonWrapper.className = 'wrapper-button wrapper-button-active';
        formButton.className = 'button button-active';
    }
}

formName.addEventListener('input', formRequire);
formEmail.addEventListener('input', formRequire);
formMessage.addEventListener('input', formRequire);
