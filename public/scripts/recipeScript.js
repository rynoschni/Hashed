'use strict'

const searchData = document.getElementById('recipeSearch');
const searchButton = document.getElementById('searchButton');
const searchURL = document.getElementById('urlSearch');
const searchURLButton = document.getElementById('urlSearchButton');
const apiKey = '3633c51b86b2490a866cac434f6bfb09';
// const itemSearchButton = document.getElementByID('itemSearchButton');
// console.log('clicked')

//Function to access API, filter results and assign value to DOM
const getRecipes = () => {
    
    // uses GET to access the API

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchData.value}&instructionsRequired=true&addRecipeNutrition=true&number=1&fillIngredients=true&apiKey=${apiKey}`;
    const returnObj = get(url).then(function (response) {
      //Assigning the JSON response as an array
        const items = response;
        console.log(items);
        //const searchCardDiv = document.getElementById('searchCards')

        
        const cardHolder = document.getElementById('cardHolder')

        items.results.map(recipe=>{
            const searchCardDiv = document.createElement('form')
            const recipeTitledata = document.createElement('input')
            const recipeTitle = document.createElement('h2')
            const recipeImage = document.createElement('img')
            const recipeDescription = document.createElement('p')
            const recipeInfoDiv = document.createElement('div')
            const recipeCalories = document.createElement('p')
            const recipeServings = document.createElement('p')
            const recipeTime = document.createElement('p')
            const imageHolder = document.createElement('p')
            const recipeJSON = document.createElement('input')
            const addRecipeButton = document.createElement('input')
            const recipeInstructions = document.createElement('input')
            const recipeIngredients = document.createElement('input')
            const recipePictureLink = document.createElement('input')
            const recipeOriginLink = document.createElement('a')
            cardHolder.appendChild(searchCardDiv)
            searchCardDiv.appendChild(recipeTitle)
            searchCardDiv.action =`/recipes/add`;
            searchCardDiv.method = "POST"
            recipeTitle.innerText = `${recipe.title}`
            searchCardDiv.appendChild(recipeTitledata)
            recipeTitledata.value = `${recipe.title}`
            recipeTitledata.name = `title`
            recipeTitledata.hidden = true
            searchCardDiv.appendChild(imageHolder)
            imageHolder.appendChild(recipeImage)
            recipeImage.src = `${recipe.image}`
            recipeImage.alt =`${recipe.title}`
            searchCardDiv.appendChild(recipeOriginLink)
            recipeOriginLink.href = `${recipe.sourceUrl}`
            recipeOriginLink.innerHTML = `${recipe.title}`
            searchCardDiv.appendChild(recipeDescription)
            recipeDescription.innerHTML = `${recipe.summary}`
            searchCardDiv.appendChild(recipeInfoDiv)
            recipeInfoDiv.appendChild(recipeCalories)
            recipeCalories.innerText = `Calories: ${recipe.nutrition.nutrients[0].amount}`
            recipeInfoDiv.appendChild(recipeServings)
            recipeServings.innerText = `Servings: ${recipe.servings}`
            recipeInfoDiv.appendChild(recipeTime)
            recipeTime.innerText = `Time: ${recipe.readyInMinutes}`
            searchCardDiv.appendChild(addRecipeButton)
            addRecipeButton.type = "submit"
            addRecipeButton.value= "add"
            addRecipeButton.name ="Add"
            searchCardDiv.appendChild(recipeJSON)
            recipeJSON.value = recipe;
            recipeJSON.name = "json"
            recipeJSON.hidden = true
            //console.log("value", recipeJSON.value)
            searchCardDiv.appendChild(recipeInstructions)
            recipeInstructions.name = "instructions";
            recipeInstructions.value = `${recipe.analyzedInstructions[0].steps.map(steps => steps.step).join(':')}`
            recipeInstructions.type = "text"
            searchCardDiv.appendChild(recipeIngredients)
            recipeIngredients.name = "ingred"
            // recipeIngredients.value = `${recipe.nutrition.ingredients.map(ingredient => `${ingredient.amount},${ingredient.unit}, ${ingredient.name}`).join(':')}`
            recipeIngredients.value = `${recipe.extendedIngredients.map(ingredient => `${ingredient.measures.us.amount},${ingredient.measures.us.unitLong}, ${ingredient.name}`).join(':')}`
            recipeIngredients.hidden = true
            recipeInstructions.hidden = true
            console.log(recipeInstructions.value, recipeIngredients.value)
            searchCardDiv.appendChild(recipePictureLink)
            recipePictureLink.name = "picLink"
            recipePictureLink.value = `${recipe.image}`
            recipePictureLink.type = "text"
            recipePictureLink.hidden = true
        })
    })
};

const getURLRecipes = () => {

    // uses GET to access the API

    const url = `https://api.spoonacular.com/recipes/extract?url=${searchURL.value}&apiKey=${apiKey}`;
    const returnObj = get(url).then(function (response) {
        //Assigning the JSON response as an array
        const recipe = response;
        console.log(recipe);
        //const searchCardDiv = document.getElementById('searchCards')


        const cardHolder = document.getElementById('cardHolder')

        // returns single value under items. Need to refactor from .map( recipe) to be items
        
        const searchCardDiv = document.createElement('form')
        const recipeTitledata = document.createElement('input')
        const recipeTitle = document.createElement('h2')
        const recipeImage = document.createElement('img')
        const recipeDescription = document.createElement('p')
        const recipeInfoDiv = document.createElement('div')
        const recipeCalories = document.createElement('p')
        const recipeServings = document.createElement('p')
        const recipeTime = document.createElement('p')
        const imageHolder = document.createElement('p')
        const recipeJSON = document.createElement('input')
        const addRecipeButton = document.createElement('input')
        const recipeInstructions = document.createElement('input')
        const recipeIngredients = document.createElement('input')
        const recipePictureLink = document.createElement('input')
        const recipeOriginLink = document.createElement('a')
        cardHolder.appendChild(searchCardDiv)
        searchCardDiv.appendChild(recipeTitle)
        searchCardDiv.action = `/recipes/add`;
        searchCardDiv.method = "POST"
        recipeTitle.innerText = `${recipe.title}`
        searchCardDiv.appendChild(recipeTitledata)
        recipeTitledata.value = `${recipe.title}`
        recipeTitledata.name = `title`
        recipeTitledata.hidden = true
        searchCardDiv.appendChild(imageHolder)
        imageHolder.appendChild(recipeImage)
        recipeImage.src = `${recipe.image}`
        recipeImage.alt = `${recipe.title}`
        searchCardDiv.appendChild(recipeOriginLink)
        recipeOriginLink.href = `${recipe.sourceUrl}`
        recipeOriginLink.innerHTML = `${recipe.title}`
        searchCardDiv.appendChild(recipeDescription)
        recipeDescription.innerHTML = `${recipe.summary}`
        searchCardDiv.appendChild(recipeInfoDiv)
        // recipeInfoDiv.appendChild(recipeCalories)
        // recipeCalories.innerText = `Calories: ${recipe.nutrition.nutrients[0].amount}`
        recipeInfoDiv.appendChild(recipeServings)
        recipeServings.innerText = `Servings: ${recipe.servings}`
        recipeInfoDiv.appendChild(recipeTime)
        recipeTime.innerText = `Time: ${recipe.readyInMinutes}`
        searchCardDiv.appendChild(addRecipeButton)
        addRecipeButton.type = "submit"
        addRecipeButton.value = "add"
        addRecipeButton.name = "Add"
        searchCardDiv.appendChild(recipeJSON)
        recipeJSON.value = recipe;
        recipeJSON.name = "json"
        recipeJSON.hidden = true
        //console.log("value", recipeJSON.value)
        searchCardDiv.appendChild(recipeInstructions)
        recipeInstructions.name = "instructions";
        recipeInstructions.value = `${recipe.analyzedInstructions[0].steps.map(steps => steps.step).join(':')}`
        recipeInstructions.type = "text"
        searchCardDiv.appendChild(recipeIngredients)
        recipeIngredients.name = "ingred"
        // recipeIngredients.value = `${recipe.nutrition.ingredients.map(ingredient => `${ingredient.amount},${ingredient.unit}, ${ingredient.name}`).join(':')}`
        recipeIngredients.value = `${recipe.extendedIngredients.map(ingredient => `${ingredient.measures.us.amount},${ingredient.measures.us.unitLong}, ${ingredient.name}`).join(':')}`
        recipeIngredients.hidden = true
        recipeInstructions.hidden = true
        console.log(recipeInstructions.value, recipeIngredients.value)
        searchCardDiv.appendChild(recipePictureLink)
        recipePictureLink.name = "picLink"
        recipePictureLink.value = `${recipe.image}`
        recipePictureLink.type = "text"
        recipePictureLink.hidden = true
    })
};

searchButton.addEventListener('click', (e)=>{
    //console.log('clicked')
    e.preventDefault();
    console.log(`Test Item search Value: ${searchData.value}`);
    console.log('clicked');
    getRecipes();
});

searchURLButton.addEventListener('click', (e) => {
    //console.log('clicked')
    e.preventDefault();
    console.log(`Test Item search Value: ${searchURL.value}`);
    console.log('clicked');
    getURLRecipes();
});