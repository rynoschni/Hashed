<h1>HASHED</h1>
<img src="images/Main-Page.png">

<h2><u>Overview:</u></h2>
<p>Hashed provides grocery list, pantry list, and recipe search functionality.</p>
<br>
    
<h2><u>The Team:</u></h2>
<h3>Brittani Ericksen: https://github.com/brittani-ericksen</h3>
<p><b>Primary Team Role:</b> </p>
<p><b>Contributions:</b> </p>
<br>
<h3>Matthew Everett: https://github.com/Mjheverett</h3>
<p><b>Primary Team Role:</b> </p>
<p><b>Contributions:</b> </p>
<br>
<h3>Ryan Schniederjan: https://github.com/rynoschni</h3>
<p><b>Primary Team Role:</b> </p>
<p><b>Contributions:</b> </p>
<br>
<h3>Eric Schorling: https://github.com/willeschor</h3>
<p><b>Primary Team Role:</b> </p>
<p><b>Contributions:</b> </p>
<br>

<h2><u>What We Used:</u></h2>
<h3>Languages:</h3>
<ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>PostgreSQL</li>
    <li>HTML5</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
<h3>Frameworks:</h3>
<ul>
    <li>Bulma</li>
</ul>
<h3>APIs:</h3>
<ul>
    <li><a href="https://spoonacular.com/food-api">Spoonacular</a></li>
</ul>
<br>

<h2><u>MVP (Minimum Viable Product):</u></h2>
<ul>
    <li>Add and remove items to a Grocery list.</li>
    <li>Mark items as completed while shopping.</li>
</ul>
<br>

<h2><u>Stretch Goals Completed:</u></h2>
<ul>
    <li>Recipe search by name and url.</li>
</ul>
<br>

<h2><u>Stretch Goals Future:</u></h2>
<ul>
    <li></li>
</ul>
<br>

<h2><u>Challenges & Solutions:</u></h2>
<h3>Some of the biggest challenges we faced with this project build included:</h2>
<br>
<p><b>Challenge:</b> </p>
<p><b>Solution:</b> </p>
<br>
<p><b>Challenge:</b> </p>
<p><b>Solution:</b> </p>
<br>
<p><b>Challenge:</b> </p>
<p><b>Solution:</b> </p>
<br>
    
<h2><u>Code Snippets:</u></h2>

<h4>Display's the current date and passes that information into the API to return the desired results.</h4>

``` javascript

// Display's Current Date 
    function displayDate() {
        const currentDay = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[currentDay.getDay()];
        const currentDate = new Date();
            let year = currentDate.getFullYear();
            let date = currentDate.getDate();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month = months[currentDate.getMonth()];
        
          // Use for Month inAPI
        let thisMonth = currentDate.getMonth() + 1;
        
        if (date<10){
            date = "0" + date;
        }
        if (thisMonth<10){
            thisMonth = "0" + thisMonth;
        }
        //Date API url https://api.ipgeolocation.io/timezone?apiKey=9326dc3140ac4b1794c68f9aa51ebdd8&tz=America/Los_Angeles
        const dateToday = document.getElementById('date');
        dateToday.innerHTML = (day +" "+ month +" "+ date +", "+ year);

        // Use for Date and Year in API
        apiDate = String(year + '-' + thisMonth + '-' + date);
        // console.log("apiDate:", apiDate);
        return apiDate;
    };
    displayDate();
    // console.log("apiDate in DOM events", apiDate);

```
<br>
<h4>Showcases how we worked with OpenBreweryDB's API to pull in event data.</h4>

``` javascript

// Craft Beer Data
const getBreweries = (currentCity) => {
    const breweryURL = `https://api.openbrewerydb.org/breweries?by_city=${currentCity}`;
    return get(breweryURL).then(function(breweryData) {
        let breweryList = [];
        let breweryShuffle = [];
        if (categorySelections.includes("breweries")) {
            breweryData.map(function(brewery) {
                const breweryListName = [brewery.name, brewery.website_url];
                breweryShuffle = [...breweryShuffle, breweryListName];
                breweryList = shuffle(breweryShuffle);
                // breweryList = breweryList.slice(0, 5);
                return breweryList;
            })
            // console.log("brewery list array", breweryList);
            return breweryList;
        };
        return breweryList;
    });
};

```
<br>
<h4>Refreshes the search results based on user input.</h4>

``` javascript

// Monitor checkboxes for clicks to update categorySelection variable and trigger refresh of events data for new selection
document.querySelectorAll('#eventSelect').forEach(item => {
    item.addEventListener('click', () => {
        // console.log("item", item.value);
        categorySelection();
        getEventsData(currentCity, apiDate);
    })
});

const categorySelection = () => {
    categorySelections = [];
    const checkboxes = document.querySelectorAll('#eventSelect');
    checkboxes.forEach(item => {
        if (item.checked == true) {
            categorySelections = [...categorySelections, item.value];
        }
        return categorySelections;
    });
    // console.log("category selections", categorySelections);
    return categorySelections;
}

```

<h2>Live Demo</h2>
<a href="">Hashed</a>
<br>
<h4>Preview of </h4>
<img src="images/">
<br>
<h4>Preview of </h4>
<img src="images/">

