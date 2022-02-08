// Declaring all my variables and dom elements that are put on the global scope.

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

// first part of the adding to the list function, grabs the target that you clicked on and if it was the plus sign button,
// then the popup is displayed and the global scope variables are reassigned, if the item was the span then the information is removed from the list.
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

// on the popup screen this function takes the users input and saves it to the local storage attacked to a name reflecting the html items data type.
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

// Logic for the x icon in the top right of the popup page, this sets the popup displays back to the default of none and resets the input values.
function exitPopup() {
    $popup.style = `display:none;`;
    $popupInput.value = ``;
    $popupInput.previousElementSibling.innerHTML = `Add your item to the space provided`;
};

// clears out the previous p tag so the information does not get duplicated then runs the fillInData function to populate the information.
function updateData() {
    for (let i = 0; i < $hourByHourLi.length; i++) {
        $hourByHourLi[i].childNodes[1].remove();
    };
    fillInData();
};

// timed interval that fires every 1 second to be continuously updating the time that is displayed in the hero image,
// this function is also responsible for color coating the li's for the hour blocks.
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

// this for loop with the if else if statement attached, takes all the information in including the current time and adds the users information from the localStorage.
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

// Adds the previous information that is found inside the localStorage so the page will be auto populated if it has been returned too.
fillInData()

// adds an event listener to each one of the Li's so event delegation may be used in the addListContentPt1
for (let i = 0; i < $hourByHourLi.length; i++) {
    $hourByHourLi[i].addEventListener(`click`, addListContentPt1)
};

// adds the event listener for the exit popup button in the top right of the popup window.
$popupClose.addEventListener(`click`, exitPopup);

// adds the event listener for the submit button so the users data can be populated on the page and continue on to the next and final steps.
$popupSubmit.addEventListener(`click`, addListContentPt2);











