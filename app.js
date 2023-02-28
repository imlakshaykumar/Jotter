const inputText = document.querySelector("#input-text")
const from = document.querySelector(".form")
const submitBtn = document.querySelector(".save-btn")
const clearBtn = document.querySelector(".clear-btn")
const unList = document.querySelector(".unorderList")
const list = unList.querySelectorAll('li')

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

function render(textInput) {
    let noteInput = "";
    for (let i = 0; i < textInput.length; i++) {
        noteInput +=
            `
            <li>${textInput[i]}
                <div class="buttons">
                    <button class="edit">edit</button>
                    <button class="delete">delete</button>
                </div>
            </li>
            `;
    }
    unList.innerHTML = noteInput;
    const btns = document.querySelector(".buttons");
    const editBtn = document.querySelector(".edit")
    const deleteBtn = document.querySelector(".delete")

    // FIXME: delete btn
    deleteBtn.addEventListener("click", (e) => {
        let parentList = e.target.parentElement.parentElement
        if (parentList) {
            unList.removeChild(parentList)
        }
    })
}

from.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("enter pressed");
})
