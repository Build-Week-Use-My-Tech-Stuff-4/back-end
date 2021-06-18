
exports.up = function(knex) {
 return knex.schema   
 .createTable('users', users =>{
     users.increments('user_id')
     users.string('user_name', 128).notNullable().unique()
     users.string('password', 128).notNullable()
     users.string('email', 128).unique()
     users.string('city')
     users.string('state')
     users.string('zip')
 })
 .creatTable('items', items=>{
     items.increments('item_id')
     items.string('item_name', 128).notNullable()
     items.text('description').notNullable()
     items.string('location').notNullable()
     items.float('price_per_day').notNullable()
     items.boolean('available').notNullable()
     items.integer('lister_id')
     .unsigned()
     .references('user_id')
     .inTable('users')
     .onUpdate('CASCADE')
     .onDelete('CASCADE')
 })
 .createTable('reviews', reviews=>{
     reviews.increments('review_id')
     reviews.text('review_text').notNullable()
     reviews.integer('stars')
     reviews.integer('reviewer_id')
     .unsigned()
     .references('user_id')
     .inTable('users')
     .onUpdate('CASCADE')
     .onDelete('CASCADE')
     reviews.integer('reviewed_item_id')
     .unsigned()
     .references('item_id')
     .inTable('items')
     .onUpdate('CASCADE')
     .onDelete('CASCADE')
 }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reviews').dropTableIfExists('items').dropTableIfExists('users'); 
};
