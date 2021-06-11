const recipes = [
    {recipe_name: 'Hamburger'},
    {recipe_name: 'Steak'},
    {recipe_name: 'Bacon'}
]

const ingredients = [
    {ingredient_name: 'Cheese'},
    {ingredient_name: 'Pickles'},
    {ingredient_name: 'Bun'}
]

const steps = [
    {step_number: 1, step_instructions: 'put the cheese on the burger', recipe_id: 1},
    {step_number: 2, step_instructions: 'put the pickles on the burger', recipe_id: 1},
    {step_number: 3, step_instructions: 'put the bun on the burger', recipe_id: 1}
]

const step_ingredients = [
    {step_id: 1, ingredient_id: 1, quantity: 2},
    {step_id: 2, ingredient_id: 2, quantity: 4},
    {step_id: 3, ingredient_id: 3, quantity: 2}
]

exports.seed = async function(knex) {
  await knex('recipes').insert(recipes)
  await knex('ingredients').insert(ingredients)
  await knex('steps').insert(steps)
  await knex('step_ingredients').insert(step_ingredients)
};

