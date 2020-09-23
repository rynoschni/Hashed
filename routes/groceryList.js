'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')
router.get('/', async (req, res) =>{
    const groceryList = await theList.getGroceryList(req.session.user_id)
    //console.log(todos)
    res.render('template', {
        locals: {
            title:'Grocery List',
            is_logged_in: req.session.is_logged_in,
            list: groceryList,
            name: req.session.name,
        },
        partials: {
            partial:'partial-groceryList'
        }
    })
})

router.post('/', async (req, res) =>{
    if(req.body.add === 'Add'){
        console.log("add:" ,req.body)
        const response = await theList.createGroceryList(req.body, req.session.user_id)
        console.log("add response is:", response)
        await res.redirect('/grocery')
    }
    
    else if (req.body.update === 'Update'){
        if((typeof req.body.id) === 'string'){
            await theList.updateGroceryList(req.body.id, true)
        }
        else{
            for (let groceryListItem of req.body.id) {
                await theList.updateGroceryList(groceryListItem , true)
            }
        }
        console.log("req.body update",req.body)
        await res.redirect('/grocery')
        }
        
    else if (req.body.delete === 'Delete'){
        if((typeof req.body.id) === 'string'){
            await theList.removeGroceryList(req.body.id)
        }
        else{
            req.body.id.map(groceryListItem=>{
                return theList.removeGroceryList(groceryListItem)
            })
        }
        console.log("req.body delete", req.body)
        await res.redirect('/grocery')
    }
    else if (req.body.undo === 'Undo'){
        if((typeof req.body.id) === 'string'){
            await theList.updateGroceryList(req.body.id, false)
        }
        else{
            for (let groceryListItem of req.body.id) {
                await theList.updateGroceryList(groceryListItem , false)
            }
        }
        console.log("req.body update",req.body)
        await res.redirect('/grocery')
    }
    // Use checked to display completed items, currently has last item errors
    // else if (req.body.undo === 'Undo'){
    //     console.log("req body id", req.body.id)
    //     const theToDos = await theList.getGroceryList(req.session.user_id)
    //     console.log("the todos", theToDos)
    //     let todoArr = theToDos.filter(toDo => toDo.completed).map(todos=>todos.id)
    //     console.log("todoArr", todoArr)
    //     todoArr.map(todo=> {
    //         if (req.body.id.indexOf(todo)=== -1){
    //             theList.updateGroceryList(todo, false)
    //         }
    //     })
    //     await res.redirect('/grocery')
        // console.log('happened')
        // const thetodos = await theList.getToDos(req.session.user_id)
        // const undoArr = await thetodos.filter(todo=>{
        //     if(todo.completed) { return todo.id}})
        // console.log("undo",undoArr)
        // undoArr.map(td => {
        //     console.log(req.body.id.indexOf(td.id))
        //     if(req.body.id.indexOf(td.id) === -1)
        //     { theList.updateToDo(td.id, false)}
        // } )
        // console.log(req.body)
})
    

module.exports = router;