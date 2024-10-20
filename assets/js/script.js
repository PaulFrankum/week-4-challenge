// default all with red backgroud
document.getElementById("Open").style.backgroundColor="#2d3e50";
document.getElementById("Closed").style.backgroundColor="#2d3e50";
document.getElementById("All").style.backgroundColor="red"; 

// This loads data from local storage.
let tasksarr = JSON.parse(localStorage.getItem("tasksarr")) || [];
// this was used as test data during coding please delete when project complete
// let tasksarr ='{"Incomplete": "Incomplete", "Task": "do washing", "update": "waiting for washing powder", "startDate": "2024-10-13","completeDate": "2024-10-17"},'+'{"Incomplete": "Complete", "Task": "Wash Windows", "update": "waiting for Ladders", "startDate": "2024-10-15","completeDate": "2024-10-24"},'+'{"Incomplete": "Incomplete", "Task": "Wash Windows", "update": "waiting for Ladders", "startDate": "2024-10-15","completeDate": "2024-10-24"}'; 

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

console.log(typeof(tasksarr))

  const obj = JSON.parse(tasksarr)
  drawTable(obj)

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
}

// clear table
function clearTable() {
  var table = document.getElementById("task-table");
  numberOfRows = document.getElementById("task-table").rows.length;
  if(numberOfRows>2){
    for(i=numberOfRows; i>1; i-- ){
      var row = table.deleteRow(1);
    }
  // if(document.getElementById("task-table").rows.length=2) {var row = table.deleteRow(1);}  
  }
}

// function for when a new task button clicked
function newTask() {
// if list is on complete change to open otherwise task will not show
if (document.getElementById("Closed").style.backgroundColor == "red"){
  document.getElementById("Open").style.backgroundColor="red";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="#2d3e50";
}  
// get input values into tasksAdd
var tasksAdd = {
  "Incomplete": document.getElementById("complete").value,
  "Task": document.getElementById("newTask").value,
  "update": document.getElementById("update").value,
  "startDate": document.getElementById("startDate").value,
  "completeDate": document.getElementById("completeDate").value
}
// add to obj
var objAdd = JSON.stringify(tasksAdd)
tasksarr = tasksarr.slice(0, -3) + "}, " + objAdd + "]}"

// clear values and call redraw task table 
clearTable()
inputValueReset()
const obj = JSON.parse(tasksarr);
drawTable(obj) 
}
  
//Redraw Table
function drawTable(obj) {
// check color of buton to pick if to print all closed open
  if (document.getElementById("All").style.backgroundColor == "red"){list="All"}
  if (document.getElementById("Open").style.backgroundColor == "red"){list="Open"}
  if (document.getElementById("Closed").style.backgroundColor == "red"){list="Closed"}
// decides what list to print ie all complete or incomplete
  todayDate=dateRetieve(0)
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
// change color red if overdue code 
          if(obj.taskarr[i].completeDate<todayDate){
            cell1.style.backgroundColor = "#ff0000";
            cell2.style.backgroundColor = "#ff0000";
            cell3.style.backgroundColor = "#ff0000";
            cell4.style.backgroundColor = "#ff0000";
            cell5.style.backgroundColor = "#ff0000";
            cell6.style.backgroundColor = "#ff0000";          
          }
// end of red code
//  insert data into row 
          //  insert data into row 
          cell1.innerHTML = obj.taskarr[i].Incomplete;
          cell2.innerHTML = obj.taskarr[i].Task;
          cell3.innerHTML = obj.taskarr[i].update;
          cell4.innerHTML = obj.taskarr[i].startDate;
          cell5.innerHTML = obj.taskarr[i].completeDate;
// Depending if task complete or not add correct buttons
          var x = document.createElement("BUTTON");
          x.classList.add("complete");
          var t = document.createTextNode("Complete");
          x.appendChild(t);
          cell6.appendChild(x);
          x = document.createElement("BUTTON");
          x.classList.add("update");
          t = document.createTextNode("Update");
          x.appendChild(t);
          cell6.appendChild(x);   
          row.querySelector(".update").addEventListener("click", function () {update(i)})
          row.querySelector(".complete").addEventListener("click", function () {complete(i)})
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
          var x = document.createElement("BUTTON");
          x.classList.add("incomplete");
          var t = document.createTextNode("Incomplete");
          x.appendChild(t);
          cell6.appendChild(x);
          x = document.createElement("BUTTON");
          x.classList.add("delete");
          t = document.createTextNode("Delete");
          x.appendChild(t);
          cell6.appendChild(x);
          row.querySelector(".delete").addEventListener("click", function () {deleteTask(i)})
          row.querySelector(".incomplete").addEventListener("click", function () {complete(i)})
        }   
      }
      break

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
  //  insert data into row 
        cell1.innerHTML = obj.taskarr[i].Incomplete;
        cell2.innerHTML = obj.taskarr[i].Task;
        cell3.innerHTML = obj.taskarr[i].update;
        cell4.innerHTML = obj.taskarr[i].startDate;
        cell5.innerHTML = obj.taskarr[i].completeDate;
