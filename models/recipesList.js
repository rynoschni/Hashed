const db = require("./conn")

class recipesListReturn {
    constructor(id, item, qty, unit, recipe_id, completed, user) {
        this.id = id;
        this.item = item;
        this.qty = qty;
        this.unit = unit;
        this.recipe_id = recipe_id;
        this.completed = completed;
        this.user = user;
    };

    static async getRecipesList(user_id) {
        try {
            const response = await db.any(`SELECT * FROM recipe WHERE user_id = $1 ORDER BY title;`, [user_id])
            return response
        }
        catch (error) {
            return error.message
        }
    };

    static async createRecipe(data, theID) {
        try {
            console.log("create recipe json data is:", data.json);
            const response = await db.result('INSERT INTO recipe (title, ingred, instructions, user_id, rating, extra, image) VALUES ($1, $2, $3, $4, $5, $6, $7);', [data.title, data.ingred, data.instructions, theID, 3, {}, data.picLink]);
            console.log("create response is:", response);
            return response;
        }
        catch (error) {
            return error.message
        }
    };

    static async getRecipeValues(recipe_id){
        try {
            const response = await db.any('SELECT * FROM recipe WHERE id = $1;', [recipe_id])
            return response
        }
        catch (error) {
            return error.message
        }
    }

}
module.exports = recipesListReturn