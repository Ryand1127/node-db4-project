const request = require("supertest")
const db = require("../data/db-config");
const server = require("./server")

const recipe = {recipe_name: "Pizza"}
const recipe2 = {recipe_name: "Pasta"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("recipes").truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe("server functions properly", () => {
    describe("[GET] /recipes/:id", () => {
        test("responds with a 200 status", async () => {
            let res
            await db("recipes").insert(recipe)
            res = await request(server).get("/api/recipes/1")
            expect(res.status).toBe(200)
        })
        test("returns correct number of recipes", async () => {
            let res
            await db("recipes").insert(recipe)
            res = await request(server).get("/api/recipes/1")
            expect(res.body.steps).toHaveLength(1)
        })
        test("returns right format for hobbits", async () => {
            let res
            await db("recipes").insert(recipe)
            await db("recipes").insert(recipe2)
            res = await request(server).get("/api/recipes/2")
            expect(res.body).toMatchObject({recipe_id: 2, ...recipe2})

        })
    })
})