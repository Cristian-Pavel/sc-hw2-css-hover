///////////////////////
// DOM selection
///////////////////////

let selectDOM = {
  nav: document.querySelector('nav'),
  burgerMenuBtn: document.querySelector('.burgerMenu'),
  addActivityForm: document.querySelector('.addActivityForm'),
  addActivityBtn: document.getElementById('addActivityBtn'),
  addActivityBtn2: document.getElementById('addActivityBtn2'),
  startTime: document.getElementById('startTime'),
  endTime: document.getElementById('endTime'),
  activityDescription: document.getElementById('activityDescription'),
  // activityCategory: document.querySelector('input[name="categories"]:checked'),
};

////////////////////////////
//// Variable initializations
//////////////////////////////

let urlActivities =
  'https://moyo-app-7cf34-default-rtdb.europe-west1.firebasedatabase.app/activities/';

let urlGoals =
  'https://moyo-app-7cf34-default-rtdb.europe-west1.firebasedatabase.app/goals/';

let databaseInfo = {};
let activity = {};
let databaseGoals = {};

///////////////////////
// Functii
///////////////////////

// Every page

function toggleMobileMenu() {
  selectDOM.nav.classList.toggle('hidden');
}

async function getDataFromDataBase() {
  const response = await fetch(urlActivities + '.json');
  databaseInfo = await response.json();
  if (databaseInfo === null) {
    databaseInfo = {};
  }
}

async function addActivity() {
  if (addFormValidator()) {
    readAddActivitiesForm();
    if (activity) {
      const response = await fetch(urlActivities + '.json', {
        method: 'post',
        body: JSON.stringify(activity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      await getDataFromDataBase();
      alert('The activity was added succesfully!');
    } else {
      alert('Please check if all the fileds are fullfilled');
    }
  }
}

async function addActivityAndMovetoWeekView() {
  if (addFormValidator()) {
    readAddActivitiesForm();
    if (activity) {
      const response = await fetch(urlActivities + '.json', {
        method: 'post',
        body: JSON.stringify(activity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      await getDataFromDataBase();
      window.location.href = './weekView.html';
    } else {
      alert('Please check if all the fileds are fullfilled');
    }
  }
}

function readAddActivitiesForm() {
  let activityDescription = selectDOM.activityDescription.value;
  let category = document.querySelector('input[name="categories"]:checked')
    .value;
  let selectedGoal = document.querySelector('#goalsList');
  selectedGoal = selectedGoal.options[selectedGoal.selectedIndex].text;
  let startTime = selectDOM.startTime.value;
  let endTime = selectDOM.endTime.value;

  activity.description = activityDescription;
  activity.category = category;
  activity.selectedGoal = selectedGoal;
  activity.startTime = startTime;
  activity.endTime = endTime;
  selectDOM.addActivityForm.reset();
  return activity;
}

async function getGoalsFromDatabase() {
  const response = await fetch(urlGoals + '.json');
  databaseGoals = await response.json();
  if (databaseGoals === null) {
    databaseGoals = {};
  }
  console.log(databaseGoals);
  drawGoalsOnPage(databaseGoals);
}

function drawGoalsOnPage(databaseGoals) {
  let str = '<option disabled hidden selected>None</option>';
  for (let [id, goal] of Object.entries(databaseGoals)) {
    str += `
    <option value="${goal.goal}">${goal.goal}</option>

    `;
  }
  document.querySelector('#goalsList').innerHTML = str;
}

function addFormValidator() {
  if (!selectDOM.activityDescription.value) {
    alert('Please write an activity description');
    return false;
  }
  if (!document.querySelector('input[name="categories"]:checked')) {
    alert('Please choose an activity category');
    return false;
  }
  if (!selectDOM.startTime.value) {
    alert('Please set the start time of the activity');
    return false;
  }
  if (!selectDOM.endTime.value) {
    alert('Please set the finish time of the activity');
    return false;
  } else return true;
}

// TODO: resolve the functionality
async function startDateFromWeekview(date) {
  selectDOM.startTime.value = date;
  selectDOM.endTime.value = date;
  await addActivity();
}

///////////////////////
// Event listeners
///////////////////////

// Every page
window.addEventListener('load', getGoalsFromDatabase);
selectDOM.burgerMenuBtn.addEventListener('click', toggleMobileMenu);

selectDOM.addActivityBtn.addEventListener('click', addActivity);

selectDOM.addActivityBtn2.addEventListener(
  'click',
  addActivityAndMovetoWeekView
);

/***
 Pasi:
1) Cand dam click pe add activity (add event listener)
2) Intregistram datele intr-un obiect (activityRecord) si le trimitem catre baza de date (fetch functions)


 */
