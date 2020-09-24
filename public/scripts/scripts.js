'use strict'

const addItemsButton = document.getElementById('addItemsButton');
const closeAddItems = document.getElementById('closeAddItems');
const ingredList = document.getElementById('ingredList');

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById('addItems').style.display = "none";

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

addItemsButton.addEventListener('click', () => {
    document.getElementById('addItemsButton').style.display = "none";
    document.getElementById('addItems').style.display = "block";
});

closeAddItems.addEventListener('click', () => {
    document.getElementById('addItems').style.display = "none";
    document.getElementById('addItemsButton').style.display = "block";
});

const buttonClick = document.querySelectorAll('.todo')

// document.addEventListener('DOMContentLoaded', ()=>{
    
const debounce = (callback, delay)=>{
    let timerId = null;
    return(...args) =>{
        clearTimerout(timerId);
        timerId = setTimeout(()=>{
            timerId = null;
            callback(...args);
        }, delay);
    };
};
buttonClick.forEach(button=>{
    button.addEventListener('click', (event)=>{
        console.log('happened')
        const data = {box: event.target.id};
        //const data = new FormData(document.getElementById('grocery-form'));  
        console.log(data)  
        debounce(fetch('/grocery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        }),10000)
        
    })                                                                                                 
})


//Function to access API, filter results and assign value to DOM
const getIngred = (searchText) => {
    // uses GET to access the API
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=`;
    get(url).then(function (response) {
      //Assigning the JSON response as an array
        const items = response;
      // Get Matches to current text input g:global; i:insensitive
        let matches = items.filter((item) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return item.name.match(regex);
        });
      //clear the matches if there is no text in input box
        if (searchText.length === 0) {
        matches = [];
        ingredList.innerHTML = "";
        }
      //display the matches and assign clicked match
        outputHtml(matches);
      //function to assign clicked match to input box
        clickedMatch(matches);
    });
};

//   //Function capitalize string 
// function titleCase(str) {
//     var splitStr = str.toLowerCase().split(' ');
//     for (var i = 0; i < splitStr.length; i++) {
//       // You do not need to check if i is larger than splitStr length, as your for does that for you
//       // Assign it back to the array
//       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
//     }
//     // Directly return the joined string
//     return splitStr.join(' ');
//   }

  //Assigns an event listener to each match, if match is clicked it assigns the value to the input value
const clickedMatch = (matches) => {
    const matchArray = document.querySelectorAll("#suggestMatch");
    matchArray.forEach(function (suggestMatch) {
      suggestMatch.addEventListener("click", function (event) {
        event.preventDefault();
        searchCountry.value = suggestMatch.innerHTML;
        matchList.classList.toggle("hide");  //Ryan Add to hide search box
      });
      searchCountry.addEventListener("keydown", function (event) {  //Ryan Reopen search list on backspace
        if (event.key === "Backspace" || event.key === "Delete") {
          matchList.classList.remove("hide");
        }
      });
      searchCountry.addEventListener("click", function (event) {  //Ryan Reopen search list on backspace
        matchList.classList.toggle("hide");
      });
    });
  };

  //Function to display matches under the input box
const outputHtml = (matches) => {
    if (matches.length > 0) {
      const html = matches
        .map(
          (match) => `
          <div>
              <h4 id= "suggestMatch" >${match.name}</h4>
          </div>
          `
        )
        .join("");
      matchList.innerHTML = html;
    }
  };
  
  //Passes content (value) of the input box to the getCountries function
  searchCountry.addEventListener("keyup", () =>
    getCountries(searchCountry.value)
  );