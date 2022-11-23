//Date display using day.js and method format to.
var nowDate = dayjs().format( 'dddd, MMMM DD') + 'th';  
const currentDay = document.querySelector('#currentDay');
currentDay.innerHTML = nowDate;
const actDate = new Date();
const hrs = actDate.getHours();
const hoursTitle = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']; 
const mainContainer = document.getElementById('mainContainer');
//Code to apply the past, present, or future class to each time block by comparing the id to the current hour

function addSectToMain() {
  for (var i = 1; i <= 9; i++) {
	  let div = document.createElement('div');
    let newClass;
    let hourDes = function hoursCompare () {
    let t = i + 8; 
      if(hrs == t){
        newClass = "row time-block present"
      } else if (hrs < t) {
        newClass = "row time-block future"
      } else {
        newClass = "row time-block past"
      }
  }
  hourDes();

  //creating new section for each hour
	  div.innerHTML = `
    <div id="${i}" class="${newClass}">                                             
    <div class="col-2 col-md-1 hour text-center py-3">${hoursTitle[i]}</div>
    <textarea id="txt${i}" class="col-8 col-md-10 description"></textarea>
    <button id="btn${i}" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    </div>`;
	  mainContainer.appendChild(div);
  }
}
addSectToMain();

// creating hooks for save buttons
const saveButtons = $("button");

//Add a listener for click events on the save button. This code  
//use the id in the containing time-block as a key to save the user input in local storage
$(document).ready(function () {
  saveButtons.on("click", function () {
    // Getting values of content on textarea and time on section
    var text = $(this).siblings(".description").val().trim();
    console.log(text);
    var time = $(this).parent().attr("id");
    console.log(time);
    // Save to local storage
    localStorage.setItem(time, text);
  });
});

// print out all previos saved data
for (let i = 1; i < 10; i++) {
  let v = `#txt${i}`
  $(v).text(localStorage.getItem(i));
};