1// default all with red backgroud
document.getElementById("Open").style.backgroundColor="#2d3e50";
document.getElementById("Closed").style.backgroundColor="#2d3e50";
document.getElementById("All").style.backgroundColor="red"; 

// This loads data from local storage.
var tasksarr = JSON.parse(localStorage.getItem("tasksarr")) || [];
if (tasksarr.length==0){
  console.log("create task")
  var tasksarr ='{"taskarr":['+
    '{"Incomplete": "Incomplete", "Task": "Sample One", "update": "e.g. Waiting for part delivery", "startDate": "2024-10-13","completeDate": "2024-10-17"},'+
    '{"Incomplete": "Complete", "Task": "Sample Two", "update": "e.g.waitingfor call back", "startDate": "2024-10-15","completeDate": "2024-10-24"},'+
    '{"Incomplete": "Incomplete", "Task": "Sample Three", "update": "", "startDate": "2024-10-15","completeDate": "2024-10-24"}]}'; 
    tasksarr =JSON.parse(tasksarr)
}

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
  document.getElementById("complete").value= "Incomplete";
  document.getElementById("newTask").value= "";
  document.getElementById("update").value= "";
  document.getElementById("startDate").value= date;
  document.getElementById("completeDate").value= date2;
  document.getElementById("searchBar").placeholder="Search tasks..."
}

// retieve date and format and add number of days requested
function dateRetieve(addDays){
  var now = new Date();  
  var month = now.getMonth()+1;
  var day = now.getDate()+Number(addDays);
  var year = now.getFullYear();
  if (day >=28 && month == 2) { 
    month = month + 1
    day = day -28
  }
  else {
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      if (day>=30) {
        month=month+1
        day = day -30
      }
    }
    else {
      if (day>=31) { 
        month = month + 1
        if (month == 13){
          month = 1
          year = year + 1
        }
        day = day -31
      }
    }
  }
  if (year<10){
    year = "0"+ year
  }
  if (month<10) {
    month= "0"+ month
  }
  if (day<10) {
    day= "0" +day
  }
  
  return year + "-" + month + "-"+ day;
}

// Search function
function searchBar(){
  const search = document.getElementById("searchBar").value;
  document.getElementById("searchBar").Value = "";
// Check if blank
  if (search==""){
    alert("No search enter!")
    return
  }
// check if search is found   
  let stringArr = JSON.stringify(tasksarr);
  let result = stringArr.indexOf(search);
  if (result==-1){
    alert("search not found!")
   return
  }
// Change button to all so all will display in result
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="#2d3e50"; 
  document.getElementById("All").style.backgroundColor="red";
  clearTable()
  
// Code to write to complete search
// Start redrawing screen
  var list="All"
  todayDate=dateRetieve(0)
  for(let i=0; tasksarr.taskarr.length > i; i++){
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
    cell1.innerHTML = tasksarr.taskarr[i].Incomplete;
    cell2.innerHTML = tasksarr.taskarr[i].Task;
    cell3.innerHTML = tasksarr.taskarr[i].update;
    cell4.innerHTML = tasksarr.taskarr[i].startDate;
    cell5.innerHTML = tasksarr.taskarr[i].completeDate;
// Depending if task complete or not add correct buttons
    if (tasksarr.taskarr[i].Incomplete == "Complete") {
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
      x.setAttribute("id", "update");
      t = document.createTextNode("Update");
      x.appendChild(t);
      cell6.appendChild(x);
      if (tasksarr.taskarr[i].completeDate<todayDate) {
        // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          cell1.style.backgroundColor = "#ff0000";
          cell2.style.backgroundColor = "#ff0000";
          cell3.style.backgroundColor = "#ff0000";
          cell4.style.backgroundColor = "#ff0000";
          cell5.style.backgroundColor = "#ff0000";
          cell6.style.backgroundColor = "#ff0000";
        }
      row.querySelector(".update").addEventListener("click", function () {update(i)})
      row.querySelector(".complete").addEventListener("click", function () {complete(i)})
    }
// hide rows that do not match search
    var obj = tasksarr.taskarr[i]
    let stringArr = JSON.stringify(obj);
    let result = stringArr.indexOf(search);
    if (result == -1){
      cell1.style.display = "None";
      cell2.style.display = "None";
      cell3.style.display = "None";
      cell4.style.display = "None";
      cell5.style.display = "None";
      cell6.style.display = "None";  
    }
  }
  document.getElementById("searchBar").value="Search tasks..."
}    

