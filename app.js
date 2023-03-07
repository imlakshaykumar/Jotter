const inputText = document.querySelector("#input-text")
const from = document.querySelector(".form")
const submitBtn = document.querySelector(".save-btn")
const clearBtn = document.querySelector(".clear-btn")
const clearBtnDiv = document.querySelector(".clear-btn-div")
const unList = document.querySelector(".unorderList")

let editButton = false;
let newTextValue = "";
let index = 0;

let notes = []
const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"))

//check for null, if null hide the clear button
function checkNull() {
    if (notes.length === 0 || localStorage.getItem("notes") === null) {
        clearBtnDiv.style.display = "none"
        localStorage.clear()
    } else {
        clearBtnDiv.style.display = "block"
    }
}

function render(textInput) {
    let noteInput = "";
    for (let i = 0; i < textInput.length; i++) {
        noteInput +=
            `<li data-id="${i + 1}">${textInput[i]}
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

    // console.log(unList.childNodes);

    // check for null, if null hide the clear item button
    checkEdit()
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
    checkNull();
}

if (notesFromLocalStorage) {
    notes = notesFromLocalStorage;
    render(notes)
}

function checkEdit() {
    if (editButton) {
        // console.log("edit button: Visible");
        submitBtn.classList.add("show-main-btn")
    } else {
        // console.log("add button: visible");
        submitBtn.classList.remove("show-main-btn")
    }
}

function editListItem(e) {
    editButton = true;
    const element = e.target.closest('li[data-id')
    // console.log(element);

    // const tasklist = document.querySelectorAll('li');
    // console.log(taskList);

    if (element) {
        const dataID = element.getAttribute('data-id')
        // console.log(dataID);

        let textOfElement = element.textContent.trim();
        // console.log(`${textOfElement} ${dataID}`);

        const taskList = Array.from(document.querySelectorAll('li'))

        index = taskList.findIndex(
            (item) =>
                item.getAttribute('data-id') == dataID &&
                item.textContent.trim() === textOfElement
        );

        console.log(`index: ${index}, textContent: ${textOfElement}`);
        if (index >= 0) {
            inputText.value = textOfElement
            inputText.addEventListener('input', (e) => {
                const newText = e.target.value;
                // console.log(newText);
                // taskList[index].firstChild.textContent = newText
                // console.log(textOfElement);
                newTextValue = newText;
            });
        }
        console.log(index);

        // let dataIndex = -1;
        // let index = -1;
        // tasklist.forEach(item => {
        //     // console.log(item)
        //     if (item.getAttribute('data-id') === dataID) {
        //         // console.log(`${dataID}`);
        //         dataIndex = dataID;
        //         // console.log(item);
        //     }
        // })
        // for (let i = 0; i < tasklist.length; i++) {
        //     if (tasklist[i].textContent.trim() === textOfElement) {
        //         if (tasklist[i].getAttribute('data-id') === dataIndex) {
        //             index = i;
        //         } else {
        //             continue;
        //         }
        //     }
        // }
        // console.log(index);
    }
    render(notes)
}

function removeListItem(e) {

    const element = e.target.closest('li[data-id]');
    // const tasklist = document.querySelectorAll('li')
    // console.log(element);

    if (element) {
        const dataID = element.getAttribute('data-id')
        // console.log(dataID);
        const textOfElement = element.textContent.trim();
        // console.log(`${textOfElement} ${dataID}`);

        const taskList = Array.from(document.querySelectorAll('li'))

        index = taskList.findIndex(
            (item) =>
                item.getAttribute('data-id') == dataID &&
                item.textContent.trim() === textOfElement
        );

        // let dataIndex = -1;
        // let index = -1;
        // tasklist.forEach(item => {
        //     // console.log(item)
        //     if (item.getAttribute('data-id') === dataID) {
        //         // console.log(`${dataID}`);
        //         dataIndex = dataID;
        //         // console.log(item);
        //     }
        // })
        // for (let i = 0; i < tasklist.length; i++) {
        //     // const element = array[i];
        //     if (tasklist[i].textContent.trim() === textOfElement) {
        //         if (tasklist[i].getAttribute('data-id') === dataIndex) {
        //             index = i;
        //         } else {
        //             continue;
        //         }
        //     }
        // }
        // console.log(index);
        // console.log(dataIndex);
        unList.removeChild(element)
        if (index >= 0) {
            notes.splice(index, 1)
            localStorage.setItem("notes", JSON.stringify(notes))
            console.log(`deleted at index: ${index}`);
        } else {
            console.log("item not found");
        }
    }
    render(notes)
}

submitBtn.addEventListener("click", () => {
    // if value is empty, do note add value to the notes (localStorage)
    if (editButton) {
        // console.log("edit button");
        console.log(`new value: ${newTextValue}`);
        // console.log(index);
        notes = notes.map((item, i) => {
            if (index === i) {
                // console.log(notes.indexOf(item)); //false
                // console.log(`i: ${i} and index: ${index}`);
                // item = newTextValue
                // console.log(item);
                if (newTextValue === "") {
                    alert("plz enter value first")
                } else {
                    return newTextValue
                }
            }
            return item;
        })
        // console.log(notes);
        render(notes);
        localStorage.setItem("notes", JSON.stringify(notes))
        index = 0;
        inputText.value = "";
        editButton = false;
    } else {
        if (inputText.value === "") {
            console.log("empty value");
            // alert("Enter value first")
            return;
        }
        notes.push(inputText.value)
        inputText.value = "";
        localStorage.setItem("notes", JSON.stringify(notes))
        render(notes)
    }
})

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    notes = []
    render(notes)
})

from.addEventListener("submit", (e) => {
    e.preventDefault();
    checkEdit()
    // console.log("enter pressed");
})

