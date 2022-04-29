console.log("Welcome to Notes App. This is app.js");
showNotes();

//If user adds a note add it to the localStorage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObjArray = [];
  } else {
    notesObjArray = JSON.parse(notes);
  }

  var flag1 = true

  notesObjArray.forEach(function (element) {
    //   console.log(element.title)
    if (element.title.toLowerCase() == addTitle.value.toLowerCase()) {
    //   alert("Title alreday taken");
    // console.log("Title alreday taken")
    //   addTxt.value = "";
      addTitle.value = "";
      flag1 = false
      alert("Title already taken! Please enter a different Title name")
    //   break;
    }
  });
  if(flag1==true) {
        let myNotes = {
          title: addTitle.value,
          text: addTxt.value,
        };
        if((addTitle.value!=="") || (addTxt.value!=="")){
        notesObjArray.push(myNotes);
        localStorage.setItem("notes", JSON.stringify(notesObjArray));
        addTxt.value = "";
        addTitle.value = "";
        //   console.log(notesObjArray);
        }
        else{
            alert("Title or Note cannot be empty. Please enter something!");
            // console.log("Title or Note cannot be empty. Please enter something!");
        }
      showNotes();
  }
});

//function to show notes from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObjArray = [];
  } else {
    notesObjArray = JSON.parse(notes);
  }
  let html = "";
  notesObjArray.forEach(function (element, index) {
    html += ` 
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
              <div class="card-body">
                   <h5 class="card-title">${index + 1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObjArray.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`;
  }
}

//function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObjArray = [];
  } else {
    notesObjArray = JSON.parse(notes);
  }

  notesObjArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObjArray));
  showNotes();
}

// Search functionality
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  //   console.log("Input event fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*
Further features:
1.Add title
2.Mark a note as important
3.Separate notes by user
4. Add timer to notify user
5.We can make this app as extension
*/
