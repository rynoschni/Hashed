'use strict'

const searchData = document.getElementById('recipeSearch');
const searchButton = document.getElementById('searchButton');
const APIKey = '3633c51b86b2490a866cac434f6bfb09';
// const itemSearchButton = document.getElementByID('itemSearchButton');
console.log('clicked')
//Function to access API, filter results and assign value to DOM
const getRecipes = () => {
    
    
    // uses GET to access the API
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchData.value}&instructionsRequired=true&addRecipeNutrition=true&number=2&apiKey=${APIKey}`;
    const returnObj = get(url).then(function (response) {
      //Assigning the JSON response as an array
        const items = response;
        console.log(items);
        const searchCardDiv = document.getElementById('searchCards')
        
        items.results.map(recipe=>{
            const recipeTitle = document.createElement('h2')
            const recipeImage = document.createElement('img')
            const recipeDescription = document.createElement('p')
            const recipeInfoDiv = document.createElement('div')
            const recipeCalories = document.createElement('p')
            const recipeServings = document.createElement('p')
            const recipeTime = document.createElement('p')
            const addRecipeButton = document.createElement('input')
            searchCardDiv.appendChild(recipeTitle)
            recipeTitle.innerText = `${recipe.title}`
            searchCardDiv.appendChild(recipeImage)
            recipeImage.src = `${recipe.image}`
            recipeImage.alt =`${recipe.title}`
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
            addRecipeButton.id ="add_recipe"
            addRecipeButton.type = "submit"
            addRecipeButton.value= "add"
            addRecipeButton.name ="Add"
        })
    });
};
searchButton.addEventListener('click', (e)=>{
    //console.log('clicked')
    e.preventDefault()
    console.log(`Test Item search Value: ${searchData.value}`);
    console.log('clicked')
    getRecipes()
})

