
const db = require("../data/db-config");

const getRecipeById = async (recipe_id) => {
    const info = await db("recipes as r")
    //Grabbing recipes because it's the main table.
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    //Join with steps so we can select step_id, step_number, and step_instructions
    .leftJoin("step_ingredients as si", "si.step_id", "s.step_id")
    //Join with step_ingredients so we can select quantity
    .leftJoin("ingredients as i", "i.ingredient_id", "si.ingredient_id")
    //Join with ingredients so we can select ingredient_name and ingredient_id
    .select(
        "r.recipe_id",
        "r.recipe_name",
        "s.step_id",
        "s.step_number",
        "s.step_instructions",
        "i.ingredient_id",
        "i.ingredient_name",
        "si.quantity"
    )
    //Select everything we want to be displayed
    .orderBy("s.step_number", "asc")
    //Order by step number
    .where("r.recipe_id", recipe_id)
    //Select which specific recipe we want to show

    const recipes = {
        //Creating the shape of the response using the above variable.
        recipe_id: info[0].recipe_id,
        recipe_name: info[0].recipe_name,
        steps: info.reduce((acc, row) => {
            if(!row.ingredient_id){
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_instructions: row.step_instructions,
                    ingredients: []
                })
            }
            if(row.ingredient_id && !acc.find(step => step.step_id === row.step_id)){
                return acc.concat({
                    step_id: row.step_id,
                    step_number: row.step_number,
                    step_text: row.step_text,
                    ingredients: [
                        {
                            ingredient_id: row.ingredient_id,
                            ingredient_name: row.ingredient_name,
                            quantity: row.quantity,
                        }
                    ]
                })
            }
            const currentStep = acc.find(step => step.step_id === row.step_id)
            currentStep.ingredients.push({
                ingredient_id: row.ingredient_id,
                ingredient_name: row.ingredient_name,
                quantity: row.quantity,
            })
            return acc
        }, [])
    }

    return recipes
}

module.exports = { getRecipeById }