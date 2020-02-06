const express = require("express");
const Todo = require("../model/todo")

const router = express.Router();

router.get("/", async(req, res)=> {
    const Todos = await Todo.find();
    res.render("todo", {Todos});
});

router.post("/", async(req, res)=>{
    const newTodo = new Todo({
        item: req.body.todo
    });
    newTodo.save((err, suc)=>{
        err? console.log("Du måste fylla i något!"):
        res.redirect("/");
    })
});

router.get("/delete/:id", async(req, res)=> {
    await Todo.deleteOne({_id: req.params.id});
    res.redirect("/");
});

router.get("/update/:id", async(req, res)=> {
    let specificTodo = await Todo.findById({_id: req.params.id});
    res.render("edit", {specificTodo});
});

router.post("/update/:id", async(req, res)=> {
    await Todo.updateOne({_id: req.params.id}, {$set: {item: req.body.todo}});
    res.redirect("/");
});



module.exports = router;