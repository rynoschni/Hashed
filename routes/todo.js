'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/todo')
router.get('/', async (req, res) =>{
    const todos = await theList.getToDos(req.session.user_id)
    //console.log(todos)
    res.render('template', {
        locals: {
            title:'To Do',
            is_logged_in: req.session.is_logged_in,
            list: todos
        },
        partials: {
            partial:'partial-todo'
        }
    })
})

router.post('/', async (req, res) =>{
    const sendData = async () =>{
        try{
            if(req.body.add === 'Add'){
                console.log(req.body)
                await theList.createToDo(req.body.to_do, req.session.user_id)
            }
            else if (req.body.update === 'Update'){
                const update = async ()=>{
                    if((typeof req.body.id) === 'string'){
                        theList.updateToDo(req.body.id, true)
                    }
                    else{
                        req.body.id.map(todo=>{
                            return theList.updateToDo(todo, true)
                        })
                    }
                    console.log(req.body)
                    ('/todo')
                }
                await update()
                
            }
            else if (req.body.delete === 'Delete'){
                if((typeof req.body.id) === 'string'){
                    theList.removeToDo(req.body.id)
                }
                else{
                    req.body.id.map(todo=>{
                        return theList.removeToDo(todo)
                    })
                }
                console.log(req.body)
            }
            
            else if (req.body.undo === 'Undo'){
                console.log(req.body.id)
                const theToDos = await theList.getToDos(req.session.user_id)
                console.log(theToDos)
                let todoArr = theToDos.filter(toDo => toDo.completed)
                console.log(todoArr)
                todoArr.map(todo=> {
                    
                })
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
            }
        }
    
        catch(error){
            return error.message;
        }
    }   
    const sendInfo = await sendData()
    sendInfo;
    const redirected = await res.redirect('/todo')
    redirected;
    
})

module.exports = router