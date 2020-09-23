const db = require("./conn")

class pantryListReturn {
    constructor (id, item, qty, unit, recipe_id, completed, user){
    this.id = id;
    this.item = item;
    this.qty = qty;
    this.unit = unit;
    this.recipe_id = recipe_id;
    this.completed = completed;
    this.user = user;
    }
    static async getPantryList(user_id){
        try{
            const response = await db.any(`SELECT * FROM shopping WHERE user_id = $1;`, [user_id])
            return response
        }
        catch (error){
            return error.message
        }
    }
    static async createPantryList(data, theID){
        try{
            const response = await db.result('INSERT INTO shopping (item, qty, units, recipe_id, completed, user_id) VALUES($1, $2, $3, $4, false, $5);', [data.groceries, data.qty, data.unit, data.recipe_id, theID])
            return response
        }
        catch(error) {
            return error.message
        }
    }
    static async updatePantryList (shopping_id, boolean){
        try {
            const response = await db.result('UPDATE shopping SET completed = $1 WHERE id = $2;',[boolean, shopping_id])
            return response
        }
        catch {
            return error.message
        }
    }
    static async removePantryList (shopping_id){
        try{
            const response = await db.result(`DELETE FROM shopping WHERE id = $1`,[shopping_id])
            return response
        }
        catch{
            return error.message
        }
    }
}
module.exports = pantryListReturn