// clear table
function clearTable() {
  var table = document.getElementById("task-table");
  numberOfRows = document.getElementById("task-table").rows.length;
  if(numberOfRows>1){
    for(i=numberOfRows; i>1; i-- ){
      var row = table.deleteRow(1);
    }
  }
}

// function for when a new task button clicked
function newTask() {
// if list is on complete change to open otherwise task will not show
  if (document.getElementById("Closed").style.backgroundColor == "red") {
    document.getElementById("Open").style.backgroundColor="red";
    document.getElementById("Closed").style.backgroundColor="#2d3e50";
    document.getElementById("All").style.backgroundColor="#2d3e50";
  }
  if (document.getElementById("newTask").value==""){
    alert("No task enter!")
    return
  }
// get input values into tasksAdd
  var tasksAdd = {
  "Incomplete": document.getElementById("complete").value,
  "Task": document.getElementById("newTask").value,
  "update": document.getElementById("update").value,
  "startDate": document.getElementById("startDate").value,
  "completeDate": document.getElementById("completeDate").value
  }
// add to new task to task array
  tasksarr.taskarr.push(tasksAdd);
// clear values and call redraw task table 
  clearTable()
  inputValueReset()
  drawTable(tasksarr) 
}
  
//Redraw Table
function drawTable(obj) {
// check color of buton to pick if to print all closed open
  if (document.getElementById("All").style.backgroundColor == "red"){list="All"}
  if (document.getElementById("Open").style.backgroundColor == "red"){list="Open"}
  if (document.getElementById("Closed").style.backgroundColor == "red"){list="Closed"}
// decides what list to print ie all complete or incomplete
  todayDate=dateRetieve(0)
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
      x.setAttribute("id", "incomplete");
      var t = document.createTextNode("Incomplete");
      x.appendChild(t);
      cell6.appendChild(x);
      x = document.createElement("BUTTON");
      x.classList.add("delete"); 
      x.setAttribute("id", "delete");
      t = document.createTextNode("Delete");
      x.appendChild(t);
      cell6.appendChild(x);
// hide row that should not be should when closed or open option choosen 
      // style="display:None;"
      // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      if (list=="Open") {
        cell1.style.display = "None";
        cell2.style.display = "None";
        cell3.style.display = "None";
        cell4.style.display = "None";
        cell5.style.display = "None";
        cell6.style.display = "None";
      }
      row.querySelector(".incomplete").addEventListener("click",  function () {complete(i)})
      row.querySelector(".delete").addEventListener("click",  function () {deleteTask(i)})
      }
    else {
      var x = document.createElement("BUTTON");
      x.classList.add("complete");
      x.setAttribute("id", "complete");
      var t = document.createTextNode("Complete");
      x.appendChild(t);
      cell6.appendChild(x);
      x = document.createElement("BUTTON");
      x.classList.add("update");
      x.setAttribute("id", "update");
      t = document.createTextNode("Update");
      x.appendChild(t);
      cell6.appendChild(x);
// hide row that should not be should when closed or open option choosen 
      // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      if (list=="Closed") {
        cell1.style.display = "None";
        cell2.style.display = "None";
        cell3.style.display = "None";
        cell4.style.display = "None";
        cell5.style.display = "None";
        cell6.style.display = "None";
      }
      row.querySelector(".update").addEventListener("click", function () {update(i)})
      row.querySelector(".complete").addEventListener("click", function () {complete(i)})
