// Ensure HTML loads before JavaScript runs
$(document).ready(function() {
    
    // Define Global Variable
    var currentHour = parseInt(moment().hour(Number).format("HH")); 
    // yield number of current hour

    // DOM elements - used vanilla js instead of jquery to ensure all elements in classes are selected
    var hoursList = document.querySelectorAll(".hour"); 
    var inputList = document.querySelectorAll(".inputText");

    // Declare Global Variables to be used later on
    var dataHour;
    var inputBlock;
    var userInput;
    
    // Get current date to display in the <p id="currentDay"> tag
        // To get current date: moment()._d; 
        // Format: m.format(dddd, MMMM Do YYYY);
    $("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));
    
    // Reset local storage at end of the day
    reset();
    // Retrive items from local storage and display on page
    init();
    
    // Textarea input will have .past, .present, or .future class; work with moment to get current time

    // Retreive data-hr value from hour divs
    for (var i=0; i<hoursList.length; i++) {
        dataHour = parseInt(hoursList[i].getAttribute("data-hr"));

        // Using toggle logic & conditionals (if/else) // Add/remove classes .past, .present, .future --> .classList.add/remove
        if (dataHour === currentHour) {
            hoursList[i].nextElementSibling.classList.add("present");
            hoursList[i].nextElementSibling.classList.remove("past");
            hoursList[i].nextElementSibling.classList.remove("future");
        }
        else if (dataHour < currentHour) {
            hoursList[i].nextElementSibling.classList.add("past");
            hoursList[i].nextElementSibling.classList.remove("present");
            hoursList[i].nextElementSibling.classList.remove("future");
        }
        else { // in this case, dataHour > currentHour
            hoursList[i].nextElementSibling.classList.add("future");
            hoursList[i].nextElementSibling.classList.remove("past");
            hoursList[i].nextElementSibling.classList.remove("present");
        }
    }
    
    // saveBtn will be working with local storage

    // Click event on saveBtn triggers storeTask function
    $(".saveBtn").on("click", storeTask);
    
    // Will use localStorage.setItem on saveBtn click event
    function storeTask(event) {
        inputBlock = event.target.previousElementSibling;
        userInput = inputBlock.value.trim();
        inputBlock.textContent = userInput;
        inputBlock.parentElement.append(userInput);
        var dataNum = inputBlock.getAttribute("data-num");
        localStorage.setItem("userInput " + dataNum, userInput);
        init();
    }

    // Will use localStorage.getItem when page refreshed
    function init() {
        for (var i=0; i<inputList.length; i++) {
            var storedTasks = localStorage.getItem("userInput " + i);
        
            if (storedTasks !== null) {
                inputList[i].textContent = storedTasks;
            }
        }
    }

    // Remove all tasks at the end of the day
    function reset() {
        if (currentHour === 0) {          
            localStorage.clear();
        }
    }

});