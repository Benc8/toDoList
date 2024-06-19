const addGUI = document.getElementById("addGUI");
const cardHolder = document.getElementById("cardHolder");
const mainText = ["KYS2","KYS4"];
const mainTextHolder = document.getElementById("mainTextHolder");

function addElementGUI(){
    addGUI.style.display = "block";
};

function closeGUI(){
    addGUI.style.display = "none";
    reloadWindow();
}

function reloadWindow(){
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

function addElement(){
    mainText += mainTextHolder.nodeValue;
}