// change color red if overdue code 
      if (obj.taskarr[i].completeDate<todayDate) {
      // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        cell1.style.backgroundColor = "#ff0000";
        cell2.style.backgroundColor = "#ff0000";
        cell3.style.backgroundColor = "#ff0000";
        cell4.style.backgroundColor = "#ff0000";
        cell5.style.backgroundColor = "#ff0000";
        cell6.style.backgroundColor = "#ff0000";
// console.log("The Cheques in the post")   
// end of red code
      }
    }
  }
  // And finally this will now Save the tasks to the "localStorage".
  localStorage.clear();
  localStorage.setItem("tasksarr", JSON.stringify(tasksarr));
} 

// Swap Incomplete <> Complete
function complete(whichButton) {
  var table = document.getElementById("task-table");
  todayDate=dateRetieve(0)
// check color of buton to pick if to print all closed open
  if (document.getElementById("All").style.backgroundColor == "red"){list="All"}
  if (document.getElementById("Open").style.backgroundColor == "red"){list="Open"}
  if (document.getElementById("Closed").style.backgroundColor == "red"){list="Closed"}
// change array cell 0 between Incomplete and complete and add
    rowToChange = Number(whichButton)+1
    var cell = document.getElementById("task-table").rows[rowToChange].cells;

    if (cell[0].innerHTML == "Complete") {
      cell[0].innerHTML = "Incomplete";
      cell[5].innerHTML ="";
// check if background should be red as change to task Incomplete      
      if (tasksarr.taskarr[whichButton].completeDate<todayDate) {
        // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        for (j=0; j<=5; j++){ 
          console.log("false"+j) 
          cell[j].style.backgroundColor = "rgb(255, 0, 0)";
        }
      }
      var x = document.createElement("BUTTON");
      x.classList.add("complete");
      x.setAttribute("id", "complete");
      var t = document.createTextNode("Complete");
      x.appendChild(t);
      cell[5].appendChild(x);
      x = document.createElement("BUTTON");
      x.classList.add("update");
      x.setAttribute("id", "update");
      t = document.createTextNode("Update");
      x.appendChild(t);
      cell[5].appendChild(x);
      cell[5].querySelector(".complete").addEventListener("click", function () {complete(whichButton)})
      cell[5].querySelector(".update").addEventListener("click", function () {update(whichButton)})
      tasksarr.taskarr[whichButton].Incomplete = "Incomplete"
    }

      else {
        cell[0].innerHTML = "Complete";
        cell[5].innerHTML = "";
// check if background red and change to white as task complete        
        if (cell[0].style.backgroundColor=="rgb(255, 0, 0)") {
          // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          for (j=0; j<=5; j++){  
            console.log("true"+j)
            cell[j].style.backgroundColor = "rgb(255, 255, 255)";
          }
        }  
        var x = document.createElement("BUTTON");
        x.classList.add("incomplete");
        x.setAttribute("id", "incomplete");
        var t = document.createTextNode("Incomplete");
        x.appendChild(t);
        cell[5].appendChild(x);
        x = document.createElement("BUTTON");
        x.classList.add("delete"); 
        x.setAttribute("id", "delete");
        t = document.createTextNode("Delete");
        x.appendChild(t);
        cell[5].appendChild(x);
        cell[5].querySelector(".incomplete").addEventListener("click", function () {complete(whichButton)})
        cell[5].querySelector(".delete").addEventListener("click",  function () {deleteTask(whichButton)})
// Update Array
        tasksarr.taskarr[whichButton].Incomplete = "Complete"
    }
    if (list=="Closed" || list=="Open"){
          // select row quicker  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      for (j=0; j<=5; j++){  
        cell[j].style.display = "None";
      } 
    }
// update local store
    localStorage.clear();
    localStorage.setItem("tasksarr", JSON.stringify(tasksarr));
}

