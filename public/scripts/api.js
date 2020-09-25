'use strict'

const itemList = document.getElementById('itemList');
const itemSearch = document.getElementById('itemSearch');
// const itemSearchButton = document.getElementByID('itemSearchButton');

//Function to access API, filter results and assign value to DOM
const getIngred = (value) => {
    console.log(`Test Item search Value: ${value}`);
    const key = '3633c51b86b2490a866cac434f6bfb09';
    // uses GET to access the API
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&metaInformation=true&apiKey=${key}`;
    get(url).then(function (response) {
      //Assigning the JSON response as an array
        const items = response;
        console.log(items);
      // Get Matches to current text input g:global; i:insensitive
        let matches = items.filter((item) => {
        const regex = new RegExp(`^${value}`, "gi");
        return item.name.match(regex);
        });
      //clear the matches if there is no text in input box
        if (value.length === 0) {
        matches = [];
        itemList.innerHTML = "";
        }
      //display the matches and assign clicked match
        outputHtml(matches);
    //  function to assign clicked match to input box
        clickedMatch(matches);
    });
};

  //Assigns an event listener to each match, if match is clicked it assigns the value to the input value
const clickedMatch = (matches) => {
    const matchArray = document.querySelectorAll("#suggestMatch");
    matchArray.forEach(function (suggestMatch) {
        suggestMatch.addEventListener("click", function (event) {
            event.preventDefault();
            itemSearch.value = suggestMatch.innerHTML;
            itemList.classList.toggle("hide");  //Ryan Add to hide search box
        });
        itemSearch.addEventListener("keydown", function (event) {  //Ryan Reopen search list on backspace
            if (event.key === "Backspace" || event.key === "Delete") {
                itemList.classList.remove("hide");
            }
        });
        itemSearch.addEventListener("click", function (event) {  //Ryan Reopen search list on backspace
            itemList.classList.toggle("hide");
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
        itemList.innerHTML = html;
    }
};

  //Passes content (value) of the input box to the getCountries function
// const debounceWrapper = debounce(getIngred, 1000);

// itemSearch.addEventListener("input", () => {
//     const itemValue = document.getElementById('itemSearch').value;
//     debounceWrapper(itemValue);
// });