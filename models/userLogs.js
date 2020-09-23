'use strict'

const db = require("./conn")
const bcrypt = require('bcryptjs')

class UserModel {
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    async checkPassword(hashedPassword){
        return bcrypt.compareSync(this.password, hashedPassword);
    }
    async save(){
        try {
            const response = await db.one(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;`,[this.name, this.email, this.password])
            console.log('Created with ID: ',response.id)
            return response;
        }
        catch{
            console.log(error)
        }
    }
    async login(){
        
        try{
            const response = await db.one(`SELECT id, name, email, password FROM users WHERE email = $1;`, [this.email])
            console.log("Login Response: ", response)
            const isValid = await this.checkPassword(response.password)
            if (!!isValid){
                const {name, id} = response;
                return { isValid, name, user_id: id}
            } else{
                return {isValid};
            }
        }
        catch (error){
            console.error("Error: ", error.message);
            return error.message;
        }
    }
}

module.exports = UserModel