// Update Task
function update(whichButton) {
  const x= Number(whichButton)
  var table = document.getElementById("task-table");
// Change screen to Update Task
  document.getElementById("h2").innerHTML = "Update Task";
  document.getElementById("update").style.display = "inline-flex";
  document.getElementById("newTaskButton").style.display = "None";
  document.getElementById("saveButton").style.display = "inline-flex";
  document.getElementById("cancelButton").style.display = "inline-flex";
  document.getElementById("Open").style.display = "None";
  document.getElementById("Closed").style.display = "None";
  document.getElementById("All").style.display = "None";
// hides action cells would be better to hide button <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  for(let i=1; tasksarr.taskarr.length+1 > i; i++) {
    var cell = document.getElementById("task-table").rows[i].cells;
    cell[5].style.display = "None";
  }

  // add value to input update task
  document.getElementById('newTask').value= tasksarr.taskarr[x].Task;
  document.getElementById('update').value= tasksarr.taskarr[x].update;
  document.getElementById('startDate').value= tasksarr.taskarr[x].startDate;
  document.getElementById('completeDate').value = tasksarr.taskarr[x].completeDate;
// get event for save and cancel button
  const  saveButtonEl = document.getElementById("saveButton");
  saveButtonEl.addEventListener("click",  function () {saveButton(x)})
  const cancelButtonEl = document.getElementById("cancelButton");
  cancelButtonEl.addEventListener("click",  function () {cancelButton()})
}

// Cancel button when in Update Task
function cancelButton() {
  document.getElementById("h2").innerHTML = "New Task";
  document.getElementById("update").style.display = "None";
  document.getElementById("newTaskButton").style.display = "inline-flex";
  document.getElementById("saveButton").style.display = "None";
  document.getElementById("cancelButton").style.display = "None";
  document.getElementById("Open").style.display = "inline-flex";
  document.getElementById("Closed").style.display = "inline-flex";
  document.getElementById("All").style.display = "inline-flex";
// show action cells would be better to show button <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  for(let i=1; tasksarr.taskarr.length+1 > i; i++) {
    var cell = document.getElementById("task-table").rows[i].cells;
    cell[5].style.display = "inline-flex";
  }
  inputValueReset()
}

function saveButton(x) {
  x=x+1
// write change to table
  var cell = document.getElementById("task-table").rows[x].cells;
  cell[1].innerHTML = document.getElementById("newTask").value,
  cell[2].innerHTML = document.getElementById("update").value,
  cell[3].innerHTML = document.getElementById("startDate").value,
  cell[4].innerHTML = document.getElementById("completeDate").value
// write changes to array
  x=x-1
  tasksarr.taskarr[x].Task = document.getElementById("newTask").value,
  tasksarr.taskarr[x].update = document.getElementById("update").value,
  tasksarr.taskarr[x].startDate = document.getElementById("startDate").value,
  tasksarr.taskarr[x].completeDate = document.getElementById("completeDate").value 
// change value to default and hide and reshow to be in New task screen
  localStorage.clear();
  localStorage.setItem("tasksarr", JSON.stringify(tasksarr));
// Refresh the page to fix update bug when change 2nd update must be a better way<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
location.reload();
// remove 2 line above and make 3 lines below if fix bug
// cancelButton()
// clearTable() 
// drawTable(tasksarr)
}

// Delete Task
function deleteTask(whichButton) {
// Add are you Sure?
  x=areYouSure()
// row.remove if sure?
  if (x=="1") {
    rowToDelete = Number(whichButton)
    var table = document.getElementById("task-table");
// table.deleteRow(rowToDelete)
    tasksarr.taskarr.splice(rowToDelete, 1);
// update local store and redraw so buttons have correct idenify
    localStorage.clear();
    localStorage.setItem("tasksarr", JSON.stringify(tasksarr));
    clearTable()
    drawTable(tasksarr) 
  }
}

// functions to decide what to list in task list
// only display open tasks
function listOpen(){
  document.getElementById("Open").style.backgroundColor="red";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  clearTable()
  drawTable(tasksarr)
}
// only display closed tasks
function listClosed() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="red";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  clearTable()
  drawTable(tasksarr) 
}
// display all tasks
function listAll() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="red";  
  clearTable()
  drawTable(tasksarr) 
}

// are you sure function
function areYouSure() {
  var x;
  if (confirm("Are you sure?") == true) {
      x = 1;
  } else {
      x = 0;
  }
  return x; 
}