// default all with red backgroud
document.getElementById("Open").style.backgroundColor="#2d3e50";
document.getElementById("Closed").style.backgroundColor="#2d3e50";
document.getElementById("All").style.backgroundColor="red"; 

// This loads data from local storage.
let tasksarr = JSON.parse(localStorage.getItem("tasksarr")) || [];

// this was used as test data during coding please delete when project complete
//  let tasksarr ='{"taskarr":['+
  // '{"Incomplete": "Incomplete", "Task": "do washing", "update": "waiting for washing powder", "startDate": "2024-10-13","completeDate": "2024-10-17"},'+
  // '{"Incomplete": "Complete", "Task": "Wash Windows", "update": "waiting for Ladders", "startDate": "2024-10-15","completeDate": "2024-10-24"},'+
  // '{"Incomplete": "Incomplete", "Task": "Wash Windows", "update": "waiting for Ladders", "startDate": "2024-10-15","completeDate": "2024-10-24"}]}'; 

// get event for new task button
const newTaskButtonEl = document.getElementById("newTaskButton");
newTaskButtonEl.addEventListener("click", newTask);

// get event for open task button
const openButtonEl = document.getElementById("Open");
openButtonEl.addEventListener("click", listOpen);

// get event for closed task button
const closedButton = document.getElementById("Closed");
closedButton.addEventListener("click", listClosed);

// get event for all task button
const allButtonEl = document.getElementById("All");
allButtonEl.addEventListener("click", listAll);

// get event for search enter
const searchButtonEl = document.getElementById("searchBar");
searchButtonEl.addEventListener("keydown", function (e) {if (e.key === 'Enter') {searchBar()}});

drawTable(tasksarr)
inputValueReset()

// Clear Input value and put default values
function inputValueReset(){
//Gets today and put in correct format
  date = dateRetieve(Number(0))
  date2 = dateRetieve(Number(7))
// Clear input Values to deafult 
  document.getElementById('complete').value= "Incomplete";
  document.getElementById('newTask').value= "";
  document.getElementById('update').value= "";
  document.getElementById('startDate').value= date;
  document.getElementById('completeDate').value= date2;
}

// retieve date and format and add number of days requested
function dateRetieve(addDays){
var now = new Date();
const month = now.getMonth()+1;
const day = now.getDate()+Number(addDays);
const year = now.getFullYear();
return year+"-"+month+"-"+day;
}

// Search function
function searchBar(){
  const search = document.getElementById("searchBar").value;
// Ready for code to search
// 
// 
// 
  console.log(search+" Test")
}

// clear table
function clearTable() {
  var table = document.getElementById("task-table");
  numberOfRows = document.getElementById("task-table").rows.length;
  if(numberOfRows>2){
    for(i=numberOfRows; i>1; i-- ){
     var row = table.deleteRow(1);
    }
  }
}

// function for when a new task button clicked
function newTask() {
// get input values into tasksAdd
var tasksAdd = {
  "Incomplete": document.getElementById("complete").value,
  "Task": document.getElementById("newTask").value,
  "update": document.getElementById("update").value,
  "startDate": document.getElementById("startDate").value,
  "completeDate": document.getElementById("completeDate").value
}
var objAdd = JSON.stringify(tasksAdd)
const tasksarrStr = JSON.stringify(tasksarr)
let objNew = tasksarrStr.slice(0, -3) + ", " + objAdd + "]}"

console.log(objAdd)
console.log(typeof objNew)
console.log(tasksarr)

// clear values and call redraw task table 
  clearTable()
  inputValueReset()

  const obj = JSON.parse(objNew);
  drawTable(obj) 
}
  
//Redraw Table
function drawTable(obj) {
// check color of buton to pick if to print all closed open
  if (document.getElementById("All").style.backgroundColor == "red"){list="All"}
  if (document.getElementById("Open").style.backgroundColor == "red"){list="Open"}
  if (document.getElementById("Closed").style.backgroundColor == "red"){list="Closed"}
// decides what list to print ie all complete or incomplete
  switch(list){
    case list="Open":
      for(let i=0; obj.taskarr.length > i; i++){
        if(obj.taskarr[i].Incomplete=="Incomplete") {
// Insert Row at End
          var table = document.getElementById("task-table");
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
// chnage color red if overdue code 

// end of code
          //  insert data into row 
          cell1.innerHTML = obj.taskarr[i].Incomplete;
          cell2.innerHTML = obj.taskarr[i].Task;
          cell3.innerHTML = obj.taskarr[i].update;
          cell4.innerHTML = obj.taskarr[i].startDate;
          cell5.innerHTML = obj.taskarr[i].completeDate;
// Depending if task complete or not add correct buttons
          cell6.innerHTML = "Complete Update";       
        }
      }
      break;
      
    case list="Closed":
      for(let i=0; obj.taskarr.length > i; i++){
        if(obj.taskarr[i].Incomplete=="Complete") {
  // Insert Row at End
          var table = document.getElementById("task-table");
          var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
  //  insert data into row 
          cell1.innerHTML = obj.taskarr[i].Incomplete;
          cell2.innerHTML = obj.taskarr[i].Task;
          cell3.innerHTML = obj.taskarr[i].update;
          cell4.innerHTML = obj.taskarr[i].startDate;
          cell5.innerHTML = obj.taskarr[i].completeDate;
  // Depending if task complete or not add correct buttons
          cell6.innerHTML = "Incomplete Delete"
          // <ul><li><button id="Incomplete">Reopen</button></li><li><button id="delete">delete</button></li></ul>;
        }   
      }
      break;
      
    case list="All":
      for(let i=0; obj.taskarr.length > i; i++){
 // Insert Row at End
        var table = document.getElementById("task-table");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
// chnage color red if overdue code 

// end of code
//  insert data into row 
        cell1.innerHTML = obj.taskarr[i].Incomplete;
        cell2.innerHTML = obj.taskarr[i].Task;
        cell3.innerHTML = obj.taskarr[i].update;
        cell4.innerHTML = obj.taskarr[i].startDate;
        cell5.innerHTML = obj.taskarr[i].completeDate;
// Depending if task complete or not add correct buttons
        if (obj.taskarr[i].Incomplete == "Complete") {
            cell6.innerHTML = "Incomplete Delete";
          }
          else {
              cell6.innerHTML = "Complete Update";       
          }
        }
      }
// And finally this will now Save the tasks to the "localStorage".
  localStorage.clear();
  localStorage.setItem("tasksarr", JSON.stringify(tasksarr)); 
}

function listOpen(){
  document.getElementById("Open").style.backgroundColor="red";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  clearTable()
  const obj = JSON.parse(tasksarr);
  drawTable(obj)
}

function listClosed() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="red";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  clearTable()
  const obj = JSON.parse(tasksarr);
  drawTable(obj) 
}

function listAll() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="red";  
  clearTable()
  const obj = JSON.parse(tasksarr);
  drawTable(obj) 
}
