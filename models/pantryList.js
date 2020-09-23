const db = require("./conn")

class pantryListReturn {
    constructor (id, item, qty, unit, user){
    this.id = id;
    this.item = item;
    this.qty = qty;
    this.unit = unit;
    this.user = user;
    }
    static async getPantryList(user_id){
        try{
            const response = await db.any(`SELECT * FROM pantry WHERE user_id = $1;`, [user_id])
            return response
        }
        catch (error){
            return error.message
        }
    }
    static async createPantryList(data, theID){
        try{
            const response = await db.result('INSERT INTO pantry (item, qty, units,user_id) VALUES($1, $2, $3, $4);', [data.pantryItems, data.qty, data.unit, theID])
            return response
        }
        catch(error) {
            return error.message
        }
    }
    // static async updatePantryList (pantryItem_id, boolean){
    //     try {
    //         const response = await db.result('UPDATE pantry SET completed = $1 WHERE id = $2;',[boolean, pantryItem_id])
    //         return response
    //     }
    //     catch {
    //         return error.message
    //     }
    // }
    static async removePantryList (pantryItem_id){
        try{
            const response = await db.result(`DELETE FROM pantry WHERE id = $1`,[pantryItem_id])
            return response
        }
        catch{
            return error.message
        }
    }
}
module.exports = pantryListReturn