// Depending if task complete or not add correct buttons
        if (obj.taskarr[i].Incomplete == "Complete") {
          var x = document.createElement("BUTTON");
          x.classList.add("incomplete");
          var t = document.createTextNode("Incomplete");
          x.appendChild(t);
          cell6.appendChild(x);
          x = document.createElement("BUTTON");
          x.classList.add("delete"); 
          t = document.createTextNode("Delete");
          x.appendChild(t);
          cell6.appendChild(x);
          row.querySelector(".incomplete").addEventListener("click",  function () {complete(i)})
          row.querySelector(".delete").addEventListener("click",  function () {deleteTask(i)})
          }
          else {
            var x = document.createElement("BUTTON");
            x.classList.add("complete");
            var t = document.createTextNode("Complete");
            x.appendChild(t);
            cell6.appendChild(x);
            x = document.createElement("BUTTON");
            x.classList.add("update");
            t = document.createTextNode("Update");
            x.appendChild(t);
            cell6.appendChild(x);
            row.querySelector(".update").addEventListener("click", function () {update(i)})
            row.querySelector(".complete").addEventListener("click", function () {complete(i)})

// change color red if overdue code 
        if(obj.taskarr[i].completeDate<todayDate){
          cell1.style.backgroundColor = "#ff0000";
          cell2.style.backgroundColor = "#ff0000";
          cell3.style.backgroundColor = "#ff0000";
          cell4.style.backgroundColor = "#ff0000";
          cell5.style.backgroundColor = "#ff0000";
          cell6.style.backgroundColor = "#ff0000";
          console.log("The Cheques in the post")   
// end of red code
        }
      }
    }
  }

  // And finally this will now Save the tasks to the "localStorage".
  tasksarr = JSON.stringify(obj)
  localStorage.clear();
  localStorage.setItem("tasksarr", JSON.stringify(tasksarr));
}
// Swap Incomplete <> Complete
function complete(whichButton) {
  var table = document.getElementById("task-table");
    // change array cell 0 between Incomplete and complete and add
    rowToChange = Number(whichButton)+2
    console.log(whichButton +" "+rowToChange)
    var cell = document.getElementById("task-table").rows[rowToChange].cells;
      if (cell[0].innerHTML == "Complete") {
        cell[0].innerHTML = "Incomplete";
        cell[5].innerHTML ="";
        var x = document.createElement("BUTTON");
        x.classList.add("complete");
        var t = document.createTextNode("Complete");
        x.appendChild(t);
        cell[5].appendChild(x);
      x = document.createElement("BUTTON");
      x.classList.add("update");
      t = document.createTextNode("Update");
      x.appendChild(t);
      cell[5].appendChild(x);
      cell[5].querySelector(".complete").addEventListener("click", function () {complete(whichButton)})
      cell[5].querySelector(".update").addEventListener("click", function () {update(whichButton)})
      objecttest = JSON.parse(tasksarr)
      objecttest.taskarr[whichButton].Incomplete = "Incomplete"
      }
      else {
        cell[0].innerHTML = "Complete";
        cell[5].innerHTML = "";
        var x = document.createElement("BUTTON");
        x.classList.add("incomplete");
        var t = document.createTextNode("Incomplete");
        x.appendChild(t);
        cell[5].appendChild(x);
        x = document.createElement("BUTTON");
        x.classList.add("delete"); 
        t = document.createTextNode("Delete");
        x.appendChild(t);
        cell[5].appendChild(x);
        cell[5].querySelector(".incomplete").addEventListener("click", function () {complete(whichButton)})
        cell[5].querySelector(".delete").addEventListener("click",  function () {deleteTask(whichButton)})
// Update Array
        tasksarr = JSON.parse(tasksarr)
        tasksarr.taskarr[whichButton].Incomplete = "Complete"
    }
// update local store
    localStorage.clear();
    localStorage.setItem("tasksarr", JSON.stringify(tasksarr));

}

// Update Task
function update(whichButton) {
  var table = document.getElementById("task-table");
  console.log("update")
}

// Delete Task
function deleteTask(whichButton) {
// Add are you Sure?
  x=areYouSure()
// row.remove()
  if (x=="1") {
    rowToDelete = Number(whichButton)+2
    var table = document.getElementById("task-table");
    table.deleteRow(rowToDelete)
// remove row whichButton form array 
  var objecttest = JSON.parse(tasksarr)
  // objecttest.splice(whichButton, 1);
  const x = Number(whichButton)
  delete objecttest.taskarr[1]
  console.log(whichButton+" "+x)
  console.log(objecttest.taskarr)
// update local store and redraw so buttons have correct idenify
  localStorage.clear();
  localStorage.setItem("tasksarr", JSON.stringify(tasksarr));
  const obj = JSON.parse(tasksarr);
  clearTable()
  drawTable(obj) 
}
}


// function to decide what to list in task list
// only display open
function listOpen(){
  document.getElementById("Open").style.backgroundColor="red";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  clearTable()
  const obj = JSON.parse(tasksarr);
  drawTable(obj)
}
// only display closed
function listClosed() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="red";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  clearTable()
  const obj = JSON.parse(tasksarr);
  drawTable(obj) 
}
// only display all
function listAll() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="red";  
  clearTable()
  const obj = JSON.parse(tasksarr);
  drawTable(obj) 
}

function areYouSure() {
  var x;
  if (confirm("Are you sure?") == true) {
      x = 1;
  } else {
      x = 0;
  }
  return x; 
}