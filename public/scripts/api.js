'use strict'

const itemList = document.getElementById('itemList');
const itemSearch = document.getElementById('itemSearch');
const units = document.getElementById('unitsList');
const hiddenInfo = document.getElementById('hiddenInfo');
const key = '3633c51b86b2490a866cac434f6bfb09';

// const itemSearchButton = document.getElementByID('itemSearchButton');

//Function to access API, filter results and assign value to DOM
const getIngred = (value) => {
    console.log(`Test Item search Value: ${value}`);
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
        if (value.length === 0) {
        matches = [];
        }
      //display the matches and assign clicked match
        outputHtml(matches);
    //  function to assign clicked match to input box
        clickedMatch(matches);
    });
};


  //Assigns an event listener to each match, if match is clicked it assigns the value to the input value
const clickedMatch = (matches, ids) => {
    const matchArray = document.querySelectorAll("#suggestMatch");
    matchArray.forEach(function (suggestMatch) {
        suggestMatch.addEventListener("click", function (event) {
            event.preventDefault();
            
            itemSearch.value = suggestMatch.innerHTML;
            let itemName = itemSearch.value
            const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${itemName}&metaInformation=true&apiKey=${key}`;
            get(url).then(function (response) {
              //Assigning the JSON response as an array
                const item = response;
                console.log('This is the item: ', item);
                let itemId = item.map(food =>{
                  return food.id;
                })
                let itemUnit = item.map(food =>{
                  return food.possibleUnits;
                });
                let itemPhoto = item.map(food =>{
                  return food.image;
                })
                console.log('This is the item ID', itemId);
                console.log('This is the Units are: ', itemUnit);
                console.log('This is the item ID', itemPhoto);
                outputUnits(itemUnit);
                const hiddenIDForm = document.createElement('form');
                  hiddenIDForm.setAttribute('id','hiddenIDForm');
                  hiddenIDForm.classList.add('hide');
                  hiddenInfo.appendChild(hiddenIDForm);
                const hiddenIDInput = document.createElement('input');
                  hiddenIDInput.setAttribute('id','hiddenIDInput');
                  hiddenIDInput.classList.add('hide');
                  hiddenIDInput.innerHTML = itemId;
                  hiddenIDForm.appendChild(hiddenIDInput);
            });
            

            itemList.classList.toggle("hide");
              //Ryan Add to hide search box

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

const outputUnits = (itemUnit) =>{
  if (itemUnit[0].length >0) {
    const html = itemUnit[0].map((unit) => 
      `<option name="unit" value="${unit}">${unit}</option>`
    ).join("");
    units.innerHTML = html;
  }
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

  // Passes content (value) of the input box to the getCountries function
const debounceWrapper = debounce(getIngred, 1000);

itemSearch.addEventListener("input", () => {
    const itemValue = document.getElementById('itemSearch').value;
    debounceWrapper(itemValue);
});