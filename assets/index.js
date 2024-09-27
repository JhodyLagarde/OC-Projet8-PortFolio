import data from './projets.json';
//Skill scroller querySelector
const scrollers = document.querySelectorAll('.scroller');
//Gallery querySelector
const gallery = document.querySelector('.gallery');
//Modal querySelector
const titleContainer = document.querySelector('.title-container');
const modalcarouselInner = document.querySelector('.carousel-inner');
const modalTags = document.querySelector('.tags');
const modalDescription = document.querySelector('.modal-body__description');
const modalAnnex = document.querySelector('.modal-body__links');
const btnClose = document.querySelector('.btn-close');
const btnMore = document.querySelector('.btn-more');

//Form querySelector
const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const formObject = document.querySelector('#objet');
const formMessage = document.querySelector('#message');
const formButtonWrapper = document.querySelector('#wrapper-button');
const formButton = document.querySelector('#button');
const form = document.querySelector('form');

//Toast quarySelector
const toastLiveExample = document.getElementById('liveToast');
const toastBody = document.querySelector('toast-body');

//Events
//Modal
gallery.addEventListener('click', modalContent);
btnClose.addEventListener('click', modalClear);
//Form
formButton.addEventListener('click', postForm);

//Functions for projects' dynamic figures in gallery
//Creating figures in gallery
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

    btnMore.removeEventListener('click', createFigures);
    btnMore.addEventListener('click', nextFigures);
}

//Navigate in gallery for more projects
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
    btnMore.removeEventListener('click', nextFigures);
    btnMore.addEventListener('click', createFigures);
}

//Functions for modal behavior
//Creating modal contents for specific target
function modalContent(event) {
    const currentProject = data.find((data) => data.name === event.target.id);
    const modalTitle = document.createElement('h3');
    titleContainer.appendChild(modalTitle);
    modalTitle.innerText = `Projet "${currentProject.name}"`;

    const Pictures = currentProject.images.pictures;
    const firstPicture = Pictures.shift();
    const modalcarouselActiveItems = document.createElement('div');
    modalcarouselActiveItems.setAttribute('class', 'carousel-item active');
    const carouselFirstImg = document.createElement('img');
    carouselFirstImg.src = firstPicture;
    carouselFirstImg.alt = 'Image du projet';
    carouselFirstImg.setAttribute('class', 'd-block w-100');
    modalcarouselInner.appendChild(modalcarouselActiveItems);
    modalcarouselActiveItems.appendChild(carouselFirstImg);

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

    const annexLink = currentProject.annex.links;
    const annexLinkDescription = currentProject.annex.linksDescription;

    for (let i = 0; i < annexLink.length; i++) {
        const aModalAnnex = document.createElement('a');
        aModalAnnex.href = annexLink[i];
        aModalAnnex.innerText = annexLinkDescription[i];
        modalAnnex.appendChild(aModalAnnex);
    }

    Pictures.unshift(firstPicture);
}

//Clearing the modal when closed event
function modalClear() {
    titleContainer.innerHTML = '';
    modalcarouselInner.innerHTML = '';
    modalTags.innerHTML = '';
    modalDescription.innerHTML = '';
    modalAnnex.innerHTML = '';
}

//Adding infinite scrolling animation in skills section by duplicate the skills div
//Checking the user preference for animation
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addAnimation();
}

//Duplicate the scrollerInner children with a cloneNode
function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

createFigures();

//Checking the presence of form values and changing the button style based on
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

async function postForm(event) {
    event.preventDefault();

    let formNameV = formName.value;
    let formEmailV = formEmail.value;
    let formObjectV = formObject.value;
    let formMessageV = formMessage.value;

    const req = await fetch('../public/form.php', {
        method: 'POST',
        body: JSON.stringify({
            name: formNameV,
            mail: formEmailV,
            object: formObjectV,
            message: formMessageV,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await req.json();
    if (res.response == true) {
        toastTriggerTrue();
    } else {
        toastTriggerFalse();
    }
}

function toastTriggerTrue() {
    const toastBodyP = document.createElement('p');
    toastBodyP.innerText = 'Votre message à été  envoyé !';
    toastBody.appendChild(toastBodyP);
    const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}

function toastTriggerFalse() {
    const toastBodyP = document.createElement('p');
    toastBodyP.innerText = 'Une erreur est survenue';
    toastBody.appendChild(toastBodyP);
    const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}
