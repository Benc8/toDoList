const addGUI = document.getElementById("addGUI");
const cardHolder = document.getElementById("cardHolder");
const mainTextHolder = document.getElementById("mainTextHolder");

// Load mainText from localStorage or initialize it as an empty array
let mainText = JSON.parse(localStorage.getItem("mainText")) || [];

function addElementGUI() {
    addGUI.style.display = "block";
    mainTextHolder.focus();  // Focus the input field when the GUI opens
}

function closeGUI() {
    addGUI.style.display = "none";
    reloadWindow();
}

function reloadWindow() {
    // Clear the existing content in cardHolder
    cardHolder.innerHTML = "";

    // Append the elements from mainText array
    mainText.forEach(element => {
        let div = document.createElement("div");
        let heading = document.createElement("h3");
        let text = document.createTextNode(element);

        heading.appendChild(text);
        div.appendChild(heading);
        div.classList.add("toDoItem");
        cardHolder.appendChild(div);
    });
}

function addElement() {
    // Add the new value to mainText array
    if (mainTextHolder.value.trim() !== "") {
        mainText.push(mainTextHolder.value.trim());

        // Save the updated mainText array to localStorage
        localStorage.setItem("mainText", JSON.stringify(mainText));

        // Clear the input value
        mainTextHolder.value = "";

        // Close the GUI and reload the window
        closeGUI();
    } else {
        alert("Please enter a value.");
    }
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


// Initial call to load existing items on page load
reloadWindow();
document.addEventListener('keydown', handleKeydown);


function resetLocalStorage() {
    // Clear the mainText array
    mainText = [];

    // Update the localStorage with the empty array
    localStorage.setItem("mainText", JSON.stringify(mainText));

    // Reload the window to reflect the changes
    reloadWindow();
}

