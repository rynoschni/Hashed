const db = require("./conn")

class groceryListReturn {
    constructor (id, item, qty, unit, recipe_id, completed, user){
    this.id = id;
    this.item = item;
    this.qty = qty;
    this.unit = unit;
    this.recipe_id = recipe_id;
    this.completed = completed;
    this.user = user;
    };

    static async getGroceryList(user_id){
        try{
            const response = await db.any(`SELECT * FROM shopping WHERE user_id = $1;`, [user_id])
            return response
        }
        catch (error){
            return error.message
        }
    };

    static async createGroceryList(data, theID){
        try{
            const response = await db.result('INSERT INTO shopping (item, qty, units, recipe_id, completed, user_id) VALUES($1, $2, $3, $4, false, $5);', [data.groceries, data.qty, data.unit, data.recipe_id, theID]);
            console.log("create response is:", response);
            return response;
        }
        catch(error) {
            return error.message
        }
    };

    static async updateGroceryList (shopping_id, boolean){
        try {
                const response = await db.result('UPDATE shopping SET completed = $1 WHERE id = $2;',[boolean, shopping_id]);
                console.log("update response is:", response);
                return response;
        }
        catch(error) {
            return error.message
        }
    };

    static async removeGroceryList (shopping_id){
        try{
            const response = await db.result(`DELETE FROM shopping WHERE id = $1`,[shopping_id]);
            console.log("remove response is:", response);
            return response;
        }
        catch(error){
            return error.message
        }
    };
}
module.exports = groceryListReturn