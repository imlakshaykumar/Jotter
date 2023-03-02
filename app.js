// TODO: if no item is present, Hide the clear button

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
            `<li>${textInput[i]}
                <div class="buttons">
                    <button class = "edit-btn">
                        <i class="fa-solid fa-file-pen"></i>
                    </button>
                    <button class = "delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </li>`;
    }
    unList.innerHTML = noteInput;
    // const btns = document.querySelector(".buttons");
    const editBtn = document.querySelectorAll(".edit-btn")
    const deleteBtn = document.querySelectorAll(".delete-btn")

    editBtn.forEach(eBtn => {
        eBtn.addEventListener("click", (e) => {
            editListItem(e);
        })
    })

    deleteBtn.forEach(dBtn => {
        dBtn.addEventListener("click", (e) => {
            removeListItem(e);
        })
    })
}

function editListItem(e) {
    const element = e.target.parentElement.parentElement;
    if (element) {
        const text = element.firstChild.textContent.trim();
        // console.log(text);
        let index = -1;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] === text) {
                index = i;
                break;
            }
        }
        if (index >= 0) {

            alert("Index of that element is: " + index)
            // console.log(localStorage.getItem("notes", JSON.stringify(notes)));
            console.log(notesFromLocalStorage[index]);
            inputText.value = notes[index]

            inputText.addEventListener("input", (e) => {

            })
        }
    }
}

function removeListItem(e) {
    const element = e.target.parentElement.parentElement.parentElement;
    // console.log(element);
    if (element) {
        const text = element.firstChild.textContent.trim();
        // // console.log(text);
        // console.log(element.firstChild.textContent.trim());
        // // localStorage.removeItem(text)

        // const textIndex = notesFromLocalStorage.findIndex((list) => list.id === text)
        // if (textIndex !== -1) {
        //     notesFromLocalStorage.splice(textIndex, 1);
        //     localStorage.setItem('notesFromLocalStorage', JSON.stringify(notesFromLocalStorage))
        //     localStorage.removeItem(text);
        // }
        // console.log(textIndex);
        unList.removeChild(element)

        let index = -1;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i] === text) {
                index = i;
                break;
            }
        }

        if (index >= 0) {
            // alert("Index of that element is: " + index)
            notes.splice(index, 1) // splice is used to delete from array/List
            localStorage.setItem("notes", JSON.stringify(notes))
            // alert("item deleted from localStorage") 
            console.log("item deleted from localStorage")
        } else {
            alert("Element not found")
        }
    }
}
from.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("enter pressed");
})
