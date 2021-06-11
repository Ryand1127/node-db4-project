const db = require('../data/db-config')

async function getRecipeById(recipe_id) {
    
    const recipeObj = await db('recipes as r')
        .where('r.recipe_id', recipe_id).first()
    
    const ingredientsArr = await db('ingredients as i')
            .leftJoin('step_ingredients as si', 'i.ingredient_id', 'si.ingredient_id')
            .leftJoin('steps as s', 'si.step_id', 's.step_id')
            .select('s.step_id', 's.step_number', 's.step_instructions','i.ingredient_id', 'i.ingredient_name', 'si.quantity')
            .where('s.recipe_id', recipe_id)

    const addIngredients = ingredientsArr.reduce((acc, step) => {
        const { ingredient_id, ingredient_name, quantity } = step
        if (acc[step.step_id]) {
            acc[step.step_id].ingredients.push({ingredient_id, ingredient_name, quantity})
        } else {
            if (!step.ingredient_id) {
                acc[step.step_id] = {step_id: step.step_id, step_number: step.step_number, step_instructions: step.step_instructions, ingredients: []}
            } else {
                acc[step.step_id] = {step_id: step.step_id, step_number: step.step_number, step_instructions: step.step_instructions, ingredients: [{ingredient_id, ingredient_name, quantity}]}
            }
        } 
        return acc
    }, {})

    recipeObj.steps = addIngredients
    return recipeObj
    
}

module.exports = {
    getRecipeById
} 
