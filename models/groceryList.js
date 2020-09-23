const db = require("./conn")

class groceryListReturn {
    constructor (id, to_do, completed, user){
    this.id = id,
    this.to_do = to_do,
    this.completed = completed,
    this.user = user
    }
    static async getGroceryList(user_id){
        try{
            const response = await db.any(`SELECT * FROM shopping WHERE user_id = $1;`, [user_id])
            return response
        }
        catch (error){
            return error.message
        }
    }
    static async createGroceryList(data){
        try{
            const response = await db.result('INSERT INTO shopping (item, qty, units, recipe_id, completed, user_id) VALUES($1, $2, $3, $4, false, $5);', [data.item, data.qty, data.units, data.recipe_id, data.user_id])
            return response
        }
        catch {
            return error.message
        }
    }
    static async updateGroceryList (shopping_id, boolean){
        try {
            const response = await db.result('UPDATE shopping SET completed = $1 WHERE id = $2;',[boolean, shopping_id])
            return response
        }
        catch {
            return error.message
        }
    }
    static async removeGroceryList (shopping_id){
        try{
            const response = await db.result(`DELETE FROM shopping WHERE id = $1`,[shopping_id])
            return response
        }
        catch{
            return error.message
        }
    }
}
module.exports = groceryListReturn