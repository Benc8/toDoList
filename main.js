const addGUI = document.getElementById("addGUI");
const cardHolder = document.getElementById("cardHolder");
const mainTextHolder = document.getElementById("mainTextHolder");

// Load mainText from localStorage or initialize it as an empty array
let toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
let doneList = JSON.parse(localStorage.getItem("doneList")) || [];
let mainText = toDoList;

let listMode = "Today";

function addElementGUI() {
    if (listMode === "Today") {
        addGUI.style.display = "block";
        mainTextHolder.focus();  // Focus the input field when the GUI opens
    }
}

function closeGUI() {
    addGUI.style.display = "none";
    reloadWindow();
}

function reloadWindow() {
    // Clear the existing content in cardHolder
    cardHolder.innerHTML = "";
    if (listMode === "Today") {
        mainText = toDoList;
    }
    if (listMode === "Done") {
        mainText = doneList;
    }
    // Append the elements from mainText array
    mainText.forEach((element, index) => {
        let div = document.createElement("div");
        let heading = document.createElement("h3");
        let text = document.createTextNode(element);

        heading.appendChild(text);
        div.appendChild(heading);
        div.classList.add("toDoItem");

        // Create and append the <h6> elements
        let h6Red = document.createElement("h6");
        h6Red.classList.add("red");
        h6Red.innerHTML = "X";
        h6Red.addEventListener('click', function() {
            removeElement(index);
        });

        let h6Green = document.createElement("h6");
        h6Green.classList.add("green");
        h6Green.innerHTML = "&check;";
        h6Green.addEventListener('click', function() {
            completeElement(index);
        });

        div.appendChild(h6Red);
        div.appendChild(h6Green);

        if(listMode == "Today"){
            // Add onclick event listener
        div.addEventListener('click', function() {
            this.classList.add('clicked');
        });

        // Add onmouseleave event listener
        div.addEventListener('mouseleave', function() {
            this.classList.remove('clicked');
        });
        }
        

        cardHolder.appendChild(div);
    });
}

function addClicked() {
    this.classList.add('clicked');
}

function removeClicked() {
    this.classList.remove("clicked");
}

function addElement() {
    // Add the new value to mainText array
    if (mainTextHolder.value.trim() !== "") {
        mainText.push(mainTextHolder.value.trim());

        // Save the updated mainText array to localStorage
        localStorage.setItem("toDoList", JSON.stringify(toDoList));

        // Clear the input value
        mainTextHolder.value = "";

        // Close the GUI and reload the window
        closeGUI();
    } else {
        alert("Please enter a value.");
    }
}

function removeElement(index) {
    // Add the removed element to the doneList
    doneList.push(mainText[index]);

    // Remove the element from the mainText array
    mainText.splice(index, 1);

    // Save the updated lists to localStorage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));

    // Reload the window to reflect the changes
    reloadWindow();
}

function completeElement(index) {
    // Add the completed element to the doneList
    doneList.push(mainText[index]);

    // Remove the element from the mainText array
    mainText.splice(index, 1);

    // Save the updated lists to localStorage
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    localStorage.setItem("doneList", JSON.stringify(doneList));

    // Reload the window to reflect the changes
    reloadWindow();
}

function switchMode(modeToSwitch) {
    listMode = modeToSwitch;
    // Update the active class on the indicators
    document.querySelectorAll('.indicatorText').forEach(indicator => {
        indicator.classList.remove('active');
    });

    if (listMode === "Today") {
        document.querySelector('.indicatorText[onclick="switchMode(\'Today\')"]').classList.add('active');
    } else if (listMode === "Done") {
        document.querySelector('.indicatorText[onclick="switchMode(\'Done\')"]').classList.add('active');
    }

    // Reload the window to reflect the changes
    reloadWindow();
}

// Handle keydown event to open/close GUI and add element on specific key presses
function handleKeydown(event) {
    if (event.key === 'a' && addGUI.style.display === "none") {
        addElementGUI();
    } else if (event.key === 'Escape' && addGUI.style.display === "block") {
        closeGUI();
    } else if (event.key === 'Enter' && addGUI.style.display === "block") {
        addElement();
    }
}

// Add the event listener for keydown events globally
document.addEventListener('keydown', handleKeydown);

// Initial call to load existing items on page load
reloadWindow();


function resetLocalStorage() {
    // Clear the mainText array
    mainText = [];
    doneList = [];

    // Update the localStorage with the empty arrays
    localStorage.setItem("toDoList", JSON.stringify(mainText));
    localStorage.setItem("doneList", JSON.stringify(doneList));

    // Reload the window to reflect the changes
    reloadWindow();
}
