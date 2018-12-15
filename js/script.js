/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

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

// creates as many page links as the number passed
function appendPageLinks(num) {
    // get parent div
    const parent = document.getElementsByClassName('page')[0];
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
    return(ul);
}

// show the initial page
const array = arrayOfArrays(students);
showPage(array[0]);
// add page links to bottom of page
const ul = appendPageLinks(array.length);

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

// add search feature structure
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