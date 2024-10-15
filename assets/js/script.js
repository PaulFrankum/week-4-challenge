
// default all with red backgroud
document.getElementById("Open").style.backgroundColor="#2d3e50";
document.getElementById("Closed").style.backgroundColor="#2d3e50";
document.getElementById("All").style.backgroundColor="red"; 

// This loads stored object array.
const taskarr = JSON.parse(localStorage.getItem("tasksarr")) || [];

console.log(taskarr)

// get input values
const sEl = document.getElementById("complete");
const sE2 = document.getElementById("newTask");
const sE3 = document.getElementById("update");
const sE4 = document.getElementById("startDate");
const sE5 = document.getElementById("completeDate");

// some default tasks for testing
let tasksarr ='{"taskarr":['+
'{"Incomplete": "Incomplete", "Task": "do washing", "update": "waiting for washing powder", "startDate": "2024-10-13","completeDate": "2024-10-17"},'+
'{"Incomplete": "Complete", "Task": "Wash Windows", "update": "waiting for Ladders", "startDate": "2024-10-15","completeDate": "2024-10-24"},'+
'{"Incomplete": "Incomplete", "Task": "Wash Windows", "update": "waiting for Ladders", "startDate": "2024-10-15","completeDate": "2024-10-24"}]}'; 

newTask()

// get event for new task button
const sbntEl = document.getElementById("newTaskButton");
sbntEl.addEventListener("click", newTask);

// get event for open task button
const sbopEl = document.getElementById("Open");
sbopEl.addEventListener("click", listOpen);

// get event for closed task button
const sbclEl = document.getElementById("Closed");
sbclEl.addEventListener("click", listClosed);

// get event for all task button
const sballEl = document.getElementById("All");
sballEl.addEventListener("click", listAll);

function listOpen(){
  document.getElementById("Open").style.backgroundColor="red";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="#2d3e50";
  }
function listClosed() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="red";
  document.getElementById("All").style.backgroundColor="#2d3e50";  
  }
function listAll() {
  document.getElementById("Open").style.backgroundColor="#2d3e50";
  document.getElementById("Closed").style.backgroundColor="#2d3e50";
  document.getElementById("All").style.backgroundColor="red";  
  }


// function for when a new task button clicked
function newTask() {
// Capure Input Data
const task1 = sEl.value;
const task2 = sE2.value;
const task3 = sE3.value;
const task4 = sE4.value;
const task5 = sE5.value;
const taskadd = {"Incomplete": task1, "Task": task2, "update": task3, "startDate": task4,"completeDate": task5}

const obj = JSON.parse(tasksarr);
drawTable(obj)

// draw the table with tasks
function drawTable(obj) {

// obj.tasksarr.push(taskadd)

// check color of buton to pick if to print all closed open
if (document.getElementById("All").style.backgroundColor == "red"){list="All"}
if (document.getElementById("Open").style.backgroundColor == "red"){list="Open"}
if (document.getElementById("Closed").style.backgroundColor == "red"){list="Closed"}


// decides what list to print ie all complete or incomplete
switch(list){
    case list="Open":
        console.log("test")
      for(let i=0; obj.taskarr.length > i; i++) {
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
    for(let i=0; obj.taskarr.length > i; i++) {
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
          cell6.innerHTML = "Incomplete Delete";
    }
}
    break;
    
    case list="All":
    for(let i=0; obj.taskarr.length > i; i++) {
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
          cell6.innerHTML = "Incomplete Delete";
        }
        else {
          cell6.innerHTML = "Complete Update";       
        }
    }
}

// Clear input Values to deafult 
document.getElementById('complete').value="Incomplete";
document.getElementById('newTask').value="";
document.getElementById('update').value="";
document.getElementById('startDate').value="2024-10-14";
document.getElementById('completeDate').value="2024-10-21";

// And finally this will now Save and Update the tasks to the "localStorage".
localStorage.setItem("tasks", JSON.stringify(tasksarr)); 

}
}