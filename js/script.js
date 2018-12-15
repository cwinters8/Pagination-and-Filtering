/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const parent = document.getElementsByClassName('page')[0];
const students = document.getElementsByClassName('student-item');

// build an array of arrays, with each child array having ten or less elements
function arrayOfArrays(students) {
    const tens = Math.ceil(students.length / 10);
    let parentArray = [];
    let bottom = 0;
    for (let i = 1; i <= tens; i++) {
        const top = i * 10;
        let childArray = [];
        for (let j = bottom; j < top; j++) {
            if (j < students.length) {
                childArray.push(students[j]);
            }
        }
        bottom = bottom + 10;
        parentArray.push(childArray);
    }
    return(parentArray);
}

// takes in a list of students that should be displayed
function showPage(list) {
    // unhide all students
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = '';
    }
    // hide the appropriate students
    for (let i = 0; i < students.length; i++) {
        if (!list.includes(students[i])) {
            students[i].style.display = 'none';
        }
    }
}

// creates page links and adds a click event listener for each
function appendPageLinks(array) {
    const num = array.length;
    // clear existing div it if exists
    const oldDiv = document.getElementsByClassName('pagination')[0];
    if (oldDiv) {
        parent.removeChild(oldDiv);
    }
    // create new elements
    const div = document.createElement('div');
    div.className = 'pagination';
    const ul = document.createElement('ul');
    div.appendChild(ul);
    parent.appendChild(div);
    for (let i = 0; i < num; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = (i + 1);
        li.appendChild(a);
        ul.appendChild(li);
    }
    ul.children[0].children[0].className = 'active';
    // set an event listener for each page link
    for (let i = 0; i < ul.children.length; i++) {
        const a = ul.children[i].children[0];
        a.addEventListener('click', () => {
            // move active class to the appropriate link
            const old = document.getElementsByClassName('active')[0];
            old.className = '';
            a.className = 'active';
            // display the new results
            showPage(array[i]);
        })
    }
    return(ul);
}

// wrapper to execute functions
function exec(list) {
    const array = arrayOfArrays(list);
    showPage(array[0]);
    appendPageLinks(array);
}

// function to add search box
function createSearchBox() {
    const header = document.getElementsByClassName('page-header')[0];
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    const input = document.createElement('input');
    input.placeholder = 'Search for students...';
    searchDiv.appendChild(input);
    const button = document.createElement('button');
    button.textContent = 'Search';
    searchDiv.appendChild(button);
    header.appendChild(searchDiv);
    return(searchDiv);
}

// add a not found message and hide elements
function notFound() {
    clearNotFound();
    const sibling = document.getElementsByClassName('student-list')[0];
    const message = document.createElement('h3');
    message.id = 'not-found';
    message.textContent = 'No students found';
    parent.insertBefore(message, sibling);
    // hide elements
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }
    const paginationDiv = document.getElementsByClassName('pagination')[0];
    if (paginationDiv) {
        parent.removeChild(paginationDiv);
    }
}

// clear not found message
function clearNotFound() {
    // clear existing message if exists
    const message = document.getElementById('not-found');
    if (message) {
        parent.removeChild(message);
    }
}

// show the initial page
exec(students);

// add search feature structure
const searchDiv = createSearchBox();
const searchInput = searchDiv.firstElementChild;

// listen for change on search input and filter results
searchInput.addEventListener('input', () => {
    clearNotFound();
    let value = searchInput.value.toUpperCase();
    let list = [];
    if (value.length > 0) {
        for (let i = 0; i < students.length; i++) {
            const studentName = students[i].firstElementChild.children[1].textContent.toUpperCase();
            if (studentName.indexOf(value) > -1) {
                list.push(students[i]);
            }
        }
        if (list.length > 0) {
            exec(list);
        } else {
            notFound();
        }
    } else {
        exec(students);
    }
})