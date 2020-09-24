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

}
module.exports = recipesListReturn