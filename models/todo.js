const db = require("./conn")

class todoReturn {
    constructor (id, to_do, completed, user){
    this.id = id,
    this.to_do = to_do,
    this.completed = completed,
    this.user = user
    }
    static async getToDos(user_id){
        try{
            const response = await db.any(`SELECT * FROM to_dos WHERE user_id = $1;`, [user_id])
            return response
        }
        catch (error){
            return error.message
        }
    }
    static async createToDo(toDo, user_id){
        try{
            const response = await db.result('INSERT INTO to_dos (to_do, completed, user_id) VALUES($1, false, $2);', [toDo, user_id])
            return response
        }
        catch {
            return error.message
        }
    }
    static async updateToDo (todo_id, boolean){
        try {
            const response = await db.result('UPDATE to_dos SET completed = $1 WHERE id = $2;',[boolean, todo_id])
            return response
        }
        catch {
            return error.message
        }
    }
    static async removeToDo (todo_id){
        try{
            const response = await db.result(`DELETE FROM to_dos WHERE id = $1`,[todo_id])
            return response
        }
        catch{
            return error.message
        }
    }
}
module.exports = todoReturn