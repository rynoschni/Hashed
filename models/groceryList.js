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
    static async getGroceryListItem(item_id){
        try{
            const response = await db.any(`SELECT * FROM shopping WHERE id = $1;`,[item_id])
            return response
        }
        catch(error){
            return error.message
        }
    }

    static async createGroceryList(data, theID){
        try{
            const response = await db.result('INSERT INTO shopping (item, qty, units, recipe_id, completed, user_id) VALUES($1, $2, $3, 1, false, $5);', [data.groceries, data.qty, data.unit, data.recipe_id, theID]);
            console.log("create response is:", response);
            return response;
        }
        catch(error) {
            return error.message
        }
    };
    static async moveFromGroceryToPantry(data, user_id){
        try{
            const response = await db.result (`INSERT INTO pantry (item, qty, units, user_id) VALUES ($1, $2, $3, $4);`, [data.item, data.qty, data.units, user_id])
        }
        catch(error){

        }
    }

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

    static async updateGroceryListItem (item_id, item_info){
        try{
            const response = await db.result('UPDATE shopping SET item = $1, qty = $2, units = $3 WHERE id = $4;',[item_info[2], item_info[0], item_info[1], item_id])
            console.log('edit response: ', response)
            return response
        }
        catch (error) {
            return error.message
        }
    }

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