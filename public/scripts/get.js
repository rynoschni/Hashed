function get(url) {
    //Step1: fetch data
    return fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "619a10ef17mshd13e544bf683a12p181861jsn82b20c24ddbd"
        }
    })
        //Step2: Run the json() method from the server response
        .then(function(response) {
            return response.json();
        })
        //Step3: Return the data from the response.json() method
        .then(function(data) {
        return data;
        })
}
