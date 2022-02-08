const $hero = document.getElementById(`hero-splash`);
const $currentDate = document.getElementById(`current-date`);
const $timeDisplayed = document.getElementById(`time-display`);
const $hourByHourSection = document.getElementById(`hour-by-hour`);
const $hourByHourUl = document.getElementById(`hour-by-hour-list`);
const $hourByHourLi = document.querySelectorAll(`.hour-listing`);
const $addItemButton = document.querySelectorAll(`button`);
const $popup = document.querySelector(`aside`);
const $popupInput = document.querySelector(`input`);
const $popupSubmit = document.getElementById(`create-list-button`);
const $popupClose = document.getElementById(`close-popup-icon`);
let currentAdditionBtn = ``;
let currentAdditionLi = ``;
$currentDate.textContent = moment().format(`MMMM D, Y`);
$timeDisplayed.textContent = moment().format(`h:mm:ssA`);


function addListContentPt1(e) {
    let target = e.target;
    let parent = e.currentTarget;
    let parentsDataTime = parent.getAttribute(`data-time`);
    if (target.matches(`button`)) {
        $popup.style = `display:flex;`
        $popupInput.setAttribute(`data-time`, parentsDataTime);
        currentAdditionLi = parent;
        currentAdditionBtn = target;
    } else if (target.matches(`span`)) {
        target.parentElement.remove();
        window.localStorage.removeItem(`hour=` + parentsDataTime)
    }
};

function addListContentPt2() {
    let usersNewTask = $popupInput.value.trim();

    if (usersNewTask === ``) {
        $popupInput.previousElementSibling.innerHTML = `The input field cannot be left empty <br> Please Schedule a Task`;
        return;
    } else {
        window.localStorage.setItem(`hour=` + currentAdditionLi.getAttribute(`data-time`), usersNewTask)
        exitPopup();
        updateData();
    }
}

function updateData() {
    for (let i = 0; i < $hourByHourLi.length; i++) {
        $hourByHourLi[i].childNodes[1].remove();
    };
    fillInData();
};

function exitPopup() {
    $popup.style = `display:none;`;
    $popupInput.value = ``;
    $popupInput.previousElementSibling.innerHTML = `Add your item to the space provided`;
};

let timeUpdate = setInterval(() => {
    let todaysDate = moment().format(`MMMM D, Y`);
    let currentTime = moment().format(`h:mm:ssA`);
    $currentDate.textContent = todaysDate;
    $timeDisplayed.textContent = currentTime;
    for (let i = 0; i < $hourByHourLi.length; i++) {
        const listing = $hourByHourLi[i];

        if (listing.getAttribute(`data-time`) < moment().format(`HH`)) {
            listing.style = `background-color:#f26d5e;`
        } else if (listing.getAttribute(`data-time`) === moment().format(`HH`)) {
            listing.style = `background-color:#f8a057`
        } else if (listing.getAttribute(`data-time`) > moment().format(`HH`)) {
            listing.style = `background-color:#fbee1a;`
        }
    }
}, 1000);

function fillInData() {
    for (let i = 0; i < $hourByHourLi.length; i++) {

        if (window.localStorage.getItem(`hour=0` + [i + 1]) == null && window.localStorage.getItem(`hour=` + [i + 1]) == null) {
            let taskText = document.createElement(`p`)
            taskText.innerHTML = `no data`
            taskText.style = `display:none;`
            $hourByHourLi[i].insertBefore(taskText, $hourByHourLi[i].childNodes[1]);
        } else if (i < 9) {
            let taskText = document.createElement(`p`)
            taskText.innerHTML = `${window.localStorage.getItem(`hour=0` + [i + 1])} <span>X</span>`
            $hourByHourLi[i].insertBefore(taskText, $hourByHourLi[i].childNodes[1]);
        } else if (i === 9) {
            let taskText = document.createElement(`p`)
            taskText.innerHTML = `${window.localStorage.getItem(`hour=10`)} <span>X</span>`
            $hourByHourLi[i].insertBefore(taskText, $hourByHourLi[i].childNodes[1]);
        } else if (i >= 10) {
            let taskText = document.createElement(`p`)
            taskText.innerHTML = `${window.localStorage.getItem(`hour=` + [i + 1])} <span>X</span>`
            $hourByHourLi[i].insertBefore(taskText, $hourByHourLi[i].childNodes[1]);
        };
    };
};

// fills in the data from the local storage
fillInData()

for (let i = 0; i < $hourByHourLi.length; i++) {
    $hourByHourLi[i].addEventListener(`click`, addListContentPt1)
};
$popupClose.addEventListener(`click`, exitPopup);
$popupSubmit.addEventListener(`click`, addListContentPt2);











