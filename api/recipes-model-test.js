const db = require('../data/db-config')
const Recipe = require('./recipes-model')

const recipe = {recipe_name: 'Burger'}

beforeAll (async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach (async () => {
    await db('recipes').truncate()
})

afterAll(async () => {
    await db.destroy()
})

test('correct env', () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe('recipes model', () => {
    describe("getById function", async () => {
        test('gets recipe by Id', async () => {
            const [recipe_id] = await db('recipes').insert(recipe)
            const getRecipe = await Recipe.getRecipeById(recipe_id)
            expect(getRecipe).toMatchObject({recipe_id, ...recipe})
            expect(getRecipe.recipe_name).toBe('Burger')
        })
    })
})