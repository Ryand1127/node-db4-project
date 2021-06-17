
exports.up = function(knex) {
    return knex.schema
      .createTable("recipes", table => {
          table.increments("recipe_id")
          table.string("recipe_name", 128).notNullable().unique()
          table.timestamp('created_at').defaultTo(knex.fn.now())
      })
      .createTable("ingredients", table => {
          table.increments('ingredient_id')
          table.string('ingredient_name', 128).notNullable().unique()
      })
      .createTable("steps", table => {
          table.increments('step_id')
          table.integer('step_number', 128).notNullable()
          table.string('step_instructions', 128).notNullable()
          table.integer('recipe_id')
               .unsigned()
               .notNullable()
               .references('recipe_id')
               .inTable('recipes')
               .onDelete('RESTRICT')
               .onUpdate('RESTRICT')
        })
      .createTable("step_ingredients", table => {
          table.increments('step_ingredient_id')
          table.float('quantity')
          table.integer('step_id')
               .unsigned()
               .notNullable()
               .references('step_id')
               .inTable('steps')
               .onDelete('RESTRICT')
               .onUpdate('RESTRICT')
          table.integer('ingredient_id')
               .unsigned()
               .notNullable()
               .references('ingredient_id')
               .inTable('ingredients')
               .onDelete('RESTRICT')
               .onUpdate('RESTRICT')
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("step_ingredients")
      .dropTableIfExists("steps")
      .dropTableIfExists("ingredients")
      .dropTableIfExists("recipes")
  };
