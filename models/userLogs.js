'use strict'

const db = require("./conn")
const bcrypt = require('bcryptjs')

class UserModel {
    constructor(id, first_name, last_name, email, password){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
    async checkPassword(hashedPassword){
        return bcrypt.compareSync(this.password, hashedPassword);
    }
    async save(){
        try {
            const response = await db.one(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,[this.first_name, this.last_name, this.email, this.password])
            console.log('Created with ID: ',response.id)
            return response;
        }
        catch{
            console.log(error)
        }
    }
    async login(){
        
        try{
            const response = await db.one(`SELECT id, first_name, last_name, email, password FROM users WHERE email = $1;`, [this.email])
            console.log("Login Response: ", response)
            const isValid = await this.checkPassword(response.password)
            if (!!isValid){
                const {first_name, last_name, id} = response;
                return { isValid, first_name, last_name, user_id: id}
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