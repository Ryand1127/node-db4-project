const express = require('express');

const server = express();
const Recipe = require('./recipes-model')

server.use(express.json());

server.get('/api/recipes/:recipe_id', (req, res) => {
    const id = req.params.recipe_id;
    Recipe.getRecipeById(id)
    .then(recipe => {
        if(!recipe){
            res.status(404).json({
                message: `recipe with id ${id} could not be found`
            })
        } else {
            res.json(recipe)
        }
    })
    .catch(err => res.status(500).json({err}))
})

module.exports = server;