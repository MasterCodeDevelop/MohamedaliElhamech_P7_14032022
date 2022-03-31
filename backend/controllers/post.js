
const Post = require('../models/Post');
const fs = require("fs");


exports.getOnePost = (req, res, next) => {
    const id = req.params.id
    
    Post.get(id, (data)=>{
        res.status(200).json(data)
    })
}

exports.getAllPost = (req, res, next) => {
    Post.all((data)=>{
        res.status(200).json(data)
    })
}
function toCrt(name){
    var str = name.replace(/[&\/\\#,+()$~%@^'!:*?<>{}]/g, '');
    return str
}
exports.setPost = (req, res, next) => {
    /*const test = JSON.parse(req.body)
    console.log(test)*/
    const imageUrl = req.file.filename ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`: undefined
    const data = {
        title: toCrt(req.body.title),
        description: toCrt(req.body.description),
        imageUrl: toCrt(imageUrl)
    }

    Post.create(data, ()=>{
        res.status(200).json({ message: "Post enregistrée !" })
    })
}
exports.deletePost = (req, res, next) => {
    const id = req.params.id;

    Post.delete(id, ()=>{
        res.status(200).json({message: "Post supprimée !" })
    })
}
exports.updatePost = (req, res, next) => {
    const id = req.params.id;
    const data = req.body.data;

    Post.update(id,data, ()=>{
        res.status(200).json({message: "Post modifiée !" })
    })
}