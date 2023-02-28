const inputText = document.querySelector("#input-text")
const from = document.querySelector(".form")
const submitBtn = document.querySelector(".save-btn")
const clearBtn = document.querySelector(".clear-btn")
const unList = document.querySelector(".unorderList")
const editBtn = document.querySelector(".edit-btn")

let notes = []
const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"))

if (notesFromLocalStorage) {
    notes = notesFromLocalStorage;
    render(notes)
}

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    notes = []
    render(notes)
})
submitBtn.addEventListener("click", () => {

    // if value is empty, do note add value to the notes (localStorage)
    if (inputText.value === "") {
        console.log("empty value");
        // alert("Enter value first")
        return;
    }
    notes.push(inputText.value)
    inputText.value = "";
    localStorage.setItem("notes", JSON.stringify(notes))
    render(notes)
})

// TODO: add button which can edit and delete the certain list item
function render(textInput) {
    let noteInput = "";
    for (let i = 0; i < textInput.length; i++) {
        noteInput +=
            `
                <li>${textInput[i]}</li>
                <div class="buttons">
                    <button class="edit-btn">edit</button>
                </div>
            `;
    }
    unList.innerHTML = noteInput;
}
from.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("enter pressed");
})
