/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const students = document.getElementsByClassName('student-item');

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage() {

}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
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
    return(div);
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